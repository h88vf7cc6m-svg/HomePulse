import { useState } from 'react'
import { getCategory } from '../constants/categories'

function formatBytes(bytes) {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let i = 0
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i += 1
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function iconFor(mimeType) {
  if (!mimeType) return '📄'
  if (mimeType.startsWith('image/')) return '🖼️'
  if (mimeType === 'application/pdf') return '📕'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return '📊'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  return '📄'
}

export default function DocumentCard({ doc, onDownload, onDelete }) {
  const category = getCategory(doc.category)
  const [working, setWorking] = useState(false)

  const handleDownload = async () => {
    setWorking(true)
    await onDownload(doc)
    setWorking(false)
  }

  return (
    <div className="card" style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <span style={{ fontSize: 26, flexShrink: 0 }}>{iconFor(doc.mime_type)}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: 14, wordBreak: 'break-word' }}>
          {doc.title || doc.file_name}
        </p>
        {doc.title && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, wordBreak: 'break-word' }}>
            {doc.file_name}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {category.icon} {category.name}
          </span>
          {doc.file_size ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· {formatBytes(doc.file_size)}</span> : null}
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            · {new Date(doc.created_at).toLocaleDateString()}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button onClick={handleDownload} disabled={working} style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 700 }}>
            {working ? 'Opening...' : '⬇ Download'}
          </button>
          {onDelete && (
            <button onClick={() => onDelete(doc)} style={{ fontSize: 11, color: 'var(--danger)', fontWeight: 700 }}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
