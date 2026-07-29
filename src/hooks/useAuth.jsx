import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [checkingOnboarding, setCheckingOnboarding] = useState(true)
  const [accountType, setAccountType] = useState(null)
  const [plan, setPlan] = useState('free')

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
        setAccountType(null)
        setPlan('free')
        setCheckingOnboarding(false)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Always asks the database — never trust a cached flag, since a single
  // browser/device can be used by more than one account (a cached flag
  // isn't scoped to a user and would leak one account's status to another).
  const checkOnboarding = async (userId) => {
    setCheckingOnboarding(true)
    const { data } = await supabase
      .from('profiles')
      .select('onboarding_complete, account_type, plan')
      .eq('user_id', userId)
      .maybeSingle()
    setOnboardingComplete(!!data?.onboarding_complete)
    setAccountType(data?.account_type || null)
    setPlan(data?.plan || 'free')
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
    if (type) setAccountType(type)
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
