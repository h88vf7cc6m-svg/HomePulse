import { useEffect, useState } from 'react'
import Modal from './Modal'
import { useAuth } from '../hooks/useAuth'
import { appleIAPAvailable, getProducts, purchase, restore, PRODUCT_IDS } from '../lib/appStore'

const MONTHLY_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK
const YEARLY_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK_YEARLY

function buildCheckoutUrl(link, user) {
  if (!link || !user) return null
  return `${link}?client_reference_id=${encodeURIComponent(user.id)}&prefilled_email=${encodeURIComponent(user.email)}`
}

const linkStyle = { display: 'block', textAlign: 'center', textDecoration: 'none' }
const fineStyle = { fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 12 }

function AppleOptions({ user, onUnlocked }) {
  const [products, setProducts] = useState(null)
  const [busy, setBusy] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getProducts()
      .then((list) => setProducts(list))
      .catch(() => setProducts([]))
  }, [])

  const byId = Object.fromEntries((products || []).map((p) => [p.id, p]))
  const monthly = byId[PRODUCT_IDS.monthly]
  const yearly = byId[PRODUCT_IDS.yearly]

  const buy = async (product) => {
    setBusy(product.id)
    setMessage(null)
    try {
      const result = await purchase(product.id, user.id)
      if (result.status === 'purchased') onUnlocked()
      else if (result.status === 'pending') setMessage('Your purchase is waiting for approval. Pro unlocks as soon as it goes through.')
      else if (result.status === 'not_active') setMessage("We couldn't confirm that purchase. Try Restore Purchases.")
    } catch (err) {
      setMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(null)
    }
  }

  const doRestore = async () => {
    setBusy('restore')
    setMessage(null)
    try {
      const result = await restore()
      if (result.active) onUnlocked()
      else setMessage('No active HomePulse Pro subscription was found for this Apple ID.')
    } catch (err) {
      setMessage(err.message || 'Could not restore purchases.')
    } finally {
      setBusy(null)
    }
  }

  if (products === null) {
    return <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>Loading prices…</p>
  }
  if (!monthly && !yearly) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {monthly && (
        <button className="btn-primary" onClick={() => buy(monthly)} disabled={!!busy}>
          {busy === monthly.id ? 'Opening…' : `Subscribe Monthly — ${monthly.displayPrice}/month`}
        </button>
      )}
      {yearly && (
        <button className="btn-secondary" onClick={() => buy(yearly)} disabled={!!busy}>
          {busy === yearly.id ? 'Opening…' : `Subscribe Yearly — ${yearly.displayPrice}/year`}
        </button>
      )}
      <button
        onClick={doRestore}
        disabled={!!busy}
        style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600, padding: 6 }}
      >
        {busy === 'restore' ? 'Restoring…' : 'Restore Purchases'}
      </button>
      {message && <p className="error-text" style={{ textAlign: 'center' }}>{message}</p>}
      <p style={fineStyle}>
        HomePulse Pro is an auto-renewing subscription
        {monthly ? ` (${monthly.displayPrice} per month` : ''}
        {monthly && yearly ? ' or ' : monthly ? ')' : ' ('}
        {yearly ? `${yearly.displayPrice} per year)` : ''}. Payment is charged to your Apple ID at
        confirmation. It renews automatically unless cancelled at least 24 hours before the end of the
        current period. Manage or cancel any time in your App Store account settings.{' '}
        <a href="https://homepulse365.com/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
        {' · '}
        <a href="https://homepulse365.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      </p>
    </div>
  )
}

export default function UpgradeModal({ open, onClose, categoryName }) {
  const { user, refreshPlan } = useAuth()

  const monthlyUrl = buildCheckoutUrl(MONTHLY_LINK, user)
  const yearlyUrl = buildCheckoutUrl(YEARLY_LINK, user)
  const hasWeb = monthlyUrl || yearlyUrl

  const unlocked = async () => {
    await refreshPlan()
    onClose()
  }

  const webLinks = (secondary) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {monthlyUrl && (
        <a href={monthlyUrl} target="_blank" rel="noopener noreferrer"
          className={secondary ? 'btn-secondary' : 'btn-primary'} style={linkStyle}>
          Monthly — $7.99/mo
        </a>
      )}
      {yearlyUrl && (
        <a href={yearlyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={linkStyle}>
          Yearly — $76.70/yr <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(Save 20%)</span>
        </a>
      )}
    </div>
  )

  return (
    <Modal open={open} onClose={onClose} title="🔒 Premium Category">
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {categoryName ? `${categoryName} is` : 'This category is'} part of HomePulse Pro.
        Your free plan includes your top categories — upgrade to unlock every category,
        unlimited task templates, and document uploads across your whole home or business.
      </p>

      {appleIAPAvailable && user && open && <AppleOptions user={user} onUnlocked={unlocked} />}

      {appleIAPAvailable && hasWeb && (
        <>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', margin: '18px 0 10px' }}>
            Or pay on our website
          </p>
          {webLinks(true)}
        </>
      )}

      {!appleIAPAvailable && hasWeb && webLinks(false)}

      {!appleIAPAvailable && !hasWeb && (
        <>
          <button className="btn-primary" disabled title="Billing isn't set up yet">
            Upgrade — Coming Soon
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
            We're still wiring up billing. Check back soon!
          </p>
        </>
      )}
    </Modal>
  )
}
