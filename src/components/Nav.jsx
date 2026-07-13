import { motion, AnimatePresence } from 'motion/react';
import { navItems } from '../data/profile.js';
import '../styles/Nav.css';

///************************************************************************///
/// Function: Nav
/// Description: Renders the navigation menu, filtering items based on unlocks.
/// Parameters: 
///   { active, onNavigate, hasAchievements }
///   active - String representing the currently active section ID.
///   onNavigate - Function to handle navigation clicks.
///   hasAchievements - Boolean indicating if the achievements tab should be visible.
/// Returns: JSX.Element
///************************************************************************///
const Nav = ({ active, onNavigate, hasAchievements = false }) => {
  const visibleItems = navItems.filter(item => 
    !item.requiresUnlock || (item.requiresUnlock && hasAchievements)
  );

  return (
    <motion.ul className="nav-list" layout>
      <AnimatePresence>
        {visibleItems.map((item) => (
          <motion.li 
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{ overflow: 'hidden' }}
          >
            <button
              className={`nav-button ${active === item.id ? 'nav-active' : ''} ${item.id === 'achievements' ? 'nav-achievements' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-idx">{item.index}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
</motion.ul>
  );
};

export default Nav;