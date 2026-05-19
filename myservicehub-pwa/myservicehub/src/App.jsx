import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './lib/AppContext'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import InstallPrompt from './components/InstallPrompt'
import Landing from './pages/Landing'
import RequestService from './pages/RequestService'
import JoinTechnician from './pages/JoinTechnician'
import AdminDashboard from './pages/AdminDashboard'

function AppShell() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin'

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${!isAdmin ? 'pb-16 sm:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/request" element={<RequestService />} />
          <Route path="/technician" element={<JoinTechnician />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      <BottomNav />
      <InstallPrompt />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
