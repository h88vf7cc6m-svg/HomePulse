import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [checkingOnboarding, setCheckingOnboarding] = useState(true)
  const [accountType, setAccountType] = useState(() => localStorage.getItem('homepulse_account_type') || null)
  const [plan, setPlan] = useState(() => localStorage.getItem('homepulse_plan') || 'free')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session?.user) {
        checkOnboarding(data.session.user.id)
      } else {
        setCheckingOnboarding(false)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (newSession?.user) {
        checkOnboarding(newSession.user.id)
      } else {
        setOnboardingComplete(false)
        setCheckingOnboarding(false)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const checkOnboarding = async (userId) => {
    const cached = localStorage.getItem('homepulse_onboarding_complete')
    if (cached === 'true') {
      setOnboardingComplete(true)
      setCheckingOnboarding(false)
      return
    }
    const { data } = await supabase
      .from('profiles')
      .select('onboarding_complete, account_type, plan')
      .eq('user_id', userId)
      .maybeSingle()
    const complete = !!data?.onboarding_complete
    if (complete) {
      localStorage.setItem('homepulse_onboarding_complete', 'true')
      if (data?.account_type) {
        localStorage.setItem('homepulse_account_type', data.account_type)
        setAccountType(data.account_type)
      }
      if (data?.plan) {
        localStorage.setItem('homepulse_plan', data.plan)
        setPlan(data.plan)
      }
    }
    setOnboardingComplete(complete)
    setCheckingOnboarding(false)
  }

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    return { error, needsConfirmation: !error && !data.session }
  }

  const signOut = async () => {
    localStorage.removeItem('homepulse_onboarding_complete')
    localStorage.removeItem('homepulse_account_type')
    localStorage.removeItem('homepulse_plan')
    setOnboardingComplete(false)
    setAccountType(null)
    setPlan('free')
    await supabase.auth.signOut()
  }

  const requestPasswordReset = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return { error }
  }

  const completeOnboarding = (type) => {
    localStorage.setItem('homepulse_onboarding_complete', 'true')
    if (type) {
      localStorage.setItem('homepulse_account_type', type)
      setAccountType(type)
    }
    setOnboardingComplete(true)
  }

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      loading,
      onboardingComplete,
      checkingOnboarding,
      accountType,
      plan,
      signIn,
      signUp,
      signOut,
      requestPasswordReset,
      updatePassword,
      completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
