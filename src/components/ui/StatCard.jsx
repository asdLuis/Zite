export default function StatCard({ num, label }) {
  return (
    <div className="statcard">
      <div className="num">{num}</div>
      <div className="lbl">{label}</div>
    </div>
  )
}
