import { motion } from 'motion/react';
import { identity } from '../data/profile.js';
import Nav from './Nav.jsx';
import '../styles/Sidebar.css';

///************************************************************************///
/// Function: Sidebar
/// Description: Renders the application's side navigation, brand, and footer.
/// Parameters: 
///   { active, onNavigate, hasAchievements, bootPhase }
///   active - String for the currently active section ID.
///   onNavigate - Function handling navigation clicks.
///   hasAchievements - Boolean indicating if the achievements tab should be visible.
///   bootPhase - String representing the current boot animation state.
/// Returns: JSX.Element
///************************************************************************///
const Sidebar = ({ active, onNavigate, hasAchievements, bootPhase }) => {
  const isVisible = bootPhase === 'zooming' || bootPhase === 'done';

  return (
    <motion.aside 
      className="sidebar-container"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
    >
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">{identity.brandName.charAt(0)}</span>
        <span className="sidebar-brand-full">
          {identity.brandName}
          <span>{identity.brandSuffix}</span>
        </span>
      </div>

      <Nav active={active} onNavigate={onNavigate} hasAchievements={hasAchievements} />

      <div className="sidebar-footer-note">
        <span className="sidebar-dot">●</span> {identity.status}
        <br />
        {identity.location}
      </div>
    </motion.aside>
  );
};

export default Sidebar;