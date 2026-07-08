export default function Quest({ quest }) {
  return (
    <details className="quest" open={quest.openByDefault}>
      <summary>
        <div className="qleft">
          <span className="qtag">{quest.tag}</span>
          <div>
            <h3>{quest.title}</h3>
            <div className="qmeta">{quest.meta}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="diff">
            {[1, 2, 3, 4, 5].map((n) => (
              <i key={n} className={n <= quest.difficulty ? 'on' : ''} />
            ))}
          </div>
          <span className="chevron">▶</span>
        </div>
      </summary>
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
        {quest.future && (
          <div className="row"><div className="k">FUTURE</div><div className="v">{quest.future}</div></div>
        )}
        <div className="row"><div className="k">STATUS</div><div className="v">{quest.status}</div></div>
        {(quest.github || quest.demo || quest.writeup) && (
          <div className="qlinks">
            {quest.github && <a className="btn btn-ghost" href={quest.github}>GitHub ↗</a>}
            {quest.demo && <a className="btn btn-ghost" href={quest.demo}>Live Demo ↗</a>}
            {quest.writeup && <a className="btn btn-ghost" href={quest.writeup}>Write-up ↗</a>}
          </div>
        )}
      </div>
    </details>
  )
}
