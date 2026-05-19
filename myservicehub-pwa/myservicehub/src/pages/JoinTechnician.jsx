import { useState } from 'react'
import { useApp } from '../lib/AppContext'
import { EMIRATES, TECH_EXPERTISE } from '../data/mockData'

function SectionTitle({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-royal uppercase tracking-widest mb-4">
      <span>{icon}</span> {label}
    </div>
  )
}

export default function JoinTechnician() {
  const { addTechnician } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', mobile: '', email: '',
    emirates: [], expertise: [],
    brands: '', experience: '', type: '', availability: '',
    notes: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function toggleArr(k, val) {
    setForm(f => ({
      ...f,
      [k]: f[k].includes(val) ? f[k].filter(x => x !== val) : [...f[k], val],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addTechnician(form)
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-navy mb-3">Profile Submitted!</h2>
        <p className="text-gray-600 mb-8">
          Your technician profile has been submitted for review and approval. Our team will contact you within 1–2 business days.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-primary">Submit Another Profile</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">Join as Technician</h1>
      <p className="text-gray-500 text-sm mb-8">Register your profile to start receiving service assignments across the UAE</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Info */}
        <div className="card p-6">
          <SectionTitle icon="👤" label="Personal Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input className="form-input" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Mohammed Al Rashidi" />
            </div>
            <div>
              <label className="form-label">Mobile Number *</label>
              <input className="form-input" required type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+971 55 XXX XXXX" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Email Address *</label>
              <input className="form-input" required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="tech@email.com" />
            </div>
          </div>
        </div>

        {/* Emirates */}
        <div className="card p-6">
          <SectionTitle icon="📍" label="Emirates Covered" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EMIRATES.map(em => (
              <label key={em} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.emirates.includes(em)}
                  onChange={() => toggleArr('emirates', em)}
                  className="w-4 h-4 accent-royal"
                />
                {em}
              </label>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="card p-6">
          <SectionTitle icon="🔧" label="Technical Expertise" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TECH_EXPERTISE.map(skill => (
              <label key={skill} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.expertise.includes(skill)}
                  onChange={() => toggleArr('expertise', skill)}
                  className="w-4 h-4 accent-royal"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="card p-6">
          <SectionTitle icon="💼" label="Experience & Type" />
          <div className="space-y-4">
            <div>
              <label className="form-label">Brands / Models Experience</label>
              <textarea
                className="form-input resize-y"
                rows={3}
                value={form.brands}
                onChange={e => set('brands', e.target.value)}
                placeholder="e.g. Laurel K-series, Glory, Kores DM-100, Ricoh copiers..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Years of Experience *</label>
                <select className="form-input" required value={form.experience} onChange={e => set('experience', e.target.value)}>
                  <option value="">Select...</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="form-label">Technician Type *</label>
                <select className="form-input" required value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="">Select...</option>
                  <option>Freelance</option>
                  <option>Company Technician</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Availability *</label>
              <select className="form-input" required value={form.availability} onChange={e => set('availability', e.target.value)}>
                <option value="">Select...</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>On Call</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="card p-6">
          <SectionTitle icon="📎" label="Documents" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-royal hover:bg-blue-50 transition">
              <div className="text-3xl mb-1">📄</div>
              <div className="text-sm font-medium text-navy">Upload CV</div>
              <p className="text-xs text-gray-400 mt-1">PDF or Word format</p>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-royal hover:bg-blue-50 transition">
              <div className="text-3xl mb-1">🏆</div>
              <div className="text-sm font-medium text-navy">Upload Certificate</div>
              <p className="text-xs text-gray-400 mt-1">Relevant certifications</p>
            </div>
          </div>
          <div>
            <label className="form-label">Additional Notes</label>
            <textarea className="form-input resize-y" rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any other information you'd like to share..." />
          </div>
        </div>

        <button type="submit" className="w-full bg-royal text-white font-semibold py-4 rounded-xl text-base font-poppins hover:bg-royal-dark transition">
          Submit Profile
        </button>
      </form>
    </div>
  )
}
