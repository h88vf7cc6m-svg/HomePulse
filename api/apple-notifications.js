// App Store Server Notifications (V2). Apple calls this when a subscription
// renews, expires, is refunded or revoked, so profiles.plan stays correct
// even when the user never opens the app.
import { verifyNotification, verifyTransaction, isActive, serviceClient, json } from './_apple.js'

export async function POST(request) {
  let supabase
  try {
    supabase = serviceClient()
  } catch (err) {
    console.error('apple-notifications:', err.message)
    return json({ error: 'Server not configured' }, 500)
  }

  let notification
  try {
    const { signedPayload } = await request.json()
    notification = await verifyNotification(signedPayload)
  } catch (err) {
    console.error('apple-notifications: rejected', err.message)
    return json({ error: 'Invalid notification' }, 400)
  }

  const signedTx = notification?.data?.signedTransactionInfo
  if (!signedTx) return json({ received: true })

  let tx
  try {
    tx = await verifyTransaction(signedTx)
  } catch (err) {
    console.error('apple-notifications: bad transaction', err.message)
    return json({ error: 'Invalid transaction' }, 400)
  }

  const plan = isActive(tx) ? 'paid' : 'free'
  let query = supabase.from('profiles').update({ plan, apple_original_transaction_id: tx.originalTransactionId })
  query = tx.appAccountToken
    ? query.eq('user_id', tx.appAccountToken)
    : query.eq('apple_original_transaction_id', tx.originalTransactionId)
  const { error } = await query
  if (error) {
    // 500 makes Apple retry later.
    console.error('apple-notifications: update failed', error)
    return json({ error: 'Update failed' }, 500)
  }
  return json({ received: true })
}
