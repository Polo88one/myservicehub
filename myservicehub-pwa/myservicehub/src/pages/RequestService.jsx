import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../lib/AppContext'
import { EQUIPMENT_TYPES, EMIRATES, CUSTOMER_TYPES, PROBLEM_TYPES } from '../data/mockData'

const URGENCY_OPTIONS = [
  { label: '✅ Normal', value: 'Normal', activeClass: 'border-green-500 text-green-700 bg-green-50' },
  { label: '⚡ Urgent', value: 'Urgent', activeClass: 'border-amber-500 text-amber-800 bg-amber-50' },
  { label: '🚨 Emergency', value: 'Emergency', activeClass: 'border-red-500 text-red-700 bg-red-50' },
]

function SectionTitle({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-royal uppercase tracking-widest mb-4">
      <span>{icon}</span> {label}
    </div>
  )
}

export default function RequestService() {
  const { addRequest } = useApp()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [reqId, setReqId] = useState('')
  const [form, setForm] = useState({
    customerName: '', company: '', mobile: '', email: '',
    customerType: '', category: '', equipment: '',
    brand: '', model: '', serial: '',
    problem: '', description: '',
    address: '', emirate: '',
    officeTiming: '', preferredDate: '', preferredTime: '',
    urgency: 'Normal',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    const id = addRequest(form)
    setReqId(id)
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-navy mb-3">Request Received Successfully!</h2>
        <p className="text-gray-600 mb-2">Your request <strong>{reqId}</strong> has been submitted.</p>
        <p className="text-gray-500 text-sm mb-8">
          MyServiceHub will review and assign a trusted technician shortly. You will be contacted on the mobile number provided.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ customerName:'',company:'',mobile:'',email:'',customerType:'',category:'',equipment:'',brand:'',model:'',serial:'',problem:'',description:'',address:'',emirate:'',officeTiming:'',preferredDate:'',preferredTime:'',urgency:'Normal' }) }}
          className="btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">Request Equipment Service</h1>
      <p className="text-gray-500 text-sm mb-8">Fill in the details below and we'll assign a trusted technician for you</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer Info */}
        <div className="card p-6">
          <SectionTitle icon="👤" label="Customer Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input className="form-input" required value={form.customerName} onChange={e => set('customerName', e.target.value)} placeholder="Ahmed Al Mansoori" />
            </div>
            <div>
              <label className="form-label">Company Name</label>
              <input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="ABC Exchange House" />
            </div>
            <div>
              <label className="form-label">Mobile Number *</label>
              <input className="form-input" required type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+971 50 XXX XXXX" />
            </div>
            <div>
              <label className="form-label">Email Address (Optional)</label>
              <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="ahmed@company.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Customer Type *</label>
              <select className="form-input" required value={form.customerType} onChange={e => set('customerType', e.target.value)}>
                <option value="">Select customer type...</option>
                {CUSTOMER_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="card p-6">
          <SectionTitle icon="🔧" label="Equipment Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Equipment Category *</label>
              <select className="form-input" required value={form.category} onChange={e => { set('category', e.target.value); set('equipment', '') }}>
                <option value="">Select category...</option>
                {Object.keys(EQUIPMENT_TYPES).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Equipment Type *</label>
              <select className="form-input" required value={form.equipment} onChange={e => set('equipment', e.target.value)} disabled={!form.category}>
                <option value="">{form.category ? 'Select type...' : 'Select category first...'}</option>
                {(EQUIPMENT_TYPES[form.category] || []).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Brand Name</label>
              <input className="form-input" value={form.brand} onChange={e => set('brand', e.target.value)} placeholder="e.g. Laurel, Glory, Kores" />
            </div>
            <div>
              <label className="form-label">Model Number</label>
              <input className="form-input" value={form.model} onChange={e => set('model', e.target.value)} placeholder="e.g. HT-3200" />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Serial Number</label>
              <input className="form-input" value={form.serial} onChange={e => set('serial', e.target.value)} placeholder="Machine serial number" />
            </div>
          </div>
        </div>

        {/* Problem Details */}
        <div className="card p-6">
          <SectionTitle icon="⚠️" label="Problem Details" />
          <div className="space-y-4">
            <div>
              <label className="form-label">Problem Type *</label>
              <select className="form-input" required value={form.problem} onChange={e => set('problem', e.target.value)}>
                <option value="">Select problem type...</option>
                {PROBLEM_TYPES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Problem Description *</label>
              <textarea className="form-input resize-y" rows={4} required value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the issue in detail..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-royal hover:bg-blue-50 transition">
                <div className="text-3xl mb-1">📷</div>
                <div className="text-sm font-medium text-navy">Upload Photo</div>
                <p className="text-xs text-gray-400 mt-1">Click to attach image</p>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-royal hover:bg-blue-50 transition">
                <div className="text-3xl mb-1">🎥</div>
                <div className="text-sm font-medium text-navy">Upload Video</div>
                <p className="text-xs text-gray-400 mt-1">Click to attach clip</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Timing */}
        <div className="card p-6">
          <SectionTitle icon="📍" label="Location & Timing" />
          <div className="space-y-4">
            <div>
              <label className="form-label">Full Address *</label>
              <input className="form-input" required value={form.address} onChange={e => set('address', e.target.value)} placeholder="Building, Street, Area" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Emirate *</label>
                <select className="form-input" required value={form.emirate} onChange={e => set('emirate', e.target.value)}>
                  <option value="">Select emirate...</option>
                  {EMIRATES.map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Office Timing</label>
                <input className="form-input" value={form.officeTiming} onChange={e => set('officeTiming', e.target.value)} placeholder="e.g. 9am – 6pm, Sun–Thu" />
              </div>
              <div>
                <label className="form-label">Preferred Visit Date</label>
                <input className="form-input" type="date" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Preferred Visit Time</label>
                <input className="form-input" type="time" value={form.preferredTime} onChange={e => set('preferredTime', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="form-label">Urgency Level *</label>
              <div className="flex gap-3 mt-1">
                {URGENCY_OPTIONS.map(({ label, value, activeClass }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set('urgency', value)}
                    className={`flex-1 border-2 rounded-lg py-2.5 text-sm font-medium transition ${
                      form.urgency === value ? activeClass : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-200">
              <p className="text-sm text-gray-400">📍 Google Maps location picker — integrate via Maps JavaScript API</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-royal text-white font-semibold py-4 rounded-xl text-base font-poppins hover:bg-royal-dark transition">
          Submit Service Request
        </button>
      </form>
    </div>
  )
}
