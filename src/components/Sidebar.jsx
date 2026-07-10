import { identity } from '../data/profile.js'
import Nav from './Nav.jsx'
import { motion } from 'motion/react'

export default function Sidebar({ active, onNavigate, hasAchievements, bootPhase }) {
  // Determine if the boot sequence has reached the point where the UI should appear
  const isVisible = bootPhase === 'zooming' || bootPhase === 'done'

  return (
    <motion.aside 
      className="sidebar"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
    >
      <div className="brand">
        <span className="brand-mark">{identity.brandName.charAt(0)}</span>
        <span className="brand-full">
          {identity.brandName}
          <span>{identity.brandSuffix}</span>
        </span>
      </div>

      <Nav active={active} onNavigate={onNavigate} hasAchievements={hasAchievements} />

      <div className="footer-note">
        <span className="dot">●</span> {identity.status}
        <br />
        {identity.location}
      </div>
    </motion.aside>
  )
}