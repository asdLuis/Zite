import AnimatedStat from '../ui/AnimatedStat.jsx';
import { realms } from '../../data/profile.js';
import '../../styles/RealmsSection.css';

///************************************************************************///
/// Function: RealmsSection
/// Description: Renders the connected realms section showcasing external platforms and stats.
/// Parameters: None
/// Returns: JSX.Element
///************************************************************************///
const RealmsSection = () => {
  return (
    <section className="realms-section" id="realms">
      <div className="realms-eyebrow">04 / CONNECTED REALMS</div>
      <p className="realms-subtitle">
        The communities and platforms I'm actually active in — plus some fun little stats.
      </p>
      
      <div className="realms-realmgrid">
        {realms.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="realms-realm">
            <div className="realms-rhead">
              <div className="realms-rname">{r.name}</div>
              <div className="realms-rtype">{r.type}</div>
            </div>
            
            <div className="realms-rstat">
              <AnimatedStat value={r.stat} />
            </div>
            
            <div className="realms-rlabel">{r.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RealmsSection;