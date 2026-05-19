import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    // Dismissed before? Don't show again this session
    if (sessionStorage.getItem('pwa-dismissed')) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show banner after 3 seconds
      setTimeout(() => setShowBanner(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setShowBanner(false)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
    }
    setShowBanner(false)
    setDeferredPrompt(null)
  }

  function handleDismiss() {
    setShowBanner(false)
    sessionStorage.setItem('pwa-dismissed', '1')
  }

  if (!showBanner || installed) return null

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80">
      <div className="bg-navy text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-white/10">
        {/* Icon */}
        <div className="w-12 h-12 bg-royal rounded-xl flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
            <path d="M9 12l1.5 1.5L14 9" stroke="#10B981" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm font-poppins">Install MyServiceHub</div>
          <div className="text-xs text-slate-400 mt-0.5">Add to home screen for quick access</div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="bg-royal text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-royal-dark transition"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="text-slate-400 text-xs px-3 py-1 hover:text-white transition"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}
