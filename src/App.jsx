import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import ResetPassword from './pages/ResetPassword'
import Onboarding from './pages/Onboarding'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Templates from './pages/Templates'
import Vendors from './pages/Vendors'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import BottomNav from './components/BottomNav'

function Layout({ children }) {
  const location = useLocation()
  const showNav = !['/auth', '/reset-password', '/onboarding', '/privacy', '/terms'].includes(location.pathname)

  return (
    <>
      {children}
      {showNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute skipOnboarding>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendors"
            element={
              <ProtectedRoute>
                <Vendors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
