import Modal from './Modal'

export default function UpgradeModal({ open, onClose, categoryName }) {
  return (
    <Modal open={open} onClose={onClose} title="🔒 Premium Category">
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {categoryName ? `${categoryName} is` : 'This category is'} part of HomePulse Premium.
        Your free plan includes your top categories — upgrade to unlock every category,
        unlimited task templates, and document uploads across your whole home or business.
      </p>
      <button className="btn-primary" disabled title="Billing isn't set up yet">
        Upgrade — Coming Soon
      </button>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
        We're still wiring up billing. Check back soon!
      </p>
    </Modal>
  )
}
