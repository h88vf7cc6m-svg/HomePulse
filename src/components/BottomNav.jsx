import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/templates', label: 'Guides', icon: '📋' },
  { to: '/vendors', label: 'Vendors', icon: '🧰' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 430,
        margin: '0 auto',
        background: 'var(--navy-mid)',
        borderTop: '1px solid var(--card-border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0 calc(10px + env(safe-area-inset-bottom))',
        zIndex: 50,
      }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            fontSize: 10,
            fontWeight: isActive ? 700 : 400,
            color: isActive ? 'var(--teal)' : 'var(--text-muted)',
            background: isActive
              ? 'linear-gradient(135deg, rgba(42,109,217,0.2), rgba(0,201,167,0.13))'
              : 'transparent',
            border: isActive ? '1px solid var(--card-border)' : '1px solid transparent',
            borderRadius: 10,
            padding: '9px 2px 7px',
            margin: '0 3px',
            flex: 1,
            transition: 'all 0.2s',
          })}
        >
          <span style={{ fontSize: 17 }}>{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
