// Shared helpers for Apple in-app purchases (files starting with _ are not
// deployed as endpoints by Vercel).
import { SignedDataVerifier, Environment } from '@apple/app-store-server-library'
import { createClient } from '@supabase/supabase-js'
import { APPLE_ROOT_CAS_BASE64 } from './_appleRootCerts.js'

export const BUNDLE_ID = 'com.homepulse365.app'
export const APP_APPLE_ID = 6830821996
export const PRODUCT_IDS = new Set([
  'com.homepulse365.app.pro.monthly',
  'com.homepulse365.app.pro.yearly',
])

const roots = APPLE_ROOT_CAS_BASE64.map((b64) => Buffer.from(b64, 'base64'))

// App Review and TestFlight purchases are Sandbox; real customers are
// Production. Both must be accepted by the live server.
const verifiers = [
  new SignedDataVerifier(roots, true, Environment.PRODUCTION, BUNDLE_ID, APP_APPLE_ID),
  new SignedDataVerifier(roots, true, Environment.SANDBOX, BUNDLE_ID),
]

async function tryVerifiers(fn) {
  let lastError
  for (const v of verifiers) {
    try {
      return await fn(v)
    } catch (err) {
      lastError = err
    }
  }
  throw lastError
}

export const verifyTransaction = (jws) => tryVerifiers((v) => v.verifyAndDecodeTransaction(jws))
export const verifyNotification = (payload) => tryVerifiers((v) => v.verifyAndDecodeNotification(payload))

// True when this transaction currently grants Pro.
export function isActive(tx) {
  if (!tx || !PRODUCT_IDS.has(tx.productId)) return false
  if (tx.revocationDate) return false
  return !tx.expiresDate || tx.expiresDate > Date.now()
}

export function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase server settings missing')
  return createClient(url, key, { auth: { persistSession: false } })
}

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })
}
