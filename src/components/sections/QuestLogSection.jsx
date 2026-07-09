import { useState, useEffect } from 'react'
import { quests } from '../../data/profile.js'
import Quest from '../ui/Quest.jsx'

export default function QuestLogSection({ handleUnlock }) {
  const [viewedQuests, setViewedQuests] = useState(new Set())

  const handleQuestToggle = (id) => {
    setViewedQuests(prev => new Set(prev).add(id))
  }

  useEffect(() => {
    // If all quests have been viewed at least once
    if (viewedQuests.size === quests.length && quests.length > 0) {
      handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log')
    }
  }, [viewedQuests, handleUnlock])

  return (
    <section className="section" id="quests">
      <div className="eyebrow">03 / QUEST LOG</div>
      <p className="subtitle">Every project is a quest with a real problem, a real fight, and a real outcome. Expand any entry for the full log.</p>

      <div className="questlist">
        {quests.map((q) => (
          <Quest 
            key={q.id} 
            quest={q} 
            onToggle={() => handleQuestToggle(q.id)} 
          />
        ))}
      </div>
    </section>
  )
}