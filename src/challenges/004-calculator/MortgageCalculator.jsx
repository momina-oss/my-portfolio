import { useState, useMemo } from 'react'
import styles from './mortgage.module.css'

const formatMoney = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000)
  const [downPayment, setDownPayment] = useState(80000)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)
  const [taxRate, setTaxRate] = useState(1.1)
  const [insurance, setInsurance] = useState(120)

  const downPct = Math.round((downPayment / homePrice) * 100)

  const {
    loanAmount,
    monthlyPI,
    monthlyTax,
    monthlyTotal,
    totalInterest,
    principalPct,
    interestPct,
  } = useMemo(() => {
    const principal = Math.max(homePrice - downPayment, 0)
    const monthlyRate = rate / 100 / 12
    const numPayments = term * 12

    const pi =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)

    const tax = (homePrice * (taxRate / 100)) / 12
    const total = pi + tax + insurance
    const totalPaid = pi * numPayments
    const interestPaid = totalPaid - principal

    return {
      loanAmount: principal,
      monthlyPI: pi || 0,
      monthlyTax: tax,
      monthlyTotal: total || 0,
      totalInterest: interestPaid || 0,
      principalPct: totalPaid ? (principal / totalPaid) * 100 : 0,
      interestPct: totalPaid ? (interestPaid / totalPaid) * 100 : 0,
    }
  }, [homePrice, downPayment, rate, term, taxRate, insurance])

  const handleDownPct = (pct) => {
    setDownPayment(Math.round((homePrice * pct) / 100))
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Mortgage calculator</div>
          <h1>What will your monthly payment be?</h1>
          <p className={styles.sub}>Adjust the numbers to fit your budget.</p>
        </div>

        <div className={styles.grid}>
          {/* LEFT: inputs */}
          <div className={styles.inputsCard}>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Home price</label>
                <span className={styles.value}>{formatMoney(homePrice)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                value={homePrice}
                onChange={(e) => setHomePrice(+e.target.value)}
                className={styles.slider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Down payment</label>
                <span className={styles.value}>
                  {formatMoney(downPayment)} <span className={styles.pctTag}>{downPct}%</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={homePrice}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(+e.target.value)}
                className={styles.slider}
              />
              <div className={styles.chipRow}>
                {[5, 10, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className={`${styles.chip} ${downPct === pct ? styles.chipActive : ''}`}
                    onClick={() => handleDownPct(pct)}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Interest rate</label>
                  <span className={styles.value}>{rate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(+e.target.value)}
                  className={styles.slider}
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Loan term</label>
                  <span className={styles.value}>{term} yrs</span>
                </div>
                <div className={styles.termToggle}>
                  {[15, 20, 30].map((y) => (
                    <button
                      key={y}
                      type="button"
                      className={`${styles.termBtn} ${term === y ? styles.termBtnActive : ''}`}
                      onClick={() => setTerm(y)}
                    >
                      {y}y
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Property tax / yr</label>
                  <span className={styles.value}>{taxRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.05"
                  value={taxRate}
                  onChange={(e) => setTaxRate(+e.target.value)}
                  className={styles.slider}
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Home insurance / mo</label>
                  <span className={styles.value}>${insurance}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="400"
                  step="5"
                  value={insurance}
                  onChange={(e) => setInsurance(+e.target.value)}
                  className={styles.slider}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: result */}
          <div className={styles.resultCard}>
            <div className={styles.resultLabel}>Estimated monthly payment</div>
            <div className={styles.resultAmount}>
              {formatMoney(monthlyTotal)}<span>/mo</span>
            </div>

            <div className={styles.donutWrap}>
              <div
                className={styles.donut}
                style={{
                  background: `conic-gradient(
                    #7c6cff 0% ${principalPct}%,
                    #37e2ff ${principalPct}% 100%
                  )`,
                }}
              >
                <div className={styles.donutHole}>
                  <span className={styles.loanLabel}>Loan amount</span>
                  <span className={styles.loanAmount}>{formatMoney(loanAmount)}</span>
                </div>
              </div>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendRow}>
                <span className={`${styles.dot} ${styles.dotPurple}`} />
                Principal
                <span className={styles.legendValue}>{Math.round(principalPct)}%</span>
              </div>
              <div className={styles.legendRow}>
                <span className={`${styles.dot} ${styles.dotCyan}`} />
                Interest
                <span className={styles.legendValue}>{Math.round(interestPct)}%</span>
              </div>
            </div>

            <div className={styles.breakdown}>
              <div className={styles.breakdownRow}>
                <span>Principal & interest</span>
                <span>{formatMoney(monthlyPI)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Property tax</span>
                <span>{formatMoney(monthlyTax)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Home insurance</span>
                <span>{formatMoney(insurance)}</span>
              </div>
              <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                <span>Total monthly</span>
                <span>{formatMoney(monthlyTotal)}</span>
              </div>
            </div>

            <div className={styles.footnote}>
              Total interest over {term} years: <strong>{formatMoney(totalInterest)}</strong>
            </div>

            <button className={styles.ctaBtn}>Get pre-approved →</button>
          </div>
        </div>
      </div>
    </div>
  )
}