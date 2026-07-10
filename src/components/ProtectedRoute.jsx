import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children, skipOnboarding = false }) {
  const { session, loading, user } = useAuth()
  const location = useLocation()
  const [checkingOnboarding, setCheckingOnboarding] = useState(true)
  const [onboardingComplete, setOnboardingComplete] = useState(true)

  useEffect(() => {
    if (!user) {
      setCheckingOnboarding(false)
      return
    }
    supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setOnboardingComplete(!!data?.onboarding_complete)
        setCheckingOnboarding(false)
      })
  }, [user])

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

  if (!onboardingComplete && !skipOnboarding && !location.state?.onboardingComplete) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}
