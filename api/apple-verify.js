// Called by the iOS app after an Apple purchase or "Restore Purchases".
// Body: { transactions: [<signed transaction JWS>, ...] }
// Header: Authorization: Bearer <Supabase access token of the signed-in user>
import { verifyTransaction, isActive, serviceClient, json } from './_apple.js'

// The native app's webview origin.
const CORS = {
  'access-control-allow-origin': 'capacitor://localhost',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type',
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(request) {
  let supabase
  try {
    supabase = serviceClient()
  } catch (err) {
    console.error('apple-verify:', err.message)
    return json({ error: 'Server not configured' }, 500, CORS)
  }

  const token = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  const user = userData?.user
  if (userError || !user) return json({ error: 'Not signed in' }, 401, CORS)

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Bad request' }, 400, CORS)
  }
  const list = Array.isArray(body?.transactions) ? body.transactions.slice(0, 20) : []

  let active = null
  for (const jws of list) {
    let tx
    try {
      tx = await verifyTransaction(jws)
    } catch (err) {
      console.error('apple-verify: rejected transaction', err.message)
      continue
    }
    // Purchases are tagged with the HomePulse user id; don't let one Apple ID
    // unlock several HomePulse accounts.
    if (tx.appAccountToken && tx.appAccountToken.toLowerCase() !== user.id.toLowerCase()) continue
    if (isActive(tx)) {
      active = tx
      break
    }
  }

  if (!active) return json({ active: false }, 200, CORS)

  const { error } = await supabase
    .from('profiles')
    .update({ plan: 'paid', apple_original_transaction_id: active.originalTransactionId })
    .eq('user_id', user.id)
  if (error) {
    console.error('apple-verify: update failed', error)
    return json({ error: 'Update failed' }, 500, CORS)
  }
  return json({ active: true, productId: active.productId }, 200, CORS)
}
