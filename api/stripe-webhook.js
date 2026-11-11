// Stripe → Supabase: keeps profiles.plan in sync with the customer's
// subscription. Stripe calls this URL after checkout and whenever a
// subscription changes or is cancelled.
//
// Vercel environment variables it needs (Settings → Environment Variables):
//   STRIPE_WEBHOOK_SECRET      – signing secret of this webhook endpoint (whsec_…)
//   SUPABASE_SERVICE_ROLE_KEY  – Supabase service_role key (server only, never in the app)
//   SUPABASE_URL               – optional; falls back to VITE_SUPABASE_URL
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const PAID_STATUSES = new Set(['active', 'trialing', 'past_due'])

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export async function POST(request) {
  const { STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY } = process.env
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  if (!STRIPE_WEBHOOK_SECRET || !SUPABASE_SERVICE_ROLE_KEY || !supabaseUrl) {
    console.error('stripe-webhook: missing environment variables')
    return json({ error: 'Server not configured' }, 500)
  }

  // Verifying a webhook signature is done locally and makes no API call,
  // so no Stripe secret key is needed here.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_unused')
  const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  // Signature check needs the exact raw body Stripe sent.
  const rawBody = await request.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      request.headers.get('stripe-signature'),
      STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error('stripe-webhook: bad signature', err.message)
    return json({ error: 'Invalid signature' }, 400)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.client_reference_id
        if (!userId) {
          console.error('stripe-webhook: checkout without client_reference_id', session.id)
          break
        }
        const paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required'
        const { data, error } = await supabase
          .from('profiles')
          .update({
            plan: paid ? 'paid' : 'free',
            stripe_customer_id: session.customer || null,
          })
          .eq('user_id', userId)
          .select('user_id')
        if (error) throw error
        if (!data?.length) console.error('stripe-webhook: no profile for user', userId)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const plan = event.type !== 'customer.subscription.deleted' && PAID_STATUSES.has(sub.status)
          ? 'paid'
          : 'free'
        const { error } = await supabase
          .from('profiles')
          .update({ plan })
          .eq('stripe_customer_id', sub.customer)
        if (error) throw error
        break
      }

      default:
        break
    }
  } catch (err) {
    // A 500 makes Stripe retry the event later.
    console.error('stripe-webhook: failed to update profile', err)
    return json({ error: 'Update failed' }, 500)
  }

  return json({ received: true })
}

export function GET() {
  return json({ ok: true, endpoint: 'stripe-webhook' })
}
