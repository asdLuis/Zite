import TiltCard from './TiltCard.jsx'

export default function RealmCard({ name, type, stat, label, url }) {
  return (
    <TiltCard className="realm">
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="rhead">
          <span className="rname">{name}</span>
          <span className="rtype">{type}</span>
        </div>
        <div className="rstat">{stat}</div>
        <div className="rlabel">{label}</div>
      </a>
    </TiltCard>
  )}