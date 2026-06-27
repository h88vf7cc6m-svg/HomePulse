import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo.png'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const next = {}
    if (password.length < 6) next.password = 'Password must be at least 6 characters'
    if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const { error } = await updatePassword(password)
    setSubmitting(false)

    if (error) {
      setErrors({ form: error.message })
      return
    }

    setDone(true)
    setTimeout(() => navigate('/'), 1500)
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
        <h1 className="gradient-text" style={{ fontSize: 24, fontWeight: 800 }}>Reset Password</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
          Choose a new password for your account
        </p>
      </div>

      <div className="card">
        {done ? (
          <p style={{ color: 'var(--teal)', fontWeight: 700, textAlign: 'center' }}>
            Password updated! Redirecting...
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label className="label">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            {errors.form && <p className="error-text" style={{ marginBottom: 14 }}>{errors.form}</p>}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
