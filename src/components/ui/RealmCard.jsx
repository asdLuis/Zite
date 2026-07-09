import TiltCard from './TiltCard.jsx'

export default function RealmCard({ name, type, stat, label, url }) {
  return (
    <TiltCard as="a" href={url} className="realm" target="_blank">
      <div className="rhead">
        <span className="rname">{name}</span>
        <span className="rtype">{type}</span>
      </div>
      <div className="rstat">{stat}</div>
      <div className="rlabel">{label}</div>
    </TiltCard>
  )
}