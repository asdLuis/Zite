import { contact } from '../../data/profile.js';
import '../../styles/ContactSection.css';

///************************************************************************///
/// Function: ContactSection
/// Description: Renders the contact section displaying communication links.
/// Parameters: None
/// Returns: JSX.Element
///************************************************************************///
const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-eyebrow">05 / CONTACT</div>
      <h1 className="contact-title">Initiate Connection</h1>
      <p className="contact-subtitle">
        Send a party invite. I usually respond within a day or two.
      </p>

      <div className="contact-card">
        <h2>{contact.heading}</h2>
        <p>{contact.body}</p>
        <div className="contact-links">
          {contact.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              <span>{l.label}</span>
              <span className="contact-val">{l.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;