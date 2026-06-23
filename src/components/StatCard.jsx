export default function StatCard({ label, value, color }) {
  return (
    <div className="stat-card" style={{ '--stat-color': color || 'var(--teal)' }}>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  )
}
