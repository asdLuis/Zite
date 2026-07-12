import { motion } from 'motion/react';
import { achievements } from '../../data/profile.js';
import '../../styles/sections/AchievementsSection.css';

///************************************************************************///
/// Function: AchievementsSection
/// Description: Renders the trophy room section displaying a grid of achievements.
/// Parameters: { unlocked } - Array of IDs representing the unlocked achievements.
/// Returns: JSX.Element
///************************************************************************///
const AchievementsSection = ({ unlocked = [] }) => {
  return (
    <section className="achievements-section">
      <div className="achievements-eyebrow">06 / ACHIEVEMENTS</div>
      <h1 className="achievements-title">Trophy Room</h1>
      
      <div className="achievements-steam-grid">
        {achievements.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          
          return (
            <motion.div 
              key={ach.id}
              data-id={ach.id}
              className={`achievements-steam-card ${isUnlocked ? 'achievements-unlocked' : 'achievements-locked'}`}
              whileHover={{ scale: 1.01 }}
            >
              <h3>{ach.title}</h3>
              <p className="achievements-hover-desc">{ach.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;