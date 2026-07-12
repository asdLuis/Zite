import '../../styles/ui/Branch.css';

///************************************************************************///
/// Function: Branch
/// Description: Renders a skill tree branch with its associated unlockable nodes.
/// Parameters: 
///   { code, name, nodes }
///   code - String representing the branch identifier/icon text.
///   name - String representing the branch title.
///   nodes - Array of objects containing label and locked status.
/// Returns: JSX.Element
///************************************************************************///
const Branch = ({ code, name, nodes }) => {
  return (
    <div className="branch-container">
      <div className="branch-head">
        <div className="branch-icon">{code}</div>
        <h3>{name}</h3>
      </div>
      {nodes.map((node) => (
        <div key={node.label} className={`branch-node ${node.locked ? 'branch-locked' : ''}`}>
          <span className="branch-pip" />
          {node.label}
        </div>
      ))}
    </div>
  );
};

export default Branch;