export default function Quest({ quest }) {
  // Helper to dynamically assign the color class based on the status text
  const statusClass = quest.status.toLowerCase() === 'ongoing' ? 'status-ongoing' : 'status-completed'

  return (
    <div className="quest">
      <div className="summary">
        <div className="qleft">
          <span className="qtag">{quest.tag}</span>
          <div>
            <h3>{quest.title}</h3>
            <div className="qmeta">{quest.meta}</div>
          </div>
        </div>
        <div className="diff">
          {[1, 2, 3, 4, 5].map((n) => (
            <i key={n} className={n <= quest.difficulty ? 'on' : ''} />
          ))}
        </div>
      </div>

      <div className="qbody">
        <div className="row"><div className="k">PROBLEM</div><div className="v">{quest.problem}</div></div>
        <div className="row"><div className="k">GOAL</div><div className="v">{quest.goal}</div></div>
        <div className="row">
          <div className="k">STACK</div>
          <div className="v">
            <div className="stacklist">
              {quest.stack.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>
        {quest.challenges && (
          <div className="row"><div className="k">CHALLENGES</div><div className="v">{quest.challenges}</div></div>
        )}
        {quest.lessons && (
          <div className="row"><div className="k">LESSONS</div><div className="v">{quest.lessons}</div></div>
        )}

        <div className="row">
          <div className="k">STATUS</div>
          <div className="v">
            <span className={`qtag ${statusClass}`}>
              {quest.status}
            </span>
          </div>
        </div>

        {(quest.github || quest.demo || quest.writeup || quest.front) && (
          <div className="qlinks">
            {quest.github && <a className="btn btn-ghost" href={quest.github} target="_blank">
              Repository ↗
            </a>}
            {quest.front && <a className="btn btn-ghost" href={quest.front} target="_blank">
              Frontend ↗
            </a>}
            {quest.demo && <a className="btn btn-ghost" href={quest.demo} target="_blank">
              Live Demo ↗
            </a>}
            {quest.writeup && <a className="btn btn-ghost" href={quest.writeup} target="_blank">
              Write-up ↗
            </a>}
          </div>
        )}
      </div>
    </div>
  )
}