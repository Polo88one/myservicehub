import { useState } from 'react'
import { useApp } from '../lib/AppContext'
import { StatusBadge, UrgencyBadge } from './Badge'

const STATUSES = ['New', 'Reviewing', 'Assigned', 'In Progress', 'Completed', 'Cancelled']

export default function RequestDetailPanel({ request, onClose }) {
  const { technicians, updateRequest } = useApp()
  const [status, setStatus] = useState(request.status)
  const [tech, setTech] = useState(request.assignedTech || '')
  const [notes, setNotes] = useState(request.notes || '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateRequest(request.id, { status, assignedTech: tech || null, notes })
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 800)
  }

  const approvedTechs = technicians.filter(t => t.status === 'Approved')

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-0.5">Service Request</div>
            <h3 className="text-lg font-bold text-navy font-poppins">#{request.id}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition text-lg">×</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Status & Urgency */}
          <div className="flex gap-3">
            <StatusBadge status={request.status} />
            <UrgencyBadge urgency={request.urgency} />
          </div>

          {/* Customer */}
          <section>
            <h4 className="text-xs font-semibold text-royal uppercase tracking-widest mb-3">Customer</h4>
            <div className="space-y-2">
              {[
                ['Name', request.customerName],
                ['Company', request.company],
                ['Mobile', request.mobile],
                ['Email', request.email || '—'],
                ['Type', request.customerType],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-navy text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Equipment */}
          <section>
            <h4 className="text-xs font-semibold text-royal uppercase tracking-widest mb-3">Equipment</h4>
            <div className="space-y-2">
              {[
                ['Category', request.category],
                ['Type', request.equipment],
                ['Brand', request.brand || '—'],
                ['Model', request.model || '—'],
                ['Serial No.', request.serial || '—'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-navy text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Problem */}
          <section>
            <h4 className="text-xs font-semibold text-royal uppercase tracking-widest mb-3">Problem</h4>
            <div className="space-y-2">
              {[
                ['Type', request.problem],
                ['Emirate', request.emirate],
                ['Address', request.address],
                ['Office Timing', request.officeTiming || '—'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-navy text-right max-w-[65%]">{val}</span>
                </div>
              ))}
            </div>
            {request.description && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                {request.description}
              </div>
            )}
          </section>

          {/* Preferred Visit */}
          {(request.preferredDate || request.preferredTime) && (
            <section>
              <h4 className="text-xs font-semibold text-royal uppercase tracking-widest mb-3">Preferred Visit</h4>
              <div className="space-y-2">
                {request.preferredDate && (
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Date</span>
                    <span className="font-medium text-navy">{request.preferredDate}</span>
                  </div>
                )}
                {request.preferredTime && (
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Time</span>
                    <span className="font-medium text-navy">{request.preferredTime}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Assign Section */}
          <section className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-navy mb-3">Assign Technician</h4>
            <div className="space-y-3">
              <div>
                <label className="form-label">Assign To</label>
                <select className="form-input" value={tech} onChange={e => setTech(e.target.value)}>
                  <option value="">Select technician...</option>
                  {approvedTechs.map(t => (
                    <option key={t.id} value={t.name}>
                      {t.name} — {t.expertise.slice(0, 2).join(', ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Update Status</label>
                <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Internal Notes</label>
                <textarea
                  className="form-input resize-y"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add notes for the technician..."
                />
              </div>
              <button
                onClick={handleSave}
                className={`w-full py-3 rounded-lg font-semibold text-sm font-poppins transition ${
                  saved ? 'bg-green-500 text-white' : 'bg-royal text-white hover:bg-royal-dark'
                }`}
              >
                {saved ? '✅ Saved!' : 'Save Assignment'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
