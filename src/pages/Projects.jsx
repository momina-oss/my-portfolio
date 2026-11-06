import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { projects } from '../data'

const filters = ['All', 'Machine Learning', 'Full-Stack', 'Web']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <PageHeader eyebrow="Projects" title="Things I've built">
        Machine learning models, full-stack platforms and database-driven web applications.
      </PageHeader>

      <section className="container">
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter ${filter === f ? 'filter-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-2">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card project-card project-full">
                <div className="project-top">
                  <span className="tag tag-blue">{p.category}</span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-link">View ↗</a>
                  )}
                </div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <ul className="bullets">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <div className="chips">
                  {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
