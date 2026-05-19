import { Link } from 'react-router-dom'

const STEPS = [
  { n: 1, title: 'Submit Service Request', desc: 'Fill out the quick online form with your equipment details and issue description.' },
  { n: 2, title: 'We Review the Request', desc: 'MyServiceHub team reviews and validates your service request promptly.' },
  { n: 3, title: 'Technician Assigned', desc: 'A trusted, verified technician is matched based on your equipment and location.' },
  { n: 4, title: 'Service Completed', desc: 'Technician arrives at your site and resolves the issue professionally.' },
]

const EQUIPMENT = [
  {
    icon: '🏦',
    label: 'Banking Equipment',
    bg: 'bg-blue-50',
    items: ['Cash Counting Machines', 'Coin Counters & Sorters', 'Currency Detectors', 'UV Detectors', 'Currency Rate Boards', 'Deposit Machines'],
  },
  {
    icon: '🖨️',
    label: 'Office Equipment',
    bg: 'bg-green-50',
    items: ['Printers & Copiers', 'Digital Duplicators', 'Scanners'],
  },
  {
    icon: '💻',
    label: 'IT Equipment',
    bg: 'bg-purple-50',
    items: ['Laptops & Desktops', 'POS Systems', 'Networking Equipment'],
  },
  {
    icon: '📹',
    label: 'Security & Business',
    bg: 'bg-amber-50',
    items: ['CCTV Systems', 'Biometric Systems', 'Attendance Machines'],
  },
]

const WHY = [
  { icon: '✅', title: 'Trusted Technicians', desc: 'All technicians are verified and approved before assignment.' },
  { icon: '⚡', title: 'Fast Response', desc: 'Urgent requests are prioritized and dispatched quickly.' },
  { icon: '🇦🇪', title: 'UAE-Focused', desc: 'Serving all 7 Emirates with local technician coverage.' },
  { icon: '📋', title: 'Professional Coordination', desc: 'Dedicated admin team manages every request end-to-end.' },
  { icon: '📊', title: 'Service History', desc: 'Full tracking of all your service requests and resolutions.' },
  { icon: '📱', title: 'Easy Submission', desc: 'Submit requests in minutes from any device, anywhere.' },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-[#1e3a5f] py-20 px-6 text-center">
        <div className="inline-block bg-royal/40 border border-blue-400/30 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6 font-poppins tracking-wide">
          🇦🇪 UAE-Focused Equipment Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">
          Reliable Equipment Service,{' '}
          <span className="text-blue-400">Connected Fast</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Submit your equipment issue and connect with trusted technicians for banking, office, and IT equipment support.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/request" className="btn-primary">Request Service</Link>
          <Link to="/technician" className="btn-outline">Join as Technician</Link>
          <a
            href="https://wa.me/97100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M11.994 2.001C6.46 2.001 2 6.462 2 12c0 1.767.461 3.427 1.268 4.876L2.05 21.898l5.149-1.198A9.955 9.955 0 0012 22c5.534 0 9.994-4.461 9.994-9.994 0-2.67-1.04-5.18-2.929-7.07a9.937 9.937 0 00-7.071-2.935z" />
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">How It Works</h2>
        <p className="text-gray-500 text-center mb-10">Simple 4-step process from request to resolution</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="bg-white rounded-xl p-6 border border-gray-200 text-center relative">
              <div className="w-10 h-10 bg-royal rounded-full flex items-center justify-center text-white font-bold text-base font-poppins mx-auto mb-4">
                {n}
              </div>
              <h4 className="text-sm font-semibold text-navy mb-2">{title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Equipment */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">Supported Equipment</h2>
        <p className="text-gray-500 text-center mb-10">Banking, office, IT, and security systems across all emirates</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {EQUIPMENT.map(({ icon, label, bg, items }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center text-xl mb-3`}>
                {icon}
              </div>
              <h4 className="text-sm font-semibold text-navy mb-3">{label}</h4>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-accent rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="py-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">Why MyServiceHub</h2>
        <p className="text-gray-500 text-center mb-10">The smarter way to manage equipment service in the UAE</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {WHY.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-4">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
              <div>
                <h4 className="text-sm font-semibold text-navy mb-1">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-900 to-emerald-700 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Need Immediate Support?</h2>
        <p className="text-emerald-300 mb-8">Our team is available on WhatsApp for urgent queries</p>
        <a
          href="https://wa.me/97100000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp inline-flex mx-auto"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M11.994 2.001C6.46 2.001 2 6.462 2 12c0 1.767.461 3.427 1.268 4.876L2.05 21.898l5.149-1.198A9.955 9.955 0 0012 22c5.534 0 9.994-4.461 9.994-9.994 0-2.67-1.04-5.18-2.929-7.07a9.937 9.937 0 00-7.071-2.935z" />
          </svg>
          Contact on WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-slate-400 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <div className="font-poppins font-bold text-white mb-1">MyServiceHub</div>
            <div className="text-sm">support@myservicehub.com &nbsp;|&nbsp; +971 XX XXX XXXX</div>
            <div className="text-xs mt-1">© 2025 MyServiceHub. All rights reserved.</div>
          </div>
          <div className="flex gap-5 text-sm">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
