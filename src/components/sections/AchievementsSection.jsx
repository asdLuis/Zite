import { motion } from 'motion/react'
import { achievements } from '../../data/profile.js'

export default function AchievementsSection({ unlocked = [] }) {
  return (
    <section className="section">
      <div className="eyebrow">06 / ACHIEVEMENTS</div>
      <h1 className="title">Trophy Room</h1>
      
      <div className="steam-grid">
        {achievements.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <motion.div 
              key={ach.id}
              data-id={ach.id}
              className={`steam-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              whileHover={{ scale: 1.01 }}
            >
              <h3>{ach.title}</h3>
              <p className="hover-desc">{ach.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}