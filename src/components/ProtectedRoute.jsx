import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children, skipOnboarding = false }) {
  const { session, loading, onboardingComplete, checkingOnboarding } = useAuth()

  if (loading || checkingOnboarding) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/auth" replace />
  }

  if (!onboardingComplete && !skipOnboarding) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}
