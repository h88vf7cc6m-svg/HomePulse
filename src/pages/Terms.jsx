import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Terms() {
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

      <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32 }}>Last updated: July 10, 2026</p>

      <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)', fontSize: 14 }}>

        <Section title="1. Acceptance of Terms">
          By creating an account or using HomePulse ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          <br /><br />
          These Terms constitute a legally binding agreement between you and HomePulse365 ("HomePulse," "we," "us," or "our").
        </Section>

        <Section title="2. Description of Service">
          HomePulse is a home maintenance management application that helps homeowners track, schedule, and manage home maintenance tasks. The Service provides:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Maintenance task tracking and scheduling</li>
            <li>Expert-recommended task templates by category and region</li>
            <li>Home health scoring and maintenance reminders</li>
            <li>Vendor and service provider tracking</li>
            <li>Personalized recommendations based on your home profile</li>
          </ul>
        </Section>

        <Section title="3. Account Registration">
          To use HomePulse, you must create an account with a valid email address. You are responsible for:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Providing accurate and complete registration information</li>
            <li>Maintaining the security of your password</li>
            <li>All activity that occurs under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>
          <br />
          You must be at least 18 years old to create an account.
        </Section>

        <Section title="4. Subscriptions and Payment">
          HomePulse may offer free and paid subscription tiers. For paid subscriptions:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Subscriptions are billed on a recurring basis (monthly or annually)</li>
            <li>You authorize us to charge your payment method at the start of each billing period</li>
            <li>You may cancel your subscription at any time through your account settings</li>
            <li>Cancellations take effect at the end of the current billing period — no partial refunds</li>
            <li>We reserve the right to change pricing with 30 days' notice</li>
          </ul>
          <br />
          Payments are processed securely through Stripe. HomePulse does not store your credit card information.
        </Section>

        <Section title="5. Acceptable Use">
          You agree not to:
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Reverse engineer, copy, or redistribute any part of the Service</li>
            <li>Use the Service to transmit spam or malicious content</li>
            <li>Share your account credentials with others</li>
          </ul>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <strong style={{ color: 'var(--text-primary)' }}>IMPORTANT:</strong> HomePulse provides maintenance recommendations for informational purposes only. We are not licensed contractors, engineers, or home inspectors.
          <br /><br />
          The task templates and maintenance guides provided in the app are general recommendations and may not be appropriate for your specific home, local codes, or circumstances. Always consult a qualified professional before undertaking significant home repairs or maintenance work.
          <br /><br />
          THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT ANY SPECIFIC RESULTS WILL BE ACHIEVED BY FOLLOWING OUR RECOMMENDATIONS.
        </Section>

        <Section title="7. Limitation of Liability">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOMEPULSE365 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO PROPERTY DAMAGE, PERSONAL INJURY, OR FINANCIAL LOSS RESULTING FROM HOME MAINTENANCE DECISIONS MADE USING OUR APP.
          <br /><br />
          Our total liability to you for any claims arising from these Terms or the Service shall not exceed the amount you paid to HomePulse in the 12 months preceding the claim.
        </Section>

        <Section title="8. Intellectual Property">
          All content, features, and functionality of HomePulse — including but not limited to text, graphics, logos, and software — are the exclusive property of HomePulse365 and are protected by copyright and other intellectual property laws.
          <br /><br />
          Your personal data and content you create within the app remain yours. You grant us a limited license to store and process your content solely to provide the Service.
        </Section>

        <Section title="9. Termination">
          You may delete your account at any time by contacting us at <a href="mailto:support@homepulse365.com" style={{ color: 'var(--teal)' }}>support@homepulse365.com</a>. Upon deletion, your data will be permanently removed within 30 days.
          <br /><br />
          We reserve the right to suspend or terminate accounts that violate these Terms, with or without notice.
        </Section>

        <Section title="10. Governing Law">
          These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved through binding arbitration rather than in court, except that either party may seek injunctive relief in court for intellectual property violations.
        </Section>

        <Section title="11. Changes to Terms">
          We may update these Terms from time to time. We will notify you of material changes by email or through the app. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.
        </Section>

        <Section title="12. Contact Us">
          If you have any questions about these Terms of Service, please contact us at:
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
