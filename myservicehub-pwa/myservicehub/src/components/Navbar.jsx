import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Request Service', to: '/request' },
  { label: 'Join as Technician', to: '/technician' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-royal rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              <path d="M9 12l1.5 1.5L14 9" stroke="#10B981" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="font-poppins font-bold text-base text-white">
            My<span className="text-blue-400">Service</span>Hub
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-xs sm:text-sm px-3 py-2 rounded-md font-medium transition ${
                pathname === to
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-2 bg-royal text-white text-xs sm:text-sm px-4 py-2 rounded-md font-medium transition hover:bg-royal-dark"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
