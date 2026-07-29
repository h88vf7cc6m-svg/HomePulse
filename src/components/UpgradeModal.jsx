import Modal from './Modal'
import { useAuth } from '../hooks/useAuth'

const MONTHLY_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK
const YEARLY_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK_YEARLY

function buildCheckoutUrl(link, user) {
  if (!link || !user) return null
  return `${link}?client_reference_id=${encodeURIComponent(user.id)}&prefilled_email=${encodeURIComponent(user.email)}`
}

export default function UpgradeModal({ open, onClose, categoryName }) {
  const { user } = useAuth()

  const monthlyUrl = buildCheckoutUrl(MONTHLY_LINK, user)
  const yearlyUrl = buildCheckoutUrl(YEARLY_LINK, user)

  return (
    <Modal open={open} onClose={onClose} title="🔒 Premium Category">
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {categoryName ? `${categoryName} is` : 'This category is'} part of HomePulse Premium.
        Your free plan includes your top categories — upgrade to unlock every category,
        unlimited task templates, and document uploads across your whole home or business.
      </p>
      {monthlyUrl || yearlyUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {monthlyUrl && (
            <a
              href={monthlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >
              Monthly — $7.99/mo
            </a>
          )}
          {yearlyUrl && (
            <a
              href={yearlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >
              Yearly — $76.70/yr <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(Save 20%)</span>
            </a>
          )}
        </div>
      ) : (
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
