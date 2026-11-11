import { Capacitor, registerPlugin } from '@capacitor/core'
import { supabase } from './supabase'

// Native StoreKit bridge (ios/App/App/AppStorePlugin.swift).
const AppStore = registerPlugin('AppStore')

export const PRODUCT_IDS = {
  monthly: 'com.homepulse365.app.pro.monthly',
  yearly: 'com.homepulse365.app.pro.yearly',
}

// Apple purchases are only offered inside the iOS app.
export const appleIAPAvailable = Capacitor.getPlatform() === 'ios'

// The native webview isn't served from our domain, so call the API by URL.
const API_BASE = Capacitor.isNativePlatform() ? 'https://www.homepulse365.com' : ''

export async function getProducts() {
  const { products } = await AppStore.getProducts({ productIds: Object.values(PRODUCT_IDS) })
  return products || []
}

// Sends signed Apple transactions to the server, which unlocks Pro if one is
// active. Returns { active: boolean }.
export async function verifyWithServer(transactions) {
  if (!transactions?.length) return { active: false }
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('Please sign in again.')
  const res = await fetch(`${API_BASE}/api/apple-verify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ transactions }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || 'Could not confirm the purchase.')
  return body
}

export async function purchase(productId, userId) {
  const result = await AppStore.purchase({ productId, appAccountToken: userId })
  if (result.status !== 'purchased') return result
  const verified = await verifyWithServer([result.jws])
  return { status: verified.active ? 'purchased' : 'not_active' }
}

export async function restore() {
  const { transactions } = await AppStore.restore()
  return verifyWithServer(transactions)
}

export async function syncEntitlements() {
  const { transactions } = await AppStore.currentEntitlements()
  return verifyWithServer(transactions)
}

export function onTransactionUpdated(callback) {
  return AppStore.addListener('transactionUpdated', callback)
}

export function manageSubscriptions() {
  return AppStore.manageSubscriptions()
}
