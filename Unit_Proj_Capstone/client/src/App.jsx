import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}
