import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocuments } from '../hooks/useDocuments'
import { useAuth } from '../hooks/useAuth'
import DocumentCard from '../components/DocumentCard'
import CategoryChip from '../components/CategoryChip'
import Modal from '../components/Modal'
import { getCategories } from '../constants/categories'

export default function Documents() {
  const { documents, loading, error, uploadDocument, getDownloadUrl, deleteDocument } = useDocuments()
  const { accountType } = useAuth()
  const CATEGORIES = useMemo(() => getCategories(accountType), [accountType])
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [modalOpen, setModalOpen] = useState(false)
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]?.id || '')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setCategory = (id) => {
    if (id === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', id)
    }
    setSearchParams(searchParams)
  }

  const filteredDocs = useMemo(() => {
    return activeCategory === 'all' ? documents : documents.filter((d) => d.category === activeCategory)
  }, [documents, activeCategory])

  const openUpload = () => {
    setUploadCategory(activeCategory !== 'all' ? activeCategory : CATEGORIES[0]?.id || '')
    setTitle('')
    setFile(null)
    setFormError('')
    setModalOpen(true)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setFormError('Choose a file to upload')
      return
    }
    if (!uploadCategory) {
      setFormError('Choose a category')
      return
    }

    setSubmitting(true)
    const { error: uploadError } = await uploadDocument(file, uploadCategory, title.trim())
    setSubmitting(false)

    if (uploadError) {
      setFormError(uploadError.message)
      return
    }

    setModalOpen(false)
  }

  const handleDownload = async (doc) => {
    const url = await getDownloadUrl(doc.file_path)
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page">
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Documents</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 18 }}>
        Upload receipts, warranties, permits, inspection reports, and other records — organized by category.
      </p>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, paddingBottom: 4 }}>
        <CategoryChip label="All" active={activeCategory === 'all'} onClick={() => setCategory('all')} />
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.name}
            icon={cat.icon}
            active={activeCategory === cat.id}
            onClick={() => setCategory(cat.id)}
          />
        ))}
      </div>

      {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading documents...</p>
      ) : filteredDocs.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No documents in this category yet.</p>
      ) : (
        filteredDocs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} onDownload={handleDownload} onDelete={deleteDocument} />
        ))
      )}

      <button onClick={openUpload} className="fab">
        <span style={{ fontSize: 16 }}>+</span> Upload
      </button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload Document">
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. HVAC Warranty"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="label">File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && (
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                Selected: {file.name}
              </p>
            )}
          </div>

          {formError && <p className="error-text" style={{ marginBottom: 14 }}>{formError}</p>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
