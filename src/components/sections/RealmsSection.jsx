import { realms } from '../../data/profile.js'
// Adjust this path based on where you saved the file above
import AnimatedStat from '../ui/AnimatedStat.jsx' 

export default function RealmsSection() {
  return (
    <section className="section" id="realms">
      <div className="eyebrow">04 / CONNECTED REALMS</div>
      <p className="subtitle">The communities and platforms I'm actually active in — plus some fun little stats.</p>
      
      <div className="realmgrid">
        {realms.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noreferrer" className="realm">
            <div className="rhead">
              <div className="rname">{r.name}</div>
              <div className="rtype">{r.type}</div>
            </div>
            
            {/* Implement the animated stat here */}
            <div className="rstat">
              <AnimatedStat value={r.stat} />
            </div>
            
            <div className="rlabel">{r.label}</div>
          </a>
        ))}
      </div>
    </section>
  )
}