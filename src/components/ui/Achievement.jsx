export default function Achievement({ icon, title, desc, date, locked }) {
  return (
    <div className={`ach ${locked ? 'locked' : ''}`}>
      <div className="aicon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="adate">{date}</div>
      </div>
    </div>
  )
}
