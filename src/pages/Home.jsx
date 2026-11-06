import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { profile, projects, challenges } from '../data'

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  // typing effect cycling through roles
  useEffect(() => {
    const full = profile.roles[roleIndex]
    const t = setTimeout(
      () => {
        if (!deleting) {
          setText(full.slice(0, text.length + 1))
          if (text.length + 1 === full.length) setTimeout(() => setDeleting(true), 1200)
        } else {
          setText(full.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setDeleting(false)
            setRoleIndex((i) => (i + 1) % profile.roles.length)
          }
        }
      },
      deleting ? 35 : 70,
    )
    return () => clearTimeout(t)
  }, [text, deleting, roleIndex])

  const stats = [
    { value: '4', label: 'Projects' },
    { value: String(challenges.length), label: 'UI Challenges' },
    { value: '3', label: 'Roles' },
    { value: '2', label: 'Google Certificates' },
  ]

  return (
    <>
      <section className="hero container">
        <div className="hero-text">
          <div className="status-pill">
            <span className="status-dot" /> Open to internships and collaborations
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>
          <div className="hero-role">
            <span>{text}</span>
            <span className="caret" />
          </div>
          <p className="lead">{profile.summary}</p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">View projects</Link>
            <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
          </div>
        </div>

        <div className="code-card">
          <div className="code-bar">
            <span /><span /><span />
            <em>momina.py</em>
          </div>
          <pre>
{`class Momina:
    role = "Data Science Undergraduate"
    university = "Jinnah University for Women"
    location = "Karachi, Pakistan"

    stack = [
        "Python", "Scikit-learn", "XGBoost",
        "React.js", "FastAPI", "MySQL",
    ]

    def focus(self):
        return [
            "machine learning",
            "data analytics",
            "full-stack development",
        ]`}
          </pre>
        </div>
      </section>

      <section className="container">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">Selected work</div>
              <h2>Featured projects</h2>
            </div>
            <Link to="/projects" className="text-link">All projects →</Link>
          </div>
        </Reveal>
        <div className="grid grid-2">
          {projects.slice(0, 4).map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="card project-card">
                <span className="tag tag-blue">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="chips">
                  {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <div className="cta-band">
            <div>
              <h2>30 UI challenges, one product brand</h2>
              <p>
                A full DailyUI series built in React around a single fictional
                product, with scoped styles and real interactions.
              </p>
            </div>
            <Link to="/ui-challenges" className="btn btn-primary">Explore the series</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
