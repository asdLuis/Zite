export default function Toast({ show, title, subtitle, icon = '🏆' }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="ticon">{icon}</div>
      <div>
        <div className="ttitle">{title}</div>
        <div className="tsub">{subtitle}</div>
      </div>
    </div>
  )
}
