import { contact } from '../../data/profile.js'

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="eyebrow">05 / CONTACT</div>
      <h1 className="title">Initiate Connection</h1>
      <p className="subtitle">Send a party invite. I usually respond within a day or two.</p>

      <div className="contactcard">
        <div className="status">{contact.status}</div>
        <h2>{contact.heading}</h2>
        <p>{contact.body}</p>
        <div className="contact-links">
          {contact.links.map((l) => (
            <a key={l.label} href={l.href}>
              <span>{l.label}</span>
              <span className="val">{l.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
