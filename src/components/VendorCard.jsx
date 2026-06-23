import { getCategory } from '../constants/categories'

export default function VendorCard({ vendor, onDelete }) {
  const category = getCategory(vendor.category)

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16 }}>{vendor.name}</p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {category.icon} {category.name}
          </p>
        </div>
        <div style={{ fontSize: 13, color: 'var(--warning)' }}>
          {'★'.repeat(vendor.rating)}
          <span style={{ color: 'var(--text-muted)' }}>{'★'.repeat(5 - vendor.rating)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
        {vendor.phone && (
          <a href={`tel:${vendor.phone}`} style={{ fontSize: 13 }}>
            📞 {vendor.phone}
          </a>
        )}
        {vendor.email && (
          <a href={`mailto:${vendor.email}`} style={{ fontSize: 13 }}>
            ✉️ {vendor.email}
          </a>
        )}
      </div>

      {vendor.notes && (
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>{vendor.notes}</p>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(vendor.id)}
          style={{ fontSize: 11, color: 'var(--danger)', marginTop: 10 }}
        >
          Remove
        </button>
      )}
    </div>
  )
}
