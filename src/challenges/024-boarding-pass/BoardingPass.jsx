import { useState } from 'react'
import styles from './boardingpass.module.css'

export default function BoardingPass() {
  const [addedToWallet, setAddedToWallet] = useState(false)

  const flight = {
    airline: 'Meridian Air',
    flightNo: 'MA 482',
    passenger: 'MINA KHAN',
    from: { code: 'KHI', city: 'Karachi' },
    to: { code: 'DXB', city: 'Dubai' },
    date: 'Sat, Oct 14 2026',
    boarding: '10:45 AM',
    departure: '11:25 AM',
    arrival: '1:10 PM',
    gate: 'B12',
    seat: '14A',
    class: 'Economy Plus',
    zone: 'Zone 2',
    terminal: 'T1',
    confirmation: 'QK7ZR2',
  }

  const handleWallet = () => {
    setAddedToWallet(true)
    setTimeout(() => setAddedToWallet(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.ticket}>
          {/* ---- Main stub ---- */}
          <div className={styles.mainStub}>
            <div className={styles.header}>
              <div className={styles.airline}>
                <span className={styles.airlineLogo}>✈</span>
                {flight.airline}
              </div>
              <span className={styles.classTag}>{flight.class}</span>
            </div>

            <div className={styles.routeRow}>
              <div className={styles.routePoint}>
                <span className={styles.airportCode}>{flight.from.code}</span>
                <span className={styles.cityName}>{flight.from.city}</span>
              </div>
              <div className={styles.routeLine}>
                <span className={styles.dashLine} />
                <span className={styles.planeIcon}>✈</span>
                <span className={styles.dashLine} />
              </div>
              <div className={styles.routePoint}>
                <span className={styles.airportCode}>{flight.to.code}</span>
                <span className={styles.cityName}>{flight.to.city}</span>
              </div>
            </div>

            <div className={styles.passengerRow}>
              <span className={styles.passengerLabel}>Passenger</span>
              <span className={styles.passengerName}>{flight.passenger}</span>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Flight</span>
                <span className={styles.detailValue}>{flight.flightNo}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date</span>
                <span className={styles.detailValue}>{flight.date}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Gate</span>
                <span className={styles.detailValue}>{flight.gate}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Seat</span>
                <span className={styles.detailValueHighlight}>{flight.seat}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Boarding</span>
                <span className={styles.detailValue}>{flight.boarding}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Departs</span>
                <span className={styles.detailValue}>{flight.departure}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Terminal</span>
                <span className={styles.detailValue}>{flight.terminal}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Zone</span>
                <span className={styles.detailValue}>{flight.zone}</span>
              </div>
            </div>
          </div>

          {/* ---- Perforation ---- */}
          <div className={styles.perforation} />

          {/* ---- Small boarding stub ---- */}
          <div className={styles.stub}>
            <div className={styles.stubTop}>
              <div>
                <span className={styles.stubRoute}>{flight.from.code} → {flight.to.code}</span>
                <span className={styles.stubFlight}>{flight.flightNo} · {flight.date}</span>
              </div>
              <div className={styles.stubSeat}>
                <span>SEAT</span>
                <strong>{flight.seat}</strong>
              </div>
            </div>

            <div className={styles.barcode}>
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.barLine}
                  style={{ width: Math.random() > 0.5 ? '2px' : '1px', opacity: Math.random() > 0.15 ? 1 : 0.3 }}
                />
              ))}
            </div>
            <span className={styles.confirmationCode}>{flight.confirmation}</span>
          </div>
        </div>

        {/* Wallet action */}
        <button className={styles.walletBtn} onClick={handleWallet}>
          {addedToWallet ? '✓ Added to Wallet' : '📱 Add to Apple Wallet'}
        </button>

        {/* ---- Promo cards (top/bottom real estate) ---- */}
        <div className={styles.promoRow}>
          <div className={styles.promoCard}>
            <span className={styles.promoIcon}>✨</span>
            <div className={styles.promoText}>
              <span className={styles.promoTitle}>You're 2,400 miles from Gold status</span>
              <span className={styles.promoSub}>Join Meridian Miles to start earning on this flight</span>
            </div>
            <button className={styles.promoBtn}>Join free</button>
          </div>

          <div className={styles.promoCard}>
            <span className={styles.promoIcon}>🏨</span>
            <div className={styles.promoText}>
              <span className={styles.promoTitle}>20% off stays in Dubai</span>
              <span className={styles.promoSub}>Exclusive partner rate with Palm Grove Hotels</span>
            </div>
            <button className={styles.promoBtn}>View deal</button>
          </div>
        </div>
      </div>
    </div>
  )
}