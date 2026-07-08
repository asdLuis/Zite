import { navItems } from '../data/profile.js'

export default function Nav({ active, onNavigate }) {
  return (
    <ul className="navlist">
      {navItems.map((item) => (
        <li key={item.id}>
          <button
            className={active === item.id ? 'active' : ''}
            onClick={() => onNavigate(item.id)}
          >
            <span className="idx">{item.index}</span>
            <span className="side-label">{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}