import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import '../../styles/ui/TiltCard.css';

///************************************************************************///
/// Function: TiltCard
/// Description: Wraps content in a mouse-tracked 3D tilt effect with optional glare and holo sheen.
/// Parameters: 
///   { children, className, maxTilt, glare, holo, as, href }
///   children - React nodes to render inside the card.
///   className - String for additional CSS classes.
///   maxTilt - Number defining the maximum rotation angle on hover.
///   glare - Boolean to toggle the cursor-following glare overlay.
///   holo - Boolean to toggle the holographic foil effect and lift scale.
///   as - String ('div' or 'a') defining the root HTML element.
///   href - String for the link URL (used if as === 'a').
/// Returns: JSX.Element
///************************************************************************///
const TiltCard = ({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  holo = false,
  as = 'div',
  href,
}) => {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const MotionTag = as === 'a' ? motion.a : motion.div;
  const tilt = holo ? Math.max(maxTilt, 14) : maxTilt;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = holo
    ? { stiffness: 220, damping: 18, mass: 0.7 }
    : { stiffness: 280, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), springCfg);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);

  const holoPos = useTransform([px, py], ([x, y]) => `${x * 200}% ${y * 200}%`);
  const holoAngle = useTransform(px, (v) => `${115 + (v - 0.5) * 70}deg`);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => {
    setHovering(true);
  };

  const handleLeave = () => {
    setHovering(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <MotionTag
      ref={ref}
      href={as === 'a' ? href : undefined}
      className={`tilt-card-wrapper ${className}`}
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
      }}
    >
      {children}

      {holo && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="tilt-card-holo"
          animate={{ opacity: hovering ? 0.55 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
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

      {glare && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          className={`tilt-card-glare ${holo ? 'tilt-card-glare-holo' : 'tilt-card-glare-plain'}`}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: useTransform([glareX, glareY], ([x, y]) =>
              holo
                ? `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.65), transparent 45%)`
                : `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.10), transparent 55%)`
            ),
          }}
        />
      )}
    </MotionTag>
  );
};

export default TiltCard;