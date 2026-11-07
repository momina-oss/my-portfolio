import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { profile } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const channels = [
    { icon: '✉', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'in', label: 'LinkedIn', value: 'momina-zahid', href: profile.linkedin },
    { icon: '⌖', label: 'Location', value: profile.location, href: null },
  ]

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's Work Together">
      Open to internships, collaborations, and opportunities to apply data science and development skills to real-world challenges.
      </PageHeader>

      <section className="container">
        <div className="contact-grid">
          <div className="contact-side">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <span className="contact-label">{c.label}</span>
                    <span className="contact-value">{c.value}</span>
                  </div>
                </>
              )
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="card contact-card">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="card contact-card">{inner}</div>
              )
            })}
          </div>

          <form className="card contact-form" onSubmit={handleSubmit}>
            <h3 className="card-title">Send a message</h3>
            <div className="form-field">
              <label>Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" />
            </div>
            <div className="form-field">
              <label>Your Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea name="message" rows={6} value={form.message} onChange={handleChange} required placeholder="How can I help?" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send message</button>
            {sent && (
              <p className="form-note">
                Your email app should have opened with the message ready to send.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
