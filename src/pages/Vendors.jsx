import { useState } from 'react'
import { useVendors } from '../hooks/useVendors'
import VendorCard from '../components/VendorCard'
import Modal from '../components/Modal'
import { CATEGORIES } from '../constants/categories'

const emptyForm = {
  name: '',
  category: CATEGORIES[0].id,
  phone: '',
  email: '',
  rating: 5,
  notes: '',
}

export default function Vendors() {
  const { vendors, loading, error, addVendor, deleteVendor } = useVendors()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    setFormErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const { error: addError } = await addVendor({
      name: form.name.trim(),
      category: form.category,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      rating: form.rating,
      notes: form.notes.trim() || null,
    })
    setSubmitting(false)

    if (addError) {
      setFormErrors({ form: addError.message })
      return
    }

    setForm(emptyForm)
    setFormErrors({})
    setModalOpen(false)
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Vendors</h1>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="btn-primary"
        style={{ marginBottom: 20 }}
      >
        + Add Service Provider
      </button>

      {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading vendors...</p>
      ) : vendors.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No service providers yet.</p>
      ) : (
        vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onDelete={deleteVendor} />
        ))
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Service Provider">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. ABC Plumbing"
            />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contact@vendor.com"
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Rating</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  style={{
                    fontSize: 26,
                    color: n <= form.rating ? 'var(--warning)' : 'var(--text-muted)',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="label">Notes (optional)</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any extra details..."
            />
          </div>

          {formErrors.form && <p className="error-text" style={{ marginBottom: 14 }}>{formErrors.form}</p>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Add Vendor'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
