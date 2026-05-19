import { createContext, useContext, useState } from 'react'
import { MOCK_REQUESTS, MOCK_TECHNICIANS } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [technicians, setTechnicians] = useState(MOCK_TECHNICIANS)

  function addRequest(req) {
    const newReq = {
      ...req,
      id: `MSH-${String(requests.length + 1).padStart(4, '0')}`,
      status: 'New',
      assignedTech: null,
      notes: '',
      createdAt: new Date().toISOString(),
    }
    setRequests(prev => [newReq, ...prev])
    return newReq.id
  }

  function updateRequest(id, updates) {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)))
  }

  function addTechnician(tech) {
    const newTech = {
      ...tech,
      id: `TECH-${String(technicians.length + 1).padStart(3, '0')}`,
      status: 'Pending',
      joinedAt: new Date().toISOString().split('T')[0],
    }
    setTechnicians(prev => [newTech, ...prev])
  }

  function updateTechnician(id, updates) {
    setTechnicians(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  return (
    <AppContext.Provider value={{ requests, technicians, addRequest, updateRequest, addTechnician, updateTechnician }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
