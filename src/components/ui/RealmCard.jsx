import TiltCard from './TiltCard.jsx';
import '../../styles/ui/RealmCard.css';

///************************************************************************///
/// Function: RealmCard
/// Description: Renders an individual connected realm card with platform stats.
/// Parameters: 
///   { name, type, stat, label, url }
///   name - String for the realm/platform name.
///   type - String for the type of platform.
///   stat - React node or string for the primary statistic.
///   label - String for the statistic's label.
///   url - String for the external link.
/// Returns: JSX.Element
///************************************************************************///
const RealmCard = ({ name, type, stat, label, url }) => {
  return (
    <TiltCard className="realm-card">
      <a href={url} target="_blank" rel="noopener noreferrer" className="realm-card-link">
        <div className="realm-card-head">
          <span className="realm-card-name">{name}</span>
          <span className="realm-card-type">{type}</span>
        </div>
        <div className="realm-card-stat">{stat}</div>
        <div className="realm-card-label">{label}</div>
      </a>
    </TiltCard>
  );
};

export default RealmCard;