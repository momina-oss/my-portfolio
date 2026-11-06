import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ChallengeViewer from '../components/ChallengeViewer'
import { challenges, profile } from '../data'

const categories = ['All', ...Array.from(new Set(challenges.map((c) => c.category)))]

export default function Challenges() {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState(null) // index into the full challenges list
  const list = cat === 'All' ? challenges : challenges.filter((c) => c.category === cat)

  const requestSource = `mailto:${profile.email}?subject=${encodeURIComponent('Request: UI Challenges source code')}`

  const open = (c) => setActive(challenges.findIndex((x) => x.no === c.no))

  return (
    <>
      <PageHeader eyebrow="UI Challenges" title="30 days, 30 interfaces, one product">
        A complete DailyUI series built in React around a single fictional product, Flowmode.
        Each challenge is an isolated component with its own scoped stylesheet, so styles and
        state never leak between screens. Click any card to open the live design.
      </PageHeader>

      <section className="container">
        <div className="callout">
          <div>
            <strong>How it's built</strong>
            <p>
              React + Vite, CSS Modules, no UI kits. One running app with a switcher for all 30
              challenges. The source repository is private.
            </p>
          </div>
          <a href={requestSource} className="btn btn-ghost">Request source code</a>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter ${cat === c ? 'filter-active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-3">
          {list.map((c) => (
            <div
              className="card challenge-card challenge-clickable"
              key={c.no}
              role="button"
              tabIndex={0}
              onClick={() => open(c)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  open(c)
                }
              }}
            >
              <div className="challenge-top">
                <span className="challenge-no">{c.no}</span>
                <span className="tag">{c.category}</span>
              </div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <span className="challenge-view">View design →</span>
            </div>
          ))}
        </div>
      </section>

      {active !== null && (
        <ChallengeViewer
          challenges={challenges}
          index={active}
          onChange={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </>
  )
}
