export default function Branch({ code, name, nodes }) {
  return (
    <div className="branch">
      <div className="bhead">
        <div className="bicon">{code}</div>
        <h3>{name}</h3>
      </div>
      {nodes.map((node) => (
        <div key={node.label} className={`node ${node.locked ? 'locked' : ''}`}>
          <span className="pip" />
          {node.label}
        </div>
      ))}
    </div>
  )
}
