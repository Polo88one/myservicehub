import { useState } from 'react'
import { useApp } from '../lib/AppContext'
import { StatusBadge, UrgencyBadge } from '../components/Badge'
import RequestDetailPanel from '../components/RequestDetailPanel'

const FILTERS = ['All', 'New', 'Reviewing', 'Assigned', 'In Progress', 'Completed', 'Cancelled']

const SIDEBAR_LINKS = [
  { id: 'requests', icon: '📋', label: 'Service Requests' },
  { id: 'technicians', icon: '👨‍🔧', label: 'Technicians' },
  { id: 'reports', icon: '📊', label: 'Reports' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
]

export default function AdminDashboard() {
  const { requests, technicians } = useApp()
  const [activeSection, setActiveSection] = useState('requests')
  const [filter, setFilter] = useState('All')
  const [selectedRequest, setSelectedRequest] = useState(null)

  const counts = {
    New: requests.filter(r => r.status === 'New').length,
    Assigned: requests.filter(r => r.status === 'Assigned').length,
    'In Progress': requests.filter(r => r.status === 'In Progress').length,
    Completed: requests.filter(r => r.status === 'Completed').length,
    Technicians: technicians.length,
  }

  const filtered = filter === 'All' ? requests : requests.filter(r => r.status === filter)

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <aside className="w-56 bg-navy flex-shrink-0 hidden sm:block">
        <div className="pt-4">
          <div className="px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Overview</div>
          {SIDEBAR_LINKS.slice(0, 2).map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`sidebar-link w-full text-left ${activeSection === id ? 'active' : ''}`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
          <div className="px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">Analytics</div>
          {SIDEBAR_LINKS.slice(2).map(({ id, icon, label }) => (
            <button key={id} onClick={() => setActiveSection(id)} className="sidebar-link w-full text-left">
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-x-auto">
        {/* Mobile section switcher */}
        <div className="flex gap-2 sm:hidden mb-4 overflow-x-auto pb-1">
          {SIDEBAR_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition ${
                activeSection === id ? 'bg-royal text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* REQUESTS SECTION */}
        {activeSection === 'requests' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-navy font-poppins">Service Requests</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">English | <span className="text-royal font-medium">العربية</span></span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'New Requests', val: counts.New, color: 'text-royal' },
                { label: 'Assigned Jobs', val: counts.Assigned, color: 'text-amber-600' },
                { label: 'In Progress', val: counts['In Progress'], color: 'text-purple-600' },
                { label: 'Completed', val: counts.Completed, color: 'text-green-accent' },
                { label: 'Technicians', val: counts.Technicians, color: 'text-navy' },
              ].map(({ label, val, color }) => (
                <div key={label} className="stat-card">
                  <div className="stat-label text-xs text-gray-400 mb-2">{label}</div>
                  <div className={`text-3xl font-bold font-poppins ${color}`}>{val}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="card">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-navy">All Requests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition border ${
                        filter === f
                          ? 'bg-royal text-white border-royal'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-royal hover:text-royal'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {['Request ID', 'Customer', 'Equipment', 'Problem', 'Emirate', 'Urgency', 'Status', 'Technician', ''].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(req => (
                      <tr key={req.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition">
                        <td className="px-4 py-3">
                          <button onClick={() => setSelectedRequest(req)} className="font-semibold text-royal hover:underline">
                            {req.id}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-navy text-xs">{req.customerName}</div>
                          <div className="text-xs text-gray-400">{req.company}</div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700">{req.equipment}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{req.problem}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{req.emirate}</td>
                        <td className="px-4 py-3"><UrgencyBadge urgency={req.urgency} /></td>
                        <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                        <td className="px-4 py-3 text-xs text-gray-500">{req.assignedTech || '—'}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 text-royal hover:bg-royal hover:text-white hover:border-royal transition"
                          >
                            View / Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={9} className="text-center py-10 text-gray-400 text-sm">No requests found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TECHNICIANS SECTION */}
        {activeSection === 'technicians' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-navy font-poppins">Registered Technicians</h2>
              <button className="bg-green-accent text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition">
                + Add Technician
              </button>
            </div>
            <div className="card">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-navy">Technician Roster</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {['Name', 'Expertise', 'Emirates', 'Availability', 'Type', 'Status', ''].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {technicians.map(t => (
                      <tr key={t.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition">
                        <td className="px-4 py-3 font-medium text-navy text-xs">{t.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px]">{Array.isArray(t.expertise) ? t.expertise.join(', ') : t.expertise}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{Array.isArray(t.emirates) ? t.emirates.join(', ') : t.emirates}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{t.availability}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{t.type}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${t.status === 'Approved' ? 'bg-green-accent' : 'bg-amber-400'}`} />
                            <span className="text-xs">{t.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 text-royal hover:bg-royal hover:text-white hover:border-royal transition">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PLACEHOLDER SECTIONS */}
        {(activeSection === 'reports' || activeSection === 'settings') && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">{activeSection === 'reports' ? '📊' : '⚙️'}</div>
            <h3 className="text-xl font-bold text-navy mb-2 font-poppins">
              {activeSection === 'reports' ? 'Reports' : 'Settings'} — Coming Soon
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">This section will be available in the next phase of development.</p>
          </div>
        )}
      </main>

      {/* Detail Panel */}
      {selectedRequest && (
        <RequestDetailPanel
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  )
}
