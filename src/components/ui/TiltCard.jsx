import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

// Wraps any card in a mouse-tracked 3D tilt. Two modes:
//
//   <TiltCard className="statcard">...</TiltCard>
//     Plain tilt + a soft glare. Good for grid cards (stats, realms, etc).
//
//   <TiltCard holo className="portrait">...</TiltCard>
//     Adds an iridescent foil sheen + brighter specular glare + lift-on-
//     hover scale, à la the classic "Pokemon card" holographic effect.
//     Meant for one hero element (like a character portrait), not a grid
//     of many cards — it's a bigger visual statement.
//
// Either way this only adds behavior; pass the card's existing className
// through and its normal CSS (background, border, radius) still applies.
export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  holo = false,
  as = 'div',
  href,
}) {
  const ref = useRef(null)
  const [hovering, setHovering] = useState(false)
  const MotionTag = as === 'a' ? motion.a : motion.div
  const tilt = holo ? Math.max(maxTilt, 14) : maxTilt

  // 0–1 pointer position within the card, spring-smoothed so the tilt
  // settles instead of snapping directly to the cursor.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springCfg = holo
    ? { stiffness: 220, damping: 18, mass: 0.7 }
    : { stiffness: 280, damping: 24, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), springCfg)
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), springCfg)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)

  // Holo foil: a fixed rainbow gradient whose position slides as the
  // pointer moves, composited with color-dodge so it only shows as a
  // bright iridescent sheen rather than flatly tinting the card.
  const holoPos = useTransform([px, py], ([x, y]) => `${x * 200}% ${y * 200}%`)
  const holoAngle = useTransform(px, (v) => `${115 + (v - 0.5) * 70}deg`)

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMove(e) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleEnter() {
    setHovering(true)
  }

  function handleLeave() {
    setHovering(false)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <MotionTag
      ref={ref}
      href={as === 'a' ? href : undefined}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={holo && !prefersReduced ? { scale: hovering ? 1.035 : 1 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      {children}

      {/* Holo foil sheen — only while hovering, only in holo mode */}
      {holo && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: hovering ? 0.55 : 0,
            transition: 'opacity 300ms ease',
            mixBlendMode: 'color-dodge',
            backgroundSize: '300% 300%',
            backgroundPosition: holoPos,
            background: useTransform(holoAngle, (angle) => `linear-gradient(${angle},
              hsla(0,100%,70%,0.5) 0%,
              hsla(55,100%,70%,0.5) 20%,
              hsla(120,100%,70%,0.5) 40%,
              hsla(190,100%,70%,0.5) 60%,
              hsla(260,100%,70%,0.5) 80%,
              hsla(330,100%,70%,0.5) 100%)`),
          }}
        />
      )}

      {/* Glare — soft for plain cards, brighter/tighter for holo mode */}
      {glare && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            mixBlendMode: holo ? 'overlay' : 'normal',
            background: useTransform([glareX, glareY], ([x, y]) =>
              holo
                ? `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.65), transparent 45%)`
                : `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.10), transparent 55%)`
            ),
          }}
        />
      )}
    </MotionTag>
  )
}