import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Privacy() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
          <img src={logo} alt="HomePulse" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontWeight: 900, fontSize: 18, background: 'linear-gradient(135deg, var(--grad-start), var(--grad-end))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          HomePulse
        </span>
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32 }}>Last updated: July 10, 2026</p>

      <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)', fontSize: 14 }}>

        <Section title="1. Who We Are">
          HomePulse365 ("HomePulse," "we," "us," or "our") operates the HomePulse home maintenance app available at homepulse365.com. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
          <br /><br />
          Contact us at: <a href="mailto:support@homepulse365.com" style={{ color: 'var(--teal)' }}>support@homepulse365.com</a>
        </Section>

        <Section title="2. Information We Collect">
          <strong style={{ color: 'var(--text-primary)' }}>Information you provide:</strong>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Email address and password when you create an account</li>
            <li>Home profile information (owner type, home age, home type, region)</li>
            <li>Maintenance tasks, notes, due dates, and completion records you create</li>
            <li>Vendor information you choose to save</li>
          </ul>
          <br />
          <strong style={{ color: 'var(--text-primary)' }}>Information collected automatically:</strong>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Device type and browser information</li>
            <li>Usage data (pages visited, features used)</li>
            <li>IP address and general location</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          We use your information to:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Create and manage your account</li>
            <li>Provide personalized home maintenance recommendations based on your home profile and region</li>
            <li>Send transactional emails (account confirmation, password reset)</li>
            <li>Improve the HomePulse app and features</li>
            <li>Process payments and manage subscriptions (when applicable)</li>
            <li>Respond to your support requests</li>
          </ul>
          <br />
          We do <strong style={{ color: 'var(--text-primary)' }}>not</strong> sell your personal information to third parties.
        </Section>

        <Section title="4. Data Storage and Security">
          Your data is stored securely using Supabase, a trusted cloud database provider. We use industry-standard encryption for data in transit (HTTPS/TLS) and at rest. Passwords are never stored in plain text.
          <br /><br />
          While we take reasonable precautions to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
        </Section>

        <Section title="5. Third-Party Services">
          HomePulse uses the following third-party services:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Supabase</strong> — database and authentication (supabase.com)</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Resend</strong> — transactional email delivery (resend.com)</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Vercel</strong> — app hosting (vercel.com)</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Stripe</strong> — payment processing (stripe.com) — when applicable</li>
          </ul>
          <br />
          Each of these providers has their own privacy policy governing how they handle data.
        </Section>

        <Section title="6. Cookies and Local Storage">
          HomePulse uses browser local storage to remember your preferences (such as your selected region) and to keep you logged in between sessions. We do not use advertising cookies or tracking pixels.
        </Section>

        <Section title="7. Your Rights">
          You have the right to:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and all associated data</li>
            <li>Export your data</li>
          </ul>
          <br />
          To exercise any of these rights, contact us at <a href="mailto:support@homepulse365.com" style={{ color: 'var(--teal)' }}>support@homepulse365.com</a>.
        </Section>

        <Section title="8. Children's Privacy">
          HomePulse is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.
        </Section>

        <Section title="9. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by displaying a notice in the app. Your continued use of HomePulse after changes are posted constitutes your acceptance of the updated policy.
        </Section>

        <Section title="10. Contact Us">
          If you have any questions about this Privacy Policy, please contact us at:
          <br /><br />
          <strong style={{ color: 'var(--text-primary)' }}>HomePulse365</strong><br />
          Email: <a href="mailto:support@homepulse365.com" style={{ color: 'var(--teal)' }}>support@homepulse365.com</a><br />
          Website: <a href="https://www.homepulse365.com" style={{ color: 'var(--teal)' }}>homepulse365.com</a>
        </Section>
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: 32, padding: '10px 20px', borderRadius: 10, border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}
      >
        ← Back
      </button>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  )
}
