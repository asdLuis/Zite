import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export default function FlipCard({
  front,
  back,
  className = '',
  backClassName,
  maxTilt = 12,
  holoBorder = 2,
}) {
  const ref = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [flipped, setFlipped] = useState(false)

  // Cursor position (0–1) drives both the tilt and where the holo ring
  // catches the light.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springCfg = { stiffness: 240, damping: 20, mass: 0.6 }
  const tiltX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springCfg)
  const tiltY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springCfg)

  // Click-flip lives on its own spring, on the same Y axis as the tilt —
  // added together so the card can be mid-tilt and mid-flip at once.
  const flipTarget = useMotionValue(0)
  const flipY = useSpring(flipTarget, { stiffness: 220, damping: 26 })
  const rotateY = useTransform([flipY, tiltY], ([f, t]) => f + t)

  const holoPos = useTransform([px, py], ([x, y]) => `${x * 200}% ${y * 200}%`)
  const holoBackground = useTransform(holoPos, () => `linear-gradient(115deg,
    hsla(0,100%,68%,1) 0%,
    hsla(55,100%,68%,1) 20%,
    hsla(120,100%,62%,1) 40%,
    hsla(190,100%,62%,1) 60%,
    hsla(260,100%,68%,1) 80%,
    hsla(330,100%,68%,1) 100%)`)
  const glareBackground = useTransform([px, py], ([x, y]) =>
    `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12), transparent 55%)`
  )

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMove(e) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    setHovering(false)
    px.set(0.5)
    py.set(0.5)
  }

  function toggleFlip() {
    const next = !flipped
    setFlipped(next)
    flipTarget.set(next ? 180 : 0)
  }

  const face = (content, isBack) => (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        transform: isBack ? 'rotateY(180deg)' : undefined,
        pointerEvents: flipped === isBack ? 'auto' : 'none',
      }}
    >
      <div
        className={isBack ? backClassName || className : className}
        style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
      >
        {content}

        {/* Glare — real-time cursor-follow highlight */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: glareBackground,
            }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Holo ring — CSS mask leaves only a thin border visible, so the
            card face underneath is completely untouched by the effect. */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              border: `${holoBorder}px solid transparent`,
              backgroundImage: holoBackground,
              backgroundOrigin: 'border-box',
              backgroundClip: 'border-box',
              backgroundSize: '300% 300%',
              backgroundPosition: holoPos,
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </div>
    </div>
  )

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label="Flip card"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        onClick={toggleFlip}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip()}
        style={{
          position: 'relative',
          height: '100%',
          minHeight: 260,
          cursor: 'pointer',
          rotateX: prefersReduced ? 0 : tiltX,
          rotateY: prefersReduced ? (flipped ? 180 : 0) : rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200,
        }}
      >
        {face(front, false)}
        {face(back, true)}
      </motion.div>
    </div>
  )
}