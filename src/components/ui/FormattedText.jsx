///************************************************************************///
/// Function: FormattedText
/// Description: Parses a string for markdown-style **bold** markers and renders them as <b> tags.
/// Parameters: { text } - The plain text string containing bold markers.
/// Returns: JSX.Element
///************************************************************************///
const FormattedText = ({ text }) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>
      )}
    </>
  );
};

export default FormattedText;