import '../../styles/ui/Quest.css';

///************************************************************************///
/// Function: Quest
/// Description: Renders a detailed quest log card with problem, stack, and links.
/// Parameters: { quest } - Object containing all data for a specific project/quest.
/// Returns: JSX.Element
///************************************************************************///
const Quest = ({ quest }) => {
  const statusClass = quest.status.toLowerCase() === 'ongoing' ? 'quest-status-ongoing' : 'quest-status-completed';

  return (
    <div className="quest-card">
      <div className="quest-summary">
        <div className="quest-left">
          <span className="quest-tag-highlight">{quest.tag}</span>
          <div>
            <h3>{quest.title}</h3>
            <div className="quest-meta">{quest.meta}</div>
          </div>
        </div>
        <div className="quest-diff">
          {[1, 2, 3, 4, 5].map((n) => (
            <i key={n} className={n <= quest.difficulty ? 'quest-diff-on' : ''} />
          ))}
        </div>
      </div>

      <div className="quest-body">
        <div className="quest-row">
          <div className="quest-k">PROBLEM</div>
          <div className="quest-v">{quest.problem}</div>
        </div>
        <div className="quest-row">
          <div className="quest-k">GOAL</div>
          <div className="quest-v">{quest.goal}</div>
        </div>
        <div className="quest-row">
          <div className="quest-k">STACK</div>
          <div className="quest-v">
            <div className="quest-stacklist">
              {quest.stack.map((t) => <span key={t} className="quest-tag">{t}</span>)}
            </div>
          </div>
        </div>
        
        {quest.challenges && (
          <div className="quest-row">
            <div className="quest-k">CHALLENGES</div>
            <div className="quest-v">{quest.challenges}</div>
          </div>
        )}
        
        {quest.lessons && (
          <div className="quest-row">
            <div className="quest-k">LESSONS</div>
            <div className="quest-v">{quest.lessons}</div>
          </div>
        )}

        <div className="quest-row">
          <div className="quest-k">STATUS</div>
          <div className="quest-v">
            <span className={`quest-tag-highlight ${statusClass}`}>
              {quest.status}
            </span>
          </div>
        </div>

        {(quest.github || quest.demo || quest.writeup || quest.front) && (
          <div className="quest-links">
            {quest.github && (
              <a className="quest-btn quest-btn-ghost" href={quest.github} target="_blank" rel="noopener noreferrer">
                Repository ↗
              </a>
            )}
            {quest.front && (
              <a className="quest-btn quest-btn-ghost" href={quest.front} target="_blank" rel="noopener noreferrer">
                Frontend ↗
              </a>
            )}
            {quest.demo && (
              <a className="quest-btn quest-btn-ghost" href={quest.demo} target="_blank" rel="noopener noreferrer">
                Live Demo ↗
              </a>
            )}
            {quest.writeup && (
              <a className="quest-btn quest-btn-ghost" href={quest.writeup} target="_blank" rel="noopener noreferrer">
                Write-up ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quest;