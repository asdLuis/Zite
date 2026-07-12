import FlipCard from '../ui/FlipCard.jsx';
import { identity, character } from '../../data/profile.js';
import '../../styles/CharacterSection.css';

///************************************************************************///
/// Function: CharacterSection
/// Description: Renders the player card section with profile info and a flip card.
/// Parameters: { handleUnlock } - Function to trigger an achievement unlock.
/// Returns: JSX.Element
///************************************************************************///
const CharacterSection = ({ handleUnlock }) => {
  
  ///************************************************************************///
  /// Function: handleInspect
  /// Description: Triggers the artist achievement when the portrait is clicked.
  /// Parameters: None
  /// Returns: void
  ///************************************************************************///
  const handleInspect = () => {
    handleUnlock('artist', 'ACHIEVEMENT UNLOCKED', 'Artisan — Inspected the masterpiece');
  };

  return (
    <section className="character-section" id="character">
      <div className="character-eyebrow">01 / CHARACTER PROFILE</div>
      <h1 className="character-title">Player Card</h1>
      <p className="character-subtitle">
        The short version of who I am, at a glance, if anyone who has thirty seconds and a coffee.
      </p>

      <div className="character-charwrap">
        <FlipCard
          className="character-portrait"
          backClassName="character-portrait character-portrait-back"
          front={
            <div onClick={handleInspect} style={{ cursor: 'pointer' }}>
              <img className="character-avatar" src={identity.photo} alt={identity.fullName} />
              <h2>{identity.fullName}</h2>
              <div className="character-role">{identity.role}</div>
              <div className="character-taglist">
                {identity.tags.map((tag) => (
                  <span key={tag} className="character-tag">{tag}</span>
                ))}
              </div>
            </div>
          }
          back={
            <div className="character-card-back">
              <div className="character-card-back-emblem">
                <svg viewBox="0 0 64 64">
                  <polygon points="32,3 58,17.5 58,46.5 32,61 6,46.5 6,17.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>{identity.brandName.charAt(0)}</span>
              </div>
              <div className="character-card-back-wordmark">
                {identity.brandName}
                <span>{identity.brandSuffix}</span>
              </div>
              <div className="character-card-back-hint">You miss 100% of the shots you don't take</div>
            </div>
          }
        />

        <div className="character-infoblock">
          <p className="character-lead">{character.lead}</p>
          <div className="character-infogrid">
            {character.info.map((item) => (
              <div key={item.k}>
                <div className="character-k">{item.k}</div>
                <div className="character-v">{item.v}</div>
              </div>
            ))}
          </div>
          <div className="character-cta-row">
            <a href={character.resumeUrl} target="_blank" rel="noopener noreferrer" className="character-btn character-btn-primary">
              View Resume ↗
            </a>
            <a href={character.resumeUrl} download="Luis_Isauro_Zamano_Resume.pdf" className="character-btn character-btn-ghost">
              Download PDF ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterSection;