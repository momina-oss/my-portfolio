import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { experience } from '../data'

export default function Experience() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Where I've contributed">
        Engineering, brand leadership and event coordination.
      </PageHeader>

      <section className="container">
        <div className="timeline">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="card">
                  <div className="timeline-top">
                    <h3>{e.role}</h3>
                    <span className="tag">{e.period}</span>
                  </div>
                  <div className="timeline-org">{e.org}</div>
                  <div className="timeline-sub">{e.sub}</div>
                  <ul className="bullets">
                    {e.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
