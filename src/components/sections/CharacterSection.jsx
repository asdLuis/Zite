import { identity, character } from '../../data/profile.js'

export default function CharacterSection() {
  return (
    <section className="section" id="character">
      <div className="eyebrow">01 / CHARACTER PROFILE</div>
      <h1 className="title">Player Card</h1>
      <p className="subtitle">The short version of who I am, at a glance, if anyone who has thirty seconds and a coffee.</p>

      <div className="charwrap">
        <div className="portrait">
          <div className="avatar">{identity.initials}</div>
          <h2>{identity.fullName}</h2>
          <div className="role">{identity.role}</div>
          <div className="taglist">
            {identity.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>

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
            <a href={character.resumeUrl} className="btn btn-primary">Download Resume ↓</a>
          </div>
        </div>
      </div>
    </section>
  )
}
