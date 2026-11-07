import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { profile, education, skills, certifications } from '../data'

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="Transforming Data into Intelligent Solutions">
        {profile.summary}
      </PageHeader>

      <section className="section container">
        <div className="grid grid-2">
          <Reveal>
            <div className="card">
              <h3 className="card-title">Education</h3>
              <div className="list">
                {education.map((e) => (
                  <div className="list-item" key={e.degree}>
                    <span className="list-dot" />
                    <div>
                      <strong>{e.degree}</strong>
                      <span>{e.school}</span>
                      <em>{e.period}</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card">
              <h3 className="card-title">Certifications</h3>
              <div className="list">
                {certifications.map((c) => (
                  <div className="list-item" key={c.name}>
                    <span className="list-dot" />
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="eyebrow">Toolkit</div>
              <h2>Skills</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-2">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 80}>
              <div className="card">
                <div className="skill-head">
                  <span className="skill-icon">{g.icon}</span>
                  <h3>{g.group}</h3>
                </div>
                <div className="chips">
                  {g.items.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
