import { identity } from '../data/profile.js'
import Nav from './Nav.jsx'

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        {identity.brandName}
        <span>{identity.brandSuffix}</span>
      </div>

      <Nav active={active} onNavigate={onNavigate} />

      <div className="footer-note">
        <span className="dot">●</span> {identity.status}
        <br />
        {identity.location}
      </div>
    </aside>
  )
}
