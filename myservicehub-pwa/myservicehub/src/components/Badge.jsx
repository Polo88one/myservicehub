const STATUS_STYLES = {
  New: 'bg-blue-50 text-blue-700',
  Reviewing: 'bg-purple-50 text-purple-700',
  Assigned: 'bg-green-50 text-green-700',
  'In Progress': 'bg-amber-50 text-amber-800',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-700',
  Approved: 'bg-green-50 text-green-700',
  Pending: 'bg-amber-50 text-amber-800',
}

const URGENCY_STYLES = {
  Normal: 'bg-gray-100 text-gray-700',
  Urgent: 'bg-red-50 text-red-700',
  Emergency: 'bg-red-800 text-white',
}

export function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

export function UrgencyBadge({ urgency }) {
  return (
    <span className={`badge ${URGENCY_STYLES[urgency] || 'bg-gray-100 text-gray-600'}`}>
      {urgency}
    </span>
  )
}
