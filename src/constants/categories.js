export const CATEGORIES = [
  { id: 'hvac', name: 'HVAC', icon: '🌬️', color: '#00C9A7' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#2A6DD9' },
  { id: 'exterior', name: 'Exterior', icon: '🏡', color: '#1DB954' },
  { id: 'electrical', name: 'Electrical', icon: '⚡', color: '#FFB300' },
  { id: 'safety', name: 'Safety', icon: '🛡️', color: '#FF7043' },
  { id: 'insurance', name: 'Insurance', icon: '📋', color: '#00BCD4' },
  { id: 'pest', name: 'Pest Control', icon: '🐜', color: '#8BC34A' },
  { id: 'irrigation', name: 'Irrigation', icon: '💧', color: '#29B6F6' },
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]

export const FREQUENCIES = ['Monthly', 'Quarterly', 'Seasonal', 'Annual', 'One-time']
