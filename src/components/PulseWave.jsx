export default function PulseWave() {
  return (
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <polyline
        points="0,7 4,7 6,2 8,12 10,1 12,10 14,5 16,7 24,7"
        stroke="url(#pulsewave-gradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="pulsewave-gradient" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A6DD9" />
          <stop offset="1" stopColor="#00C9A7" />
        </linearGradient>
      </defs>
    </svg>
  )
}
