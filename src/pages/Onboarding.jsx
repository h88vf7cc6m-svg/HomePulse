import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo.png'

const STEPS = 4

const ACCOUNT_TYPES = [
  { id: 'homeowner', icon: '🏠', label: 'Homeowner', desc: 'Track maintenance for your home' },
  { id: 'business', icon: '💼', label: 'Small Business Owner', desc: 'Track maintenance & compliance for your business' },
]

const OWNER_TYPES = [
  { id: 'first_time', icon: '🏠', label: 'First-Time Homeowner', desc: 'This is my first home' },
  { id: 'experienced', icon: '🏡', label: 'Experienced Homeowner', desc: 'I\'ve owned homes before' },
  { id: 'landlord', icon: '🏘️', label: 'Landlord / Investor', desc: 'I manage rental properties' },
]

const BUSINESS_TYPES = [
  { id: 'retail', icon: '🛍️', label: 'Retail Store', desc: 'Storefront or shop' },
  { id: 'restaurant', icon: '🍽️', label: 'Restaurant / Food Service', desc: 'Restaurant, cafe, or catering' },
  { id: 'office', icon: '🏢', label: 'Office / Professional Services', desc: 'Office-based business' },
  { id: 'medical', icon: '🩺', label: 'Medical / Healthcare', desc: 'Clinic, practice, or care facility' },
  { id: 'warehouse', icon: '📦', label: 'Warehouse / Industrial', desc: 'Warehouse, shop, or plant' },
  { id: 'other_biz', icon: '🏬', label: 'Other', desc: 'Something else' },
]

const HOME_AGES = [
  { id: 'new_build', icon: '🆕', label: 'New Build', desc: 'Under 5 years old' },
  { id: 'newer', icon: '✨', label: 'Newer Home', desc: '5–15 years old' },
  { id: 'established', icon: '🏠', label: 'Established Home', desc: '15–30 years old' },
  { id: 'older', icon: '🏛️', label: 'Older Home', desc: '30+ years old' },
]

const BUILDING_AGES = [
  { id: 'new_build', icon: '🆕', label: 'New Building', desc: 'Under 5 years old' },
  { id: 'newer', icon: '✨', label: 'Newer Building', desc: '5–15 years old' },
  { id: 'established', icon: '🏢', label: 'Established Building', desc: '15–30 years old' },
  { id: 'older', icon: '🏛️', label: 'Older Building', desc: '30+ years old' },
]

const HOME_TYPES = [
  { id: 'single_family', icon: '🏡', label: 'Single Family' },
  { id: 'condo', icon: '🏢', label: 'Condo / Townhouse' },
  { id: 'multi_family', icon: '🏘️', label: 'Multi-Family' },
]

const BUILDING_TYPES = [
  { id: 'leased', icon: '🔑', label: 'Leased Space' },
  { id: 'owned', icon: '🏢', label: 'Owned Building' },
  { id: 'multi_unit', icon: '🏬', label: 'Strip Mall / Multi-Unit' },
]

const REGIONS = [
  { id: 'southeast', icon: '🌴', label: 'Florida / Southeast', desc: 'Hurricane & heat prep' },
  { id: 'midwest', icon: '🌪️', label: 'Midwest', desc: 'Tornado & winter storm prep' },
  { id: 'northeast', icon: '❄️', label: 'Northeast', desc: 'Nor\'easter & ice storm prep' },
  { id: 'northwest', icon: '🌧️', label: 'Pacific Northwest', desc: 'Rain, wind & wildfire smoke prep' },
  { id: 'southwest', icon: '☀️', label: 'Southwest', desc: 'Extreme heat, drought & flash flood prep' },
  { id: 'west', icon: '🔥', label: 'West / California', desc: 'Wildfire, earthquake & drought prep' },
]

function OptionButton({ selected, onClick, icon, label, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px 16px',
        borderRadius: 14,
        border: `2px solid ${selected ? 'var(--teal)' : 'var(--card-border)'}`,
        background: selected ? 'rgba(0,201,167,0.1)' : 'rgba(255,255,255,0.03)',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 10,
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 26, flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontWeight: 700, fontSize: 14, color: selected ? 'var(--teal)' : 'var(--text-primary)' }}>
          {label}
        </p>
        {desc && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</p>
        )}
      </div>
      {selected && (
        <span style={{ marginLeft: 'auto', color: 'var(--teal)', fontSize: 18, flexShrink: 0 }}>✓</span>
      )}
    </button>
  )
}

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [answers, setAnswers] = useState({
    account_type: '',
    owner_type: '',
    business_type: '',
    business_name: '',
    home_age: '',
    home_type: '',
    region: '',
  })

  const isBusiness = answers.account_type === 'business'
  const set = (key, val) => setAnswers((prev) => ({ ...prev, [key]: val }))

  const canNext = () => {
    if (step === 1) return !!answers.account_type
    if (step === 2) return isBusiness ? !!answers.business_type : !!answers.owner_type
    if (step === 3) return !!answers.home_age && !!answers.home_type
    if (step === 4) return !!answers.region
    return false
  }

  const handleFinish = async () => {
    if (!canNext()) return
    setSaving(true)
    localStorage.setItem('homepulse_region', answers.region)

    const { error } = await supabase
      .from('profiles')
      .update({
        account_type: answers.account_type,
        owner_type: isBusiness ? null : answers.owner_type,
        business_type: isBusiness ? answers.business_type : null,
        business_name: isBusiness ? answers.business_name.trim() || null : null,
        home_age: answers.home_age,
        home_type: answers.home_type,
        region: answers.region,
        onboarding_complete: true,
      })
      .eq('user_id', user.id)

    setSaving(false)
    if (!error) {
      completeOnboarding(answers.account_type)
      navigate('/')
    }
  }

  const progressPct = (step / STEPS) * 100

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 430,
      margin: '0 auto',
      padding: '48px 20px 32px',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,201,167,0.3)', flexShrink: 0 }}>
          <img src={logo} alt="HomePulse" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontWeight: 900, fontSize: 18, background: 'linear-gradient(135deg, var(--grad-start), var(--grad-end))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          HomePulse
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
            Step {step} of {STEPS}
          </span>
          <span style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 700 }}>
            {Math.round(progressPct)}% complete
          </span>
        </div>
        <div className="health-bar-track">
          <div className="health-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Step 1 — Account type */}
      {step === 1 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Welcome to HomePulse! 👋</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
            First, tell us what you're managing.
          </p>
          {ACCOUNT_TYPES.map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.account_type === o.id}
              onClick={() => set('account_type', o.id)}
              icon={o.icon}
              label={o.label}
              desc={o.desc}
            />
          ))}
        </>
      )}

      {/* Step 2 — Owner/business type */}
      {step === 2 && !isBusiness && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Let's personalize your experience</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
            What best describes you?
          </p>
          {OWNER_TYPES.map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.owner_type === o.id}
              onClick={() => set('owner_type', o.id)}
              icon={o.icon}
              label={o.label}
              desc={o.desc}
            />
          ))}
        </>
      )}

      {step === 2 && isBusiness && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Tell us about your business</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
            This helps us tailor categories and tasks to what your business actually needs.
          </p>
          <label className="label">Business name (optional)</label>
          <input
            value={answers.business_name}
            onChange={(e) => set('business_name', e.target.value)}
            placeholder="e.g. Sunrise Cafe"
            style={{ marginBottom: 18 }}
          />
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            What type of business?
          </p>
          {BUSINESS_TYPES.map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.business_type === o.id}
              onClick={() => set('business_type', o.id)}
              icon={o.icon}
              label={o.label}
              desc={o.desc}
            />
          ))}
        </>
      )}

      {/* Step 3 — Property details */}
      {step === 3 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
            {isBusiness ? 'Tell us about your building' : 'Tell us about your home'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
            {isBusiness
              ? 'Building age and type help us recommend the right maintenance and compliance tasks.'
              : 'Home age and type help us recommend the right maintenance tasks.'}
          </p>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            {isBusiness ? 'How old is your building?' : 'How old is your home?'}
          </p>
          {(isBusiness ? BUILDING_AGES : HOME_AGES).map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.home_age === o.id}
              onClick={() => set('home_age', o.id)}
              icon={o.icon}
              label={o.label}
              desc={o.desc}
            />
          ))}
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginTop: 6 }}>
            {isBusiness ? 'What type of space?' : 'What type of home?'}
          </p>
          {(isBusiness ? BUILDING_TYPES : HOME_TYPES).map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.home_type === o.id}
              onClick={() => set('home_type', o.id)}
              icon={o.icon}
              label={o.label}
            />
          ))}
        </>
      )}

      {/* Step 4 — Region */}
      {step === 4 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
            {isBusiness ? 'Where is your business?' : 'Where is your home?'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
            Your region determines weather emergency prep guides and seasonal task timing.
          </p>
          {REGIONS.map((o) => (
            <OptionButton
              key={o.id}
              selected={answers.region === o.id}
              onClick={() => set('region', o.id)}
              icon={o.icon}
              label={o.label}
              desc={o.desc}
            />
          ))}
        </>
      )}

      {/* Navigation */}
      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <button
          className="btn-primary"
          disabled={!canNext() || saving}
          onClick={() => {
            if (step < STEPS) setStep(step + 1)
            else handleFinish()
          }}
        >
          {saving ? 'Saving...' : step < STEPS ? 'Continue →' : 'Take me to my Dashboard →'}
        </button>
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            style={{ width: '100%', marginTop: 12, padding: 12, fontSize: 14, color: 'var(--text-muted)', background: 'transparent', border: 'none' }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  )
}
