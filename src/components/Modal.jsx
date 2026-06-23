export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 430,
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'var(--navy-mid)',
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          padding: '20px 18px calc(24px + env(safe-area-inset-bottom))',
          borderTop: '1px solid var(--card-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>{title}</h2>
          <button onClick={onClose} style={{ fontSize: 20, color: 'var(--text-secondary)' }}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
