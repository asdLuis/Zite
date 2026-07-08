import { realms } from '../../data/profile.js'
import RealmCard from '../ui/RealmCard.jsx'

export default function RealmsSection() {
  return (
    <section className="section" id="realms">
      <div className="eyebrow">06 / CONNECTED REALMS</div>
      <h1 className="title">Linked Profiles</h1>
      <p className="subtitle">The communities and platforms I'm actually active in — not just icons in a footer.</p>

      <div className="realmgrid">
        {realms.map((r) => <RealmCard key={r.name} {...r} />)}
      </div>
    </section>
  )
}
