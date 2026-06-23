import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import CategoryChip from '../components/CategoryChip'
import Modal from '../components/Modal'
import { CATEGORIES, FREQUENCIES } from '../constants/categories'

const emptyForm = {
  title: '',
  category: CATEGORIES[0].id,
  frequency: FREQUENCIES[0],
  due_date: '',
  vendor_name: '',
  notes: '',
}

export default function Tasks() {
  const { tasks, loading, error, addTask, toggleComplete, deleteTask } = useTasks()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const setCategory = (id) => {
    if (id === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', id)
    }
    setSearchParams(searchParams)
  }

  const filteredTasks = useMemo(() => {
    const filtered =
      activeCategory === 'all' ? tasks : tasks.filter((t) => t.category === activeCategory)

    return [...filtered].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      return new Date(a.due_date) - new Date(b.due_date)
    })
  }, [tasks, activeCategory])

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Title is required'
    if (!form.due_date) next.due_date = 'Due date is required'
    setFormErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const { error: addError } = await addTask({
      title: form.title.trim(),
      category: form.category,
      frequency: form.frequency,
      due_date: form.due_date,
      vendor_name: form.vendor_name.trim() || null,
      notes: form.notes.trim() || null,
      completed: false,
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
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Tasks</h1>

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
        <p style={{ color: 'var(--text-secondary)' }}>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No tasks in this category yet.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggleComplete} onDelete={deleteTask} />
        ))
      )}

      <button onClick={() => setModalOpen(true)} className="fab">
        <span style={{ fontSize: 16 }}>+</span> Add Task
      </button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Task">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Replace HVAC filter"
            />
            {formErrors.title && <p className="error-text">{formErrors.title}</p>}
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
            <label className="label">Frequency</label>
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            >
              {FREQUENCIES.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Due Date</label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
            {formErrors.due_date && <p className="error-text">{formErrors.due_date}</p>}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="label">Vendor (optional)</label>
            <input
              value={form.vendor_name}
              onChange={(e) => setForm({ ...form, vendor_name: e.target.value })}
              placeholder="e.g. ABC Plumbing"
            />
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
            {submitting ? 'Saving...' : 'Add Task'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
