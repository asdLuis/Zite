// Renders a string with **bold** markers as <b> tags, so copy in
// data/profile.js can stay plain text but still highlight key phrases.
export default function FormattedText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>
      )}
    </>
  )
}
