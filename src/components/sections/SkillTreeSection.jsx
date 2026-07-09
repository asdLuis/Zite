import { useEffect } from 'react'
import { skillTree } from '../../data/profile.js'
import Branch from '../ui/Branch.jsx'

export default function SkillTreeSection({ handleUnlock }) {
  useEffect(() => {
    // 60-second timer for Fullstack Journeyman achievement
    const timer = setTimeout(() => {
      handleUnlock('fullstack', 'ACHIEVEMENT UNLOCKED', 'Fullstack Journeyman — Analyzed the skill trees')
    }, 60000)
    
    return () => clearTimeout(timer)
  }, [handleUnlock])

  return (
    <section className="section" id="skills">
      <div className="eyebrow">02 / SKILL TREE</div>
      <p className="subtitle">Knowledge unlocked by branch. Solid nodes are learned; hollow nodes are next on the list.</p>

      <div className="treewrap">
        {skillTree.map((b) => (
          <Branch key={b.code} code={b.code} name={b.name} nodes={b.nodes} />
        ))}
      </div>
    </section>
  )
}