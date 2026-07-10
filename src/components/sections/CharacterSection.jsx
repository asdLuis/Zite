import { identity, character } from '../../data/profile.js'
import FlipCard from '../ui/FlipCard.jsx'

export default function CharacterSection({ handleUnlock }) {
  
  const handleInspect = () => {
    handleUnlock('artist', 'ACHIEVEMENT UNLOCKED', 'Artisan — Inspected the masterpiece')
  }

  return (
    <section className="section" id="character">
      <div className="eyebrow">01 / CHARACTER PROFILE</div>
      <h1 className="title">Player Card</h1>
      <p className="subtitle">The short version of who I am, at a glance, if anyone who has thirty seconds and a coffee.</p>

      <div className="charwrap">
        <FlipCard
          className="portrait"
          backClassName="portrait portrait-back"
          front={
            <div onClick={handleInspect} style={{ cursor: 'pointer' }}>
              <img className="avatar" src={identity.photo} alt={identity.fullName} />
              <h2>{identity.fullName}</h2>
              <div className="role">{identity.role}</div>
              <div className="taglist">
                {identity.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          }
          back={
            <div className="card-back">
              <div className="card-back-emblem">
                <svg viewBox="0 0 64 64">
                  <polygon points="32,3 58,17.5 58,46.5 32,61 6,46.5 6,17.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>{identity.brandName.charAt(0)}</span>
              </div>
              <div className="card-back-wordmark">
                {identity.brandName}
                <span>{identity.brandSuffix}</span>
              </div>
              <div className="card-back-hint">You miss 100% of the shots you don't take</div>
            </div>
          }
        />

        <div className="infoblock">
          <p className="lead">{character.lead}</p>
          <div className="infogrid">
            {character.info.map((item) => (
              <div key={item.k}>
                <div className="k">{item.k}</div>
                <div className="v">{item.v}</div>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <a href={character.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Resume ↗
            </a>
            <a href={character.resumeUrl} download="Luis_Isauro_Zamano_Resume.pdf" className="btn btn-ghost">
              Download PDF ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}