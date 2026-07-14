import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { achievements } from './data/profile.js'
import Boot from './components/Boot.jsx'
import Background from './components/Background.jsx'
import Sidebar from './components/Sidebar.jsx'
import Toast from './components/Toast.jsx'

import CharacterSection from './components/sections/CharacterSection.jsx';
import SkillTreeSection from './components/sections/SkillTreeSection.jsx';
import QuestLogSection from './components/sections/QuestLogSection.jsx';
import RealmsSection from './components/sections/RealmsSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';
import AchievementsSection from './components/sections/AchievementsSection.jsx';

import './styles/App.css';

const CORE_SECTIONS = ['character', 'skills', 'quests', 'realms', 'contact'];

///************************************************************************///
/// Function: App
/// Description: Root layout component managing state, routing, and global achievements.
/// Parameters: None
/// Returns: JSX.Element
///************************************************************************///
export default function App() {
  const [active, setActive] = useState('character');
  const [visited, setVisited] = useState(new Set(['character']));
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [latestAchievement, setLatestAchievement] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  
  const [bootPhase, setBootPhase] = useState('typing');

  ///************************************************************************///
  /// Function: handleUnlock
  /// Description: Handles unlocking achievements and checking for completionist status.
  /// Parameters: 
  ///   id - String representing the achievement ID.
  ///   title - String for the achievement toast title.
  ///   subtitle - String for the achievement toast subtitle.
  /// Returns: void
  ///************************************************************************///
  const handleUnlock = (id, title, subtitle) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      setLatestAchievement({ id, title, subtitle, timestamp: Date.now() });

      const allExceptSecret = achievements.filter((a) => a.id !== 'secret_master');
      if (updated.length === allExceptSecret.length && !updated.includes('secret_master')) {
        setTimeout(() => handleUnlock('secret_master', 'ACHIEVEMENT UNLOCKED', '??? — You have done it all.'), 1000);
      }

      if (prev.length === 0) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
      return updated;
    });
  };

  ///************************************************************************///
  /// Function: handleNavigate
  /// Description: Updates the active section and tracks visited sections.
  /// Parameters: id - String representing the section ID.
  /// Returns: void
  ///************************************************************************///
  const handleNavigate = (id) => {
    setActive(id);
    setVisited((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    const visitedAllCore = CORE_SECTIONS.every((id) => visited.has(id));
    if (visitedAllCore) handleUnlock('explorer', 'ACHIEVEMENT UNLOCKED', 'Cartographer — Visited every core section');
  }, [visited]);

  useEffect(() => {
    if (bootPhase !== 'done') return;

    const bootDelay = setTimeout(() => {
      const hour = new Date().getHours();
      if (hour >= 1 && hour <= 5) handleUnlock('night_owl', 'ACHIEVEMENT UNLOCKED', 'Night Owl — Browsing after hours');
    }, 1500); 

    const devToolsDetector = () => {
          if (window.innerWidth <= 768) return;
          if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
            handleUnlock('dev_mode', 'ACHIEVEMENT UNLOCKED', 'Dev Mode — Investigating the source');
          }
        };
        window.addEventListener('resize', devToolsDetector);

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          handleUnlock('konami', 'ACHIEVEMENT UNLOCKED', 'Cheat Code — Activated hidden protocol');
          konamiIndex = 0;
        }
      } else konamiIndex = 0;
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', devToolsDetector);
      clearTimeout(bootDelay);
    };
  }, [bootPhase]); 

  return (
    <>
      {bootPhase !== 'typing' && <Background />}
      {bootPhase !== 'done' && <Boot phase={bootPhase} setPhase={setBootPhase} />}
      
      <div className={`app-env ${bootPhase}`}>
        <div className={`shell ${isShaking ? 'shake-impact' : ''}`}>
          <Sidebar active={active} onNavigate={handleNavigate} hasAchievements={unlockedAchievements.length > 0} bootPhase={bootPhase} />
          
          <main>
            <AnimatePresence mode="wait">
              <motion.div key={active} style={{ width: '100%' }}>
                {active === 'character' && <CharacterSection handleUnlock={handleUnlock} />}
                {active === 'skills' && <SkillTreeSection handleUnlock={handleUnlock} />}
                {active === 'quests' && <QuestLogSection handleUnlock={handleUnlock} />}
                {active === 'realms' && <RealmsSection />}
                {active === 'contact' && <ContactSection />}
                {active === 'achievements' && <AchievementsSection unlocked={unlockedAchievements} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      
      <Toast trigger={latestAchievement?.timestamp} title={latestAchievement?.title} subtitle={latestAchievement?.subtitle} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}