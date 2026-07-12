import { useEffect, useState } from 'react';
import '../styles/Toast.css';

const ENTER_MS = 500;
const EXIT_MS = 380;

///************************************************************************///
/// Function: Toast
/// Description: Renders a timed, transient notification pop-up.
/// Parameters: 
///   { trigger, title, subtitle, holdMs }
///   trigger - Any value that, when changed, triggers the toast to show.
///   title - String representing the main toast heading.
///   subtitle - String for additional toast details.
///   holdMs - Number representing how long the toast stays visible in milliseconds.
/// Returns: JSX.Element | null
///************************************************************************///
const Toast = ({ trigger, title, subtitle, holdMs = 3400 }) => {
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!trigger) return;

    setPhase('mounted');
    const raf = requestAnimationFrame(() => setPhase('enter'));

    const holdTimer = setTimeout(() => {
      setPhase('leave');
    }, ENTER_MS + holdMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, [trigger, holdMs]);

  useEffect(() => {
    if (phase !== 'leave') return;
    const timer = setTimeout(() => setPhase('idle'), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'idle') return null;

  return (
    <div className={`toast-wrapper toast-${phase}`} role="status" aria-live="polite">
      <div>
        <div className="toast-title">{title}</div>
        <div className="toast-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

export default Toast;