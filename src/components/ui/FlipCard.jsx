import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import '../../styles/ui/FlipCard.css';

///************************************************************************///
/// Function: FlipCard
/// Description: Renders an interactive 3D flip card with holographic and glare effects.
/// Parameters: 
///   { front, back, className, backClassName, maxTilt, holoBorder }
///   front - JSX element for the front face.
///   back - JSX element for the back face.
///   className - String for the front face CSS class.
///   backClassName - String for the back face CSS class (falls back to className).
///   maxTilt - Number defining the maximum rotation angle on hover.
///   holoBorder - Number defining the thickness of the holographic edge.
/// Returns: JSX.Element
///************************************************************************///
const FlipCard = ({
  front,
  back,
  className = '',
  backClassName,
  maxTilt = 12,
  holoBorder = 2,
}) => {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 240, damping: 20, mass: 0.6 };
  const tiltX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springCfg);
  const tiltY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springCfg);

  const flipTarget = useMotionValue(0);
  const flipY = useSpring(flipTarget, { stiffness: 220, damping: 26 });
  const rotateY = useTransform([flipY, tiltY], ([f, t]) => f + t);

  const holoPos = useTransform([px, py], ([x, y]) => `${x * 200}% ${y * 200}%`);
  const holoBackground = useTransform(holoPos, () => `linear-gradient(115deg,
    hsla(0,100%,68%,1) 0%,
    hsla(55,100%,68%,1) 20%,
    hsla(120,100%,62%,1) 40%,
    hsla(190,100%,62%,1) 60%,
    hsla(260,100%,68%,1) 80%,
    hsla(330,100%,68%,1) 100%)`);
  
  const glareBackground = useTransform([px, py], ([x, y]) =>
    `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12), transparent 55%)`
  );

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ///************************************************************************///
  /// Function: handleMove
  /// Description: Updates motion values based on cursor position for tilt/glare.
  /// Parameters: e - MouseEvent
  /// Returns: void
  ///************************************************************************///
  const handleMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  ///************************************************************************///
  /// Function: handleLeave
  /// Description: Resets hover state and motion values when cursor leaves card.
  /// Parameters: None
  /// Returns: void
  ///************************************************************************///
  const handleLeave = () => {
    setHovering(false);
    px.set(0.5);
    py.set(0.5);
  };

  ///************************************************************************///
  /// Function: toggleFlip
  /// Description: Triggers the flip animation and updates state.
  /// Parameters: None
  /// Returns: void
  ///************************************************************************///
  const toggleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    flipTarget.set(next ? 180 : 0);
  };

  ///************************************************************************///
  /// Function: face
  /// Description: Constructs a single face (front or back) with applied effects.
  /// Parameters: 
  ///   content - JSX.Element to render.
  ///   isBack - Boolean flag indicating if this is the back face.
  /// Returns: JSX.Element
  ///************************************************************************///
  const face = (content, isBack) => (
    <div
      className="flip-card-face"
      style={{
        transform: isBack ? 'rotateY(180deg)' : undefined,
        pointerEvents: flipped === isBack ? 'auto' : 'none',
      }}
    >
      <div className={`flip-card-face-inner ${isBack ? backClassName || className : className}`}>
        {content}

        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="flip-card-glare"
            style={{ background: glareBackground }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="flip-card-holo"
            style={{
              border: `${holoBorder}px solid transparent`,
              backgroundImage: holoBackground,
              backgroundPosition: holoPos,
            }}
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label="Flip card"
        className="flip-card-wrapper"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        onClick={toggleFlip}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip()}
        style={{
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
  );
};

export default FlipCard;