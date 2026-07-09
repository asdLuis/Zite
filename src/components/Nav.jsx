import { navItems } from '../data/profile.js'
import { motion, AnimatePresence } from 'motion/react'

export default function Nav({ active, onNavigate, hasAchievements = false }) {
  // Logic: Only show the Achievements tab if it's unlocked
  const visibleItems = navItems.filter(item => 
    !item.requiresUnlock || (item.requiresUnlock && hasAchievements)
  )

  return (
    <ul className="navlist">
      <AnimatePresence>
        {visibleItems.map((item) => (
          <motion.li 
            key={item.id}
            initial={{ opacity: 0, height: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{ overflow: 'hidden' }}
          >
            <button
              className={active === item.id ? 'active' : ''}
              onClick={() => onNavigate(item.id)}
            >
              <span className="idx">{item.index}</span>
              <span className="side-label">{item.label}</span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}