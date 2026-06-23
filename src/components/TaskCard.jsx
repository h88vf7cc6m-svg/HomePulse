import { getCategory } from '../constants/categories'

function getUrgency(dueDate, completed) {
  if (completed) return { label: 'Done', color: 'var(--text-muted)' }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { label: `${Math.abs(diffDays)}d overdue`, color: 'var(--danger)' }
  if (diffDays === 0) return { label: 'Due today', color: 'var(--warning)' }
  if (diffDays <= 7) return { label: `${diffDays}d left`, color: 'var(--warning)' }
  return { label: `${diffDays}d left`, color: 'var(--text-secondary)' }
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const category = getCategory(task.category)
  const urgency = getUrgency(task.due_date, task.completed)

  return (
    <div className="card" style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <button
        onClick={() => onToggle(task.id, task.completed)}
        className={`check-circle ${task.completed ? 'done' : ''}`}
        style={{ marginTop: 2 }}
        aria-label="toggle complete"
      >
        {task.completed ? '✓' : ''}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: 15,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
            }}
          >
            {task.title}
          </p>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: urgency.color,
              whiteSpace: 'nowrap',
            }}
          >
            {urgency.label}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {category.icon} {category.name}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· {task.frequency}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· {task.due_date}</span>
        </div>

        {task.vendor_name && (
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            🔧 {task.vendor_name}
          </p>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            style={{ fontSize: 11, color: 'var(--danger)', marginTop: 8 }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
