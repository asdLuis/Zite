import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navItems } from './data/profile.js'
import Boot from './components/Boot.jsx'
import Background from './components/Background.jsx'
import Sidebar from './components/Sidebar.jsx'
import Toast from './components/Toast.jsx'
import CharacterSection from './components/sections/CharacterSection.jsx'
import SkillTreeSection from './components/sections/SkillTreeSection.jsx'
import QuestLogSection from './components/sections/QuestLogSection.jsx'
import RealmsSection from './components/sections/RealmsSection.jsx'
import ContactSection from './components/sections/ContactSection.jsx'

const SECTION_IDS = navItems.map((n) => n.id)

export default function App() {
  const [active, setActive] = useState('character')
  const [visited, setVisited] = useState(new Set(['character']))
  const [explorerFired, setExplorerFired] = useState(false)

  const handleNavigate = (id) => {
    setActive(id)
    setVisited((prev) => new Set(prev).add(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fire the "Explorer" achievement once every section has been visited.
  // Toast.jsx handles its own enter/hold/exit timing from here on.
  useEffect(() => {
    if (!explorerFired && SECTION_IDS.every((id) => visited.has(id))) {
      setExplorerFired(true)
    }
  }, [visited, explorerFired])

  return (
    <>
      <Boot />
      <Background />
      <div className="shell">
        <Sidebar active={active} onNavigate={handleNavigate} />
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
              {active === 'stats' && <StatsSection active={active === 'stats'} />}
              {active === 'skills' && <SkillTreeSection />}
              {active === 'quests' && <QuestLogSection />}
              {active === 'achievements' && <AchievementsSection />}
              {active === 'realms' && <RealmsSection />}
              {active === 'about' && <AboutSection />}
              {active === 'contact' && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toast trigger={explorerFired} title="ACHIEVEMENT UNLOCKED" subtitle="Explorer — visited every section" />
    </>
  )
}