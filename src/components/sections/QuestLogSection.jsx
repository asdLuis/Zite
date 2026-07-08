import { quests } from '../../data/profile.js'
import Quest from '../ui/Quest.jsx'

export default function QuestLogSection() {
  return (
    <section className="section" id="quests">
      <div className="eyebrow">03 / QUEST LOG</div>
      <h1 className="title">Completed Quests</h1>
      <p className="subtitle">Every project is a quest with a real problem, a real fight, and a real outcome. Expand any entry for the full log.</p>

      <div className="questlist">
        {quests.map((q) => <Quest key={q.id} quest={q} />)}
      </div>
    </section>
  )
}
