import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, REGIONS, TASK_TEMPLATES } from '../constants/categories'
import { useTasks } from '../hooks/useTasks'
import Modal from '../components/Modal'

const REGION_KEY = 'homepulse_region'

function getTodayPlus(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export default function Templates() {
  const navigate = useNavigate()
  const { addTask } = useTasks()
  const [region, setRegion] = useState(() => localStorage.getItem(REGION_KEY) || '')
  const [activeCategory, setActiveCategory] = useState(null)
  const [adding, setAdding] = useState(null)
  const [addedIds, setAddedIds] = useState([])
  const [saving, setSaving] = useState(false)

  const handleRegionChange = (id) => {
    setRegion(id)
    localStorage.setItem(REGION_KEY, id)
  }

  const getTemplatesForCategory = (catId) => {
    const tmpl = TASK_TEMPLATES[catId]
    if (!tmpl) return []
    if (catId === 'weather') {
      if (!region) return []
      return tmpl.regional[region]?.tasks || []
    }
    const general = tmpl.tasks || []
    const regional = (region && tmpl.regional?.[region]?.tasks) || []
    return [...general, ...regional]
  }

  const getTipsForCategory = (catId) => {
    const tmpl = TASK_TEMPLATES[catId]
    if (!tmpl) return ''
    if (catId === 'weather' && region) {
      return tmpl.regional[region]?.tips || tmpl.tips
    }
    if (region && tmpl.regional?.[region]?.tips) {
      return `${tmpl.tips ? tmpl.tips + ' ' : ''}${tmpl.regional[region].tips}`
    }
    return tmpl.tips || ''
  }

  const handleAddTask = async (task, catId) => {
    const key = `${catId}-${task.title}`
    setSaving(key)
    const today = new Date()
    const { error } = await addTask({
      title: task.title,
      category: catId,
      frequency: task.frequency,
      due_date: getTodayPlus(30),
      vendor_name: null,
      notes: task.notes || null,
      completed: false,
    })
    setSaving(null)
    if (!error) {
      setAddedIds((prev) => [...prev, key])
    }
  }

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)
  const templates = activeCategory ? getTemplatesForCategory(activeCategory) : []
  const tips = activeCategory ? getTipsForCategory(activeCategory) : ''

  return (
    <div className="page">
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Task Templates</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>
        Expert-recommended maintenance tasks for your home. Tap any task to add it instantly.
      </p>

      {/* Region selector */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🗺️ Your Region</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRegionChange(r.id)}
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${region === r.id ? 'var(--teal)' : 'var(--card-border)'}`,
                background: region === r.id ? 'rgba(0,201,167,0.12)' : 'transparent',
                color: region === r.id ? 'var(--teal)' : 'var(--text-secondary)',
                fontWeight: region === r.id ? 700 : 400,
                fontSize: 14,
                textAlign: 'left',
              }}
            >
              {region === r.id ? '✓ ' : ''}{r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10 }}>
        SELECT A CATEGORY
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {CATEGORIES.map((cat) => {
          const count = getTemplatesForCategory(cat.id).length
          const isWeather = cat.id === 'weather'
          const locked = isWeather && !region
          return (
            <button
              key={cat.id}
              className="card"
              onClick={() => !locked && setActiveCategory(cat.id)}
              style={{
                textAlign: 'left',
                opacity: locked ? 0.5 : 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: -15, right: -15,
                width: 70, height: 70, borderRadius: '50%',
                background: `radial-gradient(circle, ${cat.color}25, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${cat.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, marginBottom: 8,
              }}>
                {cat.icon}
              </div>
              <p style={{ fontWeight: 700, fontSize: 13 }}>{cat.name}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                {locked ? 'Select region first' : `${count} tasks`}
              </p>
            </button>
          )
        })}
      </div>

      {/* Template modal */}
      <Modal
        open={!!activeCategory}
        onClose={() => setActiveCategory(null)}
        title={activeCat ? `${activeCat.icon} ${TASK_TEMPLATES[activeCategory]?.title || activeCat.name}` : ''}
      >
        {tips && (
          <div style={{
            background: 'rgba(0,201,167,0.08)',
            border: '1px solid rgba(0,201,167,0.2)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              💡 {tips}
            </p>
          </div>
        )}

        {activeCategory === 'weather' && !region && (
          <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
            Please select your region above first.
          </p>
        )}

        {activeCategory === 'weather' && region && (
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', marginBottom: 12 }}>
            {TASK_TEMPLATES.weather.regional[region]?.name}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {templates.map((task) => {
            const key = `${activeCategory}-${task.title}`
            const added = addedIds.includes(key)
            const isLoading = saving === key
            return (
              <div
                key={task.title}
                className="card"
                style={{ padding: '12px 14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{task.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600, marginBottom: 6 }}>
                      {task.frequency}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {task.notes}
                    </p>
                  </div>
                  <button
                    onClick={() => !added && handleAddTask(task, activeCategory)}
                    style={{
                      flexShrink: 0,
                      padding: '7px 14px',
                      borderRadius: 20,
                      border: `1px solid ${added ? 'var(--teal)' : 'var(--card-border)'}`,
                      background: added ? 'rgba(0,201,167,0.15)' : 'transparent',
                      color: added ? 'var(--teal)' : 'var(--text-secondary)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: added ? 'default' : 'pointer',
                    }}
                  >
                    {isLoading ? '...' : added ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {templates.length > 0 && (
          <button
            className="btn-secondary"
            style={{ marginTop: 16 }}
            onClick={() => {
              setActiveCategory(null)
              navigate('/tasks')
            }}
          >
            View My Tasks
          </button>
        )}
      </Modal>
    </div>
  )
}
