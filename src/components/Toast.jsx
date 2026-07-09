import { useEffect, useState } from 'react'

const ENTER_MS = 500
const EXIT_MS = 380

export default function Toast({ trigger, title, subtitle, holdMs = 3400 }) {
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (!trigger) return

    setPhase('mounted')
    const raf = requestAnimationFrame(() => setPhase('enter'))

    const holdTimer = setTimeout(() => {
      setPhase('leave')
    }, ENTER_MS + holdMs)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(holdTimer)
    }
  }, [trigger, holdMs])

  useEffect(() => {
    if (phase !== 'leave') return
    const timer = setTimeout(() => setPhase('idle'), EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'idle') return null

  return (
    <div className={`toast toast-${phase}`} role="status" aria-live="polite">
      <div>
        <div className="ttitle">{title}</div>
        <div className="tsub">{subtitle}</div>
      </div>
    </div>
  )
}