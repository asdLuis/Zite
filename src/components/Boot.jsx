import { useEffect, useState } from 'react'

export default function Boot() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="boot">
      <div className="line">&gt; INITIALIZING PROFILE...</div>
      <div className="line">&gt; LOADING CONFIGURATION...</div>
      <div className="line">&gt; LOADING ENGINEER.DATA...</div>
      <div className="bar"><span></span></div>
    </div>
  )
}
