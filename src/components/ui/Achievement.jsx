import '../../styles/ui/Achievement.css';

///************************************************************************///
/// Function: Achievement
/// Description: Renders an individual achievement card with its icon and details.
/// Parameters: 
///   { icon, title, desc, date, locked }
///   icon - Element or string representing the achievement icon.
///   title - String for the achievement title.
///   desc - String for the achievement description.
///   date - String for the date unlocked.
///   locked - Boolean indicating if the achievement is still locked.
/// Returns: JSX.Element
///************************************************************************///
const Achievement = ({ icon, title, desc, date, locked }) => {
  return (
    <div className={`achievement-ach ${locked ? 'achievement-locked' : ''}`}>
      <div className="achievement-aicon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="achievement-adate">{date}</div>
      </div>
    </div>
  );
};

export default Achievement;