import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Vendors from './pages/Vendors'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import BottomNav from './components/BottomNav'

function Layout({ children }) {
  const location = useLocation()
  const showNav = location.pathname !== '/auth' && location.pathname !== '/reset-password'

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
