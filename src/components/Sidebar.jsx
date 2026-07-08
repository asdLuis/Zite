import { identity } from '../data/profile.js'
import Nav from './Nav.jsx'

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">{identity.brandName.charAt(0)}</span>
        <span className="brand-full side-label">
          {identity.brandName}
          <span>{identity.brandSuffix}</span>
        </span>
      </div>

      <Nav active={active} onNavigate={onNavigate} />

      <div className="footer-note side-label">
        <span className="dot">●</span> {identity.status}
        <br />
        {identity.location}
      </div>
    </aside>
  )
}