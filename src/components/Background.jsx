import { useEffect, useRef } from 'react'

export default function Background() {
  const spotlightRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame = null
    const handleMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const el = spotlightRef.current
        if (el) {
          const xPct = (e.clientX / window.innerWidth) * 100
          const yPct = (e.clientY / window.innerHeight) * 100
          el.style.setProperty('--mx', `${xPct}%`)
          el.style.setProperty('--my', `${yPct}%`)
        }
        frame = null
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="spotlight" ref={spotlightRef} aria-hidden="true"></div>
    </>
  )
}