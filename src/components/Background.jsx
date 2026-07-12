import { useEffect, useRef } from 'react';
import '../styles/Background.css';

///************************************************************************///
/// Function: Background
/// Description: Renders ambient background effects including an animated aurora and a cursor-following spotlight.
/// Parameters: None
/// Returns: JSX.Element
///************************************************************************///
const Background = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frame = null;

    ///************************************************************************///
    /// Function: handleMove
    /// Description: Updates CSS variables on the spotlight element based on cursor position.
    /// Parameters: e - MouseEvent
    /// Returns: void
    ///************************************************************************///
    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const el = spotlightRef.current;
        if (el) {
          const xPct = (e.clientX / window.innerWidth) * 100;
          const yPct = (e.clientY / window.innerHeight) * 100;
          el.style.setProperty('--mx', `${xPct}%`);
          el.style.setProperty('--my', `${yPct}%`);
        }
        frame = null;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="background-aurora" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="background-spotlight" ref={spotlightRef} aria-hidden="true"></div>
    </>
  );
};

export default Background;