import { useEffect, useState } from 'react'

export default function Boot({ phase, setPhase }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (phase !== 'typing') return

    let currentText = ""
    let charIndex = 0
    const fullString = "> INITIALIZING SYSTEM...\n> ESTABLISHING CONNECTION...\n> ACCESS GRANTED."

    const typeChar = () => {
      if (charIndex < fullString.length) {
        currentText += fullString[charIndex]
        setText(currentText)
        charIndex++

        const charSpeed = 25     
        const lineBreakPause = 400 
        const delay = fullString[charIndex - 1] === '\n' ? lineBreakPause : charSpeed
        setTimeout(typeChar, delay)
      } else {
        setTimeout(() => setPhase('reveal'), 800)
      }
    }

    const initialDelay = setTimeout(typeChar, 600)
    return () => clearTimeout(initialDelay)
  }, [phase, setPhase])

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(() => setPhase('zooming'), 1000)
      return () => clearTimeout(t)
    }
    if (phase === 'zooming') {
      const t = setTimeout(() => setPhase('done'), 1200)
      return () => clearTimeout(t)
    }
  }, [phase, setPhase])

  if (phase === 'done') return null

  return (
    <div className={`boot-overlay ${phase}`}>
      {/* The physical monitor frame */}
      <div className="boot-bezel">
        {/* The inner screen matching your website scale exactly */}
        <div className="boot-hole">
          <div className="boot-glare" />
          <div className="boot-cli">
            <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
            {phase === 'typing' && <span className="caret"></span>}
          </div>
        </div>
      </div>
    </div>
  )
}