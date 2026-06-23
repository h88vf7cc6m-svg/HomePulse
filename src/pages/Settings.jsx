import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import logo from '../assets/logo.png'

const NOTIF_KEY = 'homepulse_notifications'

const defaultNotifs = {
  push: true,
  weeklySummary: true,
  overdueAlerts: true,
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`toggle-switch ${checked ? 'on' : ''}`}
      style={{ flexShrink: 0 }}
    >
      <span className="toggle-thumb" />
    </button>
  )
}

export default function Settings() {
  const { user, signOut } = useAuth()
  const [notifs, setNotifs] = useState(defaultNotifs)
  const [profile, setProfile] = useState({ address: '', year_built: '', sq_footage: '' })
  const [editing, setEditing] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(NOTIF_KEY)
    if (stored) setNotifs(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      setLoadingProfile(true)
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!fetchError && data) {
        setProfile({
          address: data.address || '',
          year_built: data.year_built || '',
          sq_footage: data.sq_footage || '',
        })
      }
      setLoadingProfile(false)
    }
    fetchProfile()
  }, [user])

  const updateNotif = (key, value) => {
    const next = { ...notifs, [key]: value }
    setNotifs(next)
    localStorage.setItem(NOTIF_KEY, JSON.stringify(next))
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setError(null)
    const { error: upsertError } = await supabase
      .from('profiles')
      .update({
        address: profile.address || null,
        year_built: profile.year_built ? parseInt(profile.year_built, 10) : null,
        sq_footage: profile.sq_footage ? parseInt(profile.sq_footage, 10) : null,
      })
      .eq('user_id', user.id)

    setSaving(false)
    if (upsertError) {
      setError(upsertError.message)
      return
    }
    setEditing(false)
  }

  return (
    <div className="page">
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Settings</h1>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Notifications</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 14 }}>Push Notifications</span>
          <Toggle checked={notifs.push} onChange={(v) => updateNotif('push', v)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 14 }}>Weekly Summary</span>
          <Toggle checked={notifs.weeklySummary} onChange={(v) => updateNotif('weeklySummary', v)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>Overdue Alerts</span>
          <Toggle checked={notifs.overdueAlerts} onChange={(v) => updateNotif('overdueAlerts', v)} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700 }}>Home Profile</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} style={{ fontSize: 13, color: 'var(--teal-light)', fontWeight: 600 }}>
              Edit
            </button>
          )}
        </div>

        {loadingProfile ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Loading profile...</p>
        ) : editing ? (
          <>
            <div style={{ marginBottom: 12 }}>
              <label className="label">Address</label>
              <input
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                placeholder="123 Main St"
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="label">Year Built</label>
              <input
                type="number"
                value={profile.year_built}
                onChange={(e) => setProfile({ ...profile, year_built: e.target.value })}
                placeholder="1998"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Square Footage</label>
              <input
                type="number"
                value={profile.sq_footage}
                onChange={(e) => setProfile({ ...profile, sq_footage: e.target.value })}
                placeholder="2200"
              />
            </div>
            {error && <p className="error-text" style={{ marginBottom: 12 }}>{error}</p>}
            <button className="btn-primary" onClick={handleSaveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Address: {profile.address || '—'}
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Year Built: {profile.year_built || '—'}
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Square Footage: {profile.sq_footage || '—'}
            </p>
          </>
        )}
      </div>

      <div
        style={{
          marginBottom: 20,
          background: 'linear-gradient(135deg, rgba(42,109,217,0.2), rgba(0,201,167,0.13))',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
          padding: '20px 16px',
          textAlign: 'center',
        }}
      >
        <img src={logo} alt="HomePulse" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 8 }} />
        <p style={{ fontWeight: 700, fontSize: 14 }}>HomePulse</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Version 1.0.0</p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
          Keep your home running smoothly.
        </p>
      </div>

      <button
        onClick={signOut}
        className="btn-secondary"
        style={{ color: 'var(--danger)', borderColor: 'rgba(255,82,82,0.3)' }}
      >
        Sign Out
      </button>
    </div>
  )
}
