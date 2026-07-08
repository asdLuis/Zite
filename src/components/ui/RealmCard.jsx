export default function RealmCard({ name, type, stat, label, url }) {
  return (
    <a className="realm" href={url}>
      <div className="rhead">
        <span className="rname">{name}</span>
        <span className="rtype">{type}</span>
      </div>
      <div className="rstat">{stat}</div>
      <div className="rlabel">{label}</div>
    </a>
  )
}
