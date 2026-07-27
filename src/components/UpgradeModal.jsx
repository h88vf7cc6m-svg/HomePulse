import Modal from './Modal'
import { useAuth } from '../hooks/useAuth'

const PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK

export default function UpgradeModal({ open, onClose, categoryName }) {
  const { user } = useAuth()

  const checkoutUrl = PAYMENT_LINK && user
    ? `${PAYMENT_LINK}?client_reference_id=${encodeURIComponent(user.id)}&prefilled_email=${encodeURIComponent(user.email)}`
    : null

  return (
    <Modal open={open} onClose={onClose} title="🔒 Premium Category">
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {categoryName ? `${categoryName} is` : 'This category is'} part of HomePulse Premium.
        Your free plan includes your top categories — upgrade to unlock every category,
        unlimited task templates, and document uploads across your whole home or business.
      </p>
      {checkoutUrl ? (
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
        >
          Upgrade to Premium
        </a>
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
