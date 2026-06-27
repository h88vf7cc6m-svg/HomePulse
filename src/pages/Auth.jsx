import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo.png'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const { signIn, signUp, requestPasswordReset } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required'
    if (!password) next.password = 'Password is required'
    if (mode === 'signup' && password.length < 6) next.password = 'Password must be at least 6 characters'
    if (mode === 'signup' && confirmPassword !== password) next.confirmPassword = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const { error } = mode === 'signin' ? await signIn(email, password) : await signUp(email, password)
    setSubmitting(false)

    if (error) {
      setErrors({ form: error.message })
      return
    }

    navigate('/')
  }

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrors({ email: 'Enter your email above first' })
      return
    }
    setSubmitting(true)
    const { error } = await requestPasswordReset(email.trim())
    setSubmitting(false)

    if (error) {
      setErrors({ form: error.message })
      return
    }
    setResetSent(true)
  }

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            margin: '0 auto 16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,201,167,0.4)',
          }}
        >
          <img src={logo} alt="HomePulse" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: 24, fontWeight: 800 }}>HomePulse</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
          Keep your home running smoothly
        </p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', marginBottom: 20, background: 'var(--navy-light)', borderRadius: 13, padding: 4 }}>
          <button
            onClick={() => setMode('signin')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              background: mode === 'signin' ? 'var(--card-bg)' : 'transparent',
              color: mode === 'signin' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              background: mode === 'signup' ? 'var(--card-bg)' : 'transparent',
              color: mode === 'signup' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div style={{ marginBottom: mode === 'signup' ? 14 : 20 }}>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {mode === 'signin' && (
            <div style={{ marginBottom: 20, textAlign: 'right' }}>
              {resetSent ? (
                <span style={{ fontSize: 12, color: 'var(--teal)' }}>Check your email for a reset link.</span>
              ) : (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              )}
            </div>
          )}

          {mode === 'signup' && (
            <div style={{ marginBottom: 20 }}>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
          )}

          {errors.form && <p className="error-text" style={{ marginBottom: 14 }}>{errors.form}</p>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
