import '../../styles/ui/StatCard.css';

///************************************************************************///
/// Function: StatCard
/// Description: Renders a statistical data card with a numeric value and label.
/// Parameters: 
///   { num, label }
///   num - String or Number representing the primary statistic.
///   label - String describing the statistic.
/// Returns: JSX.Element
///************************************************************************///
const StatCard = ({ num, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-num">{num}</div>
      <div className="stat-card-lbl">{label}</div>
    </div>
  );
};

export default StatCard;