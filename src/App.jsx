import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Boot from './components/Boot.jsx'
import Background from './components/Background.jsx'
import Sidebar from './components/Sidebar.jsx'
import Toast from './components/Toast.jsx'

// Sections
import CharacterSection from './components/sections/CharacterSection.jsx'
import SkillTreeSection from './components/sections/SkillTreeSection.jsx'
import QuestLogSection from './components/sections/QuestLogSection.jsx'
import RealmsSection from './components/sections/RealmsSection.jsx'
import ContactSection from './components/sections/ContactSection.jsx'

const CORE_SECTIONS = ['character', 'skills', 'quests', 'realms', 'contact']

export default function App() {
  const [active, setActive] = useState('character')
  const [visited, setVisited] = useState(new Set(['character']))
  
  // Achievement Engine State
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [latestAchievement, setLatestAchievement] = useState(null)
  const [isShaking, setIsShaking] = useState(false)

  const handleUnlock = (id, title, subtitle) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev
      
      setLatestAchievement({ id, title, subtitle, timestamp: Date.now() })
      
      if (prev.length === 0) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)
          }, 100)
        })
      }
      return [...prev, id]
    })
  }

  const hasAchievements = unlockedAchievements.length > 0

  const handleNavigate = (id) => {
    setActive(id)
    setVisited((prev) => new Set(prev).add(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const visitedAllCore = CORE_SECTIONS.every((id) => visited.has(id))
    if (visitedAllCore) {
      handleUnlock('explorer', 'ACHIEVEMENT UNLOCKED', 'Explorer — visited every core section')
    }
  }, [visited, unlockedAchievements])

  useEffect(() => {
    const bootDelay = setTimeout(() => {
      const hour = new Date().getHours()
      if (hour >= 1 && hour <= 5) {
        // handleUnlock('night_owl', 'ACHIEVEMENT UNLOCKED', 'Night Owl — browsing the logs after hours')
      }
    }, 2500)

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0
    
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          handleUnlock('konami', 'ACHIEVEMENT UNLOCKED', 'Cheat Code Activated — thirty extra lives granted')
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(bootDelay)
    }
  }, [])

  return (
    <>
      <Boot />
      <Background />
      
      <div className={`shell ${isShaking ? 'shake-impact' : ''}`}>
        <Sidebar active={active} onNavigate={handleNavigate} hasAchievements={hasAchievements} />
        
        <main style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, rotateX: -12, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 10, y: -18, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'top center' }}
            >
              {active === 'character' && <CharacterSection />}
              {active === 'skills' && <SkillTreeSection />}
              {active === 'quests' && <QuestLogSection />}
              {active === 'realms' && <RealmsSection />}
              {active === 'contact' && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toast 
        trigger={latestAchievement?.timestamp} 
        title={latestAchievement?.title} 
        subtitle={latestAchievement?.subtitle} 
      />
    </>
  )
}