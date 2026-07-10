import { useEffect, useState } from 'react'
import { animate } from 'motion/react'

export default function AnimatedStat({ value }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const match = String(value).match(/^([^0-9]*)([0-9,]+)(.*)$/)

    if (!match) {
      setDisplayValue(value)
      return
    }

    const prefix = match[1]
    const numStr = match[2].replace(/,/g, '')
    const suffix = match[3]
    const target = parseInt(numStr, 10)

    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (val) => {
        setDisplayValue(`${prefix}${Math.floor(val).toLocaleString()}${suffix}`)
      }
    })

    return () => controls.stop()
  }, [value])

  return <>{displayValue}</>
}