import { skillTree } from '../../data/profile.js'
import Branch from '../ui/Branch.jsx'

export default function SkillTreeSection() {
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
