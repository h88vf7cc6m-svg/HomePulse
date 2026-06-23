import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import StatCard from '../components/StatCard'
import HealthBar from '../components/HealthBar'
import TaskCard from '../components/TaskCard'
import PulseWave from '../components/PulseWave'
import { CATEGORIES } from '../constants/categories'
import logo from '../assets/logo.png'

export default function Dashboard() {
  const { tasks, loading, error, toggleComplete } = useTasks()
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const in30 = new Date(today)
    in30.setDate(in30.getDate() + 30)

    const overdue = tasks.filter((t) => !t.completed && new Date(t.due_date) < today)
    const upcoming = tasks.filter(
      (t) => !t.completed && new Date(t.due_date) >= today && new Date(t.due_date) <= in30
    )
    const done = tasks.filter((t) => t.completed)
    const health = tasks.length === 0 ? 0 : Math.round((done.length / tasks.length) * 100)

    return { overdue, upcoming, done, health }
  }, [tasks])

  const categoryCounts = useMemo(() => {
    const map = {}
    CATEGORIES.forEach((c) => (map[c.id] = 0))
    tasks.forEach((t) => {
      if (!t.completed && map[t.category] !== undefined) map[t.category] += 1
    })
    return map
  }, [tasks])

  if (loading) {
    return (
      <div className="page">
        <p style={{ color: 'var(--text-secondary)' }}>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <>
      <div className="app-header">
        <div className="app-header-glow-1" />
        <div className="app-header-glow-2" />
        <div className="app-logo-row">
          <div className="app-logo-box">
            <img src={logo} alt="HomePulse" />
          </div>
          <h1 className="app-name gradient-text">HomePulse</h1>
        </div>
        <div className="app-tagline">
          <PulseWave /> &nbsp;Home Health Dashboard
        </div>
        <div className="stats-row">
          <StatCard label="Overdue" value={stats.overdue.length} color="var(--danger)" />
          <StatCard label="This Month" value={stats.upcoming.length} color="var(--blue-light)" />
          <StatCard label="Done" value={stats.done.length} color="var(--teal)" />
          <StatCard label="Health" value={`${stats.health}%`} color="var(--green)" />
        </div>
      </div>

      <div className="page" style={{ paddingTop: 16 }}>
      {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <HealthBar score={stats.health} />
      </div>

      {stats.overdue.length > 0 && (
        <div
          className="card"
          style={{
            background: 'rgba(255,82,82,0.1)',
            borderColor: 'rgba(255,82,82,0.3)',
            marginBottom: 20,
          }}
        >
          <p style={{ fontWeight: 700, color: 'var(--danger)', fontSize: 14 }}>
            ⚠️ {stats.overdue.length} task{stats.overdue.length > 1 ? 's' : ''} overdue
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            Take care of these as soon as you can.
          </p>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Upcoming This Month</h2>
        {stats.upcoming.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Nothing due in the next 30 days.</p>
        ) : (
          stats.upcoming.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleComplete} />
          ))
        )}
      </div>

      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="card"
              onClick={() => navigate(`/tasks?category=${cat.id}`)}
              style={{ textAlign: 'left' }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${cat.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {cat.icon}
              </div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {categoryCounts[cat.id]} pending
              </p>
            </button>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}
