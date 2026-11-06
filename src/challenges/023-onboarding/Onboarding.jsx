import { useState } from 'react'
import styles from './onboarding.module.css'

const steps = ['welcome', 'feature1', 'feature2', 'goal', 'notify', 'done']

const goals = [
  { id: 'deepwork', icon: '🎯', label: 'Protect deep work blocks' },
  { id: 'study', icon: '📚', label: 'Study without distraction' },
  { id: 'balance', icon: '⚖️', label: 'Build a healthier routine' },
  { id: 'team', icon: '👥', label: 'Help my team stay focused' },
]

export default function Onboarding() {
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [notifyChoice, setNotifyChoice] = useState(null)

  const step = steps[stepIndex]
  const progress = ((stepIndex) / (steps.length - 1)) * 100

  const goNext = () => {
    setDirection('forward')
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  const goBack = () => {
    setDirection('back')
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  const skipToEnd = () => {
    setDirection('forward')
    setStepIndex(steps.length - 1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.phone}>
        {/* Progress + skip */}
        {step !== 'welcome' && step !== 'done' && (
          <div className={styles.topBar}>
            <button className={styles.backBtn} onClick={goBack}>←</button>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <button className={styles.skipBtn} onClick={skipToEnd}>Skip</button>
          </div>
        )}

        <div className={styles.content} key={step}>
          {/* ---- Welcome ---- */}
          {step === 'welcome' && (
            <div className={styles.slide}>
              <div className={styles.welcomeGlow} />
              <div className={styles.welcomeMark}>◆</div>
              <h1>Welcome to Flowmode</h1>
              <p className={styles.sub}>
                The focus companion that protects your best hours —
                one session at a time.
              </p>
              <button className={styles.primaryBtn} onClick={goNext}>Get started</button>
              <span className={styles.miniNote}>Takes about 30 seconds</span>
            </div>
          )}

          {/* ---- Feature 1 ---- */}
          {step === 'feature1' && (
            <div className={styles.slide}>
              <div className={styles.featureVisual}>
                <div className={styles.mockTimer}>25:00</div>
                <div className={styles.mockBars}>
                  {[40, 70, 55, 90, 65].map((h, i) => (
                    <div key={i} className={styles.mockBar} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <h2>Focus sessions that fit you</h2>
              <p className={styles.sub}>
                Start a timed deep-work block, add ambient sound, and let
                Flowmode block distracting apps until you're done.
              </p>
              <button className={styles.primaryBtn} onClick={goNext}>Next</button>
            </div>
          )}

          {/* ---- Feature 2 ---- */}
          {step === 'feature2' && (
            <div className={styles.slide}>
              <div className={styles.featureVisual}>
                <div className={styles.mockDonut}>
                  <div className={styles.mockDonutHole}>68%</div>
                </div>
              </div>
              <h2>See your focus trends</h2>
              <p className={styles.sub}>
                Track how much deep work you're getting, spot your sharpest
                hours, and build streaks that actually stick.
              </p>
              <button className={styles.primaryBtn} onClick={goNext}>Next</button>
            </div>
          )}

          {/* ---- Goal selection — real personalization, not filler ---- */}
          {step === 'goal' && (
            <div className={styles.slide}>
              <h2>What brings you to Flowmode?</h2>
              <p className={styles.sub}>We'll tailor your first sessions around this.</p>
              <div className={styles.goalGrid}>
                {goals.map((g) => (
                  <button
                    key={g.id}
                    className={`${styles.goalCard} ${selectedGoal === g.id ? styles.goalCardActive : ''}`}
                    onClick={() => setSelectedGoal(g.id)}
                  >
                    <span className={styles.goalIcon}>{g.icon}</span>
                    {g.label}
                  </button>
                ))}
              </div>
              <button
                className={styles.primaryBtn}
                onClick={goNext}
                disabled={!selectedGoal}
              >
                Continue
              </button>
            </div>
          )}

          {/* ---- Notification permission ---- */}
          {step === 'notify' && (
            <div className={styles.slide}>
              <div className={styles.notifyIcon}>🔔</div>
              <h2>Stay on track</h2>
              <p className={styles.sub}>
                Get a gentle nudge when it's time to start a session, and a
                weekly summary of your progress. You can turn this off anytime.
              </p>
              <button
                className={styles.primaryBtn}
                onClick={() => { setNotifyChoice('allow'); goNext() }}
              >
                Enable notifications
              </button>
              <button
                className={styles.textBtn}
                onClick={() => { setNotifyChoice('skip'); goNext() }}
              >
                Not now
              </button>
            </div>
          )}

          {/* ---- Done ---- */}
          {step === 'done' && (
            <div className={styles.slide}>
              <div className={styles.doneIcon}>✓</div>
              <h1>You're all set{selectedGoal ? ',' : '!'}</h1>
              {selectedGoal && (
                <p className={styles.sub}>
                  We've set up your first session around{' '}
                  <strong>{goals.find((g) => g.id === selectedGoal)?.label.toLowerCase()}</strong>.
                </p>
              )}
              <button className={styles.primaryBtn}>Start my first session →</button>
            </div>
          )}
        </div>

        {/* Dots indicator */}
        {step !== 'done' && (
          <div className={styles.dots}>
            {steps.slice(0, -1).map((s, i) => (
              <span
                key={s}
                className={`${styles.dot} ${i === stepIndex ? styles.dotActive : ''} ${i < stepIndex ? styles.dotDone : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}