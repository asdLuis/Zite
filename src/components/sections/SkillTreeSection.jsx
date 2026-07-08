import { skillTree } from '../../data/profile.js'
import Branch from '../ui/Branch.jsx'

export default function SkillTreeSection() {
  return (
    <section className="section" id="skills">
      <div className="eyebrow">03 / SKILL TREE</div>
      <h1 className="title">Talent Tree</h1>
      <p className="subtitle">Knowledge unlocked by branch. Solid nodes are learned; hollow nodes are next on the list.</p>

      <div className="treewrap">
        {skillTree.map((b) => (
          <Branch key={b.code} code={b.code} name={b.name} nodes={b.nodes} />
        ))}
      </div>
    </section>
  )
}
