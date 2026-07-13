import { useEffect, useState } from 'react';
import '..//styles/Boot.css';

///************************************************************************///
/// Function: Boot
/// Description: Renders the boot sequence overlay with a typing effect and zoom animation.
/// Parameters: 
///   { phase, setPhase }
///   phase - String representing the current boot animation phase.
///   setPhase - Function to update the boot phase state.
/// Returns: JSX.Element | null
///************************************************************************///
const Boot = ({ phase, setPhase }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (phase !== 'typing') return;

    let currentText = "";
    let charIndex = 0;
    const fullString = "> INITIALIZING SYSTEM...\n> ESTABLISHING CONNECTION...\n> ACCESS GRANTED.";

    ///************************************************************************///
    /// Function: typeChar
    /// Description: Recursively appends characters to the text state to simulate typing.
    /// Parameters: None
    /// Returns: void
    ///************************************************************************///
    const typeChar = () => {
      if (charIndex < fullString.length) {
        currentText += fullString[charIndex];
        setText(currentText);
        charIndex++;

        const charSpeed = 20;
        const lineBreakPause = 0;
        const delay = fullString[charIndex - 1] === '\n' ? lineBreakPause : charSpeed;
        setTimeout(typeChar, delay);
      } else {
        setTimeout(() => setPhase('reveal'), 400);
      }
    };

    const initialDelay = setTimeout(typeChar, 600);
    return () => clearTimeout(initialDelay);
  }, [phase, setPhase]);

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => setPhase('zooming'), 300);
      return () => clearTimeout(t);
    }
    if (phase === 'zooming') {
      const t = setTimeout(() => setPhase('done'), 0);
      return () => clearTimeout(t);
    }
  }, [phase, setPhase]);

  if (phase === 'done') return null;

  return (
    <div className={`boot-overlay boot-${phase}`}>
      <div className="boot-bezel">
        <div className="boot-hole">
          <div className="boot-glare" />
          <div className="boot-cli">
            <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
            {phase === 'typing' && <span className="boot-caret"></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boot;