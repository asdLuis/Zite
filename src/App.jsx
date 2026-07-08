import { useEffect, useState } from 'react'
import { navItems } from './data/profile.js'
import Boot from './components/Boot.jsx'
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
  const [showToast, setShowToast] = useState(false)
  const [explorerFired, setExplorerFired] = useState(false)

  const handleNavigate = (id) => {
    setActive(id)
    setVisited((prev) => new Set(prev).add(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!explorerFired && SECTION_IDS.every((id) => visited.has(id))) {
      setExplorerFired(true)
      setShowToast(true)
      const timer = setTimeout(() => setShowToast(false), 4200)
      return () => clearTimeout(timer)
    }
  }, [visited, explorerFired])

  return (
    <>
      <Boot />
      <div className="shell">
        <Sidebar active={active} onNavigate={handleNavigate} />
        <main>
          {active === 'character' && <CharacterSection />}
          {active === 'stats' && <StatsSection active={active === 'stats'} />}
          {active === 'skills' && <SkillTreeSection />}
          {active === 'quests' && <QuestLogSection />}
          {active === 'achievements' && <AchievementsSection />}
          {active === 'realms' && <RealmsSection />}
          {active === 'about' && <AboutSection />}
          {active === 'contact' && <ContactSection />}
        </main>
      </div>
      <Toast show={showToast} title="ACHIEVEMENT UNLOCKED" subtitle="Explorer — visited every section" />
    </>
  )
}
