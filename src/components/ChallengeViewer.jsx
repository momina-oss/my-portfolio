import { Suspense, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { challengeComponents } from '../challengeRegistry'

export default function ChallengeViewer({ challenges, index, onChange, onClose }) {
  const total = challenges.length
  const current = challenges[index]
  const prev = challenges[(index - 1 + total) % total]
  const next = challenges[(index + 1) % total]
  const Design = challengeComponents[index]

  // lock page scroll while the viewer is open
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  const go = (i) => onChange((i + total) % total)

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${current.name} design`}>
      <div className="viewer-bar">
        <button className="viewer-back" onClick={onClose}>
          ← All challenges
        </button>

        <div className="viewer-title">
          <span className="viewer-no">{current.no}</span>
          <div>
            <strong>{current.name}</strong>
            <span>{current.desc}</span>
          </div>
        </div>

        <div className="viewer-nav">
          <select
            className="viewer-jump"
            value={index}
            onChange={(e) => go(Number(e.target.value))}
            aria-label="Jump to a design"
          >
            {challenges.map((c, i) => (
              <option key={c.no} value={i}>
                {c.no} · {c.name}
              </option>
            ))}
          </select>
          <span className="viewer-count">{index + 1} / {total}</span>
          <button className="viewer-arrow" onClick={() => go(index - 1)} title={`Previous: ${prev.name}`}>
            ← Prev
          </button>
          <button className="viewer-arrow viewer-arrow-primary" onClick={() => go(index + 1)} title={`Next: ${next.name}`}>
            Next →
          </button>
        </div>
      </div>

      {/* key remounts the design on every switch so each one starts fresh */}
      <div className="viewer-stage" key={current.no}>
        <Suspense fallback={<div className="viewer-loading">Loading design…</div>}>
          <Design />
        </Suspense>
      </div>
    </div>,
    document.body,
  )
}
