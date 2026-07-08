import { useEffect, useRef, useState } from 'react'

export default function Bar({ label, value, animate }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (animate) {
      const raf = requestAnimationFrame(() => setWidth(value))
      return () => cancelAnimationFrame(raf)
    }
  }, [animate, value])

  return (
    <div className="barrow">
      <div className="head">
        <b>{label}</b>
        <span>{value}%</span>
      </div>
      <div className="bartrack">
        <div className="barfill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
