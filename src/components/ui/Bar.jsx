import { useEffect, useState } from 'react';
import '../../styles/ui/Bar.css';

///************************************************************************///
/// Function: Bar
/// Description: Renders an animated progress bar with a label and percentage.
/// Parameters: 
///   { label, value, animate }
///   label - String representing the name of the stat/skill.
///   value - Number representing the percentage fill (0-100).
///   animate - Boolean triggering the fill animation.
/// Returns: JSX.Element
///************************************************************************///
const Bar = ({ label, value, animate }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const raf = requestAnimationFrame(() => setWidth(value));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate, value]);

  return (
    <div className="bar-row">
      <div className="bar-head">
        <b>{label}</b>
        <span>{value}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

export default Bar;