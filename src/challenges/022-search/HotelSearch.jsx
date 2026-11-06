import { useState, useMemo } from 'react'
import styles from './hotelsearch.module.css'

const allHotels = [
  { id: 1, name: 'Azure Bay Resort', location: 'Clifton, Karachi', price: 145, rating: 4.8, reviews: 342, stars: 5, tags: ['Pool', 'Free Wi-Fi', 'Breakfast'], color: '#37e2ff' },
  { id: 2, name: 'The Continental', location: 'Gulberg, Lahore', price: 98, rating: 4.5, reviews: 218, stars: 4, tags: ['Free Wi-Fi', 'Gym'], color: '#7c6cff' },
  { id: 3, name: 'Marriott Heights', location: 'Blue Area, Islamabad', price: 210, rating: 4.9, reviews: 512, stars: 5, tags: ['Pool', 'Spa', 'Breakfast'], color: '#ff8a5c' },
  { id: 4, name: 'Cedar Inn Boutique', location: 'Bahria Town, Lahore', price: 62, rating: 4.2, reviews: 96, stars: 3, tags: ['Free Wi-Fi', 'Parking'], color: '#4dff88' },
  { id: 5, name: 'Sapphire Suites', location: 'DHA, Karachi', price: 175, rating: 4.7, reviews: 289, stars: 5, tags: ['Pool', 'Gym', 'Free Wi-Fi'], color: '#ff5fa2' },
  { id: 6, name: 'Riverstone Lodge', location: 'F-7, Islamabad', price: 84, rating: 4.3, reviews: 134, stars: 4, tags: ['Breakfast', 'Parking'], color: '#ffb84d' },
]

const amenitiesList = ['Free Wi-Fi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Parking']

export default function HotelSearch() {
  const [location, setLocation] = useState('Karachi, Pakistan')
  const [checkIn, setCheckIn] = useState('2026-10-14')
  const [checkOut, setCheckOut] = useState('2026-10-17')
  const [guests, setGuests] = useState(2)
  const [guestPickerOpen, setGuestPickerOpen] = useState(false)

  const [priceMax, setPriceMax] = useState(250)
  const [minStars, setMinStars] = useState(0)
  const [activeAmenities, setActiveAmenities] = useState([])
  const [sort, setSort] = useState('recommended')
  const [searched, setSearched] = useState(true)

  const toggleAmenity = (a) => {
    setActiveAmenities((list) =>
      list.includes(a) ? list.filter((x) => x !== a) : [...list, a]
    )
  }

  const nights = useMemo(() => {
    const d1 = new Date(checkIn)
    const d2 = new Date(checkOut)
    return Math.max(1, Math.round((d2 - d1) / 86400000))
  }, [checkIn, checkOut])

  const filtered = useMemo(() => {
    let list = allHotels.filter(
      (h) =>
        h.price <= priceMax &&
        h.stars >= minStars &&
        activeAmenities.every((a) => h.tags.includes(a))
    )
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [priceMax, minStars, activeAmenities, sort])

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        {/* Search bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchField}>
            <span className={styles.fieldLabel}>Where</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or hotel"
            />
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <span className={styles.fieldLabel}>Check in</span>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <span className={styles.fieldLabel}>Check out</span>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField} style={{ position: 'relative' }}>
            <span className={styles.fieldLabel}>Guests</span>
            <button className={styles.guestBtn} onClick={() => setGuestPickerOpen((o) => !o)}>
              {guests} guest{guests > 1 ? 's' : ''}
            </button>
            {guestPickerOpen && (
              <div className={styles.guestPopover}>
                <div className={styles.guestRow}>
                  <span>Guests</span>
                  <div className={styles.stepper}>
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
                    <span>{guests}</span>
                    <button onClick={() => setGuests((g) => Math.min(8, g + 1))}>+</button>
                  </div>
                </div>
                <button className={styles.popoverDone} onClick={() => setGuestPickerOpen(false)}>Done</button>
              </div>
            )}
          </div>
          <button className={styles.searchBtn} onClick={() => setSearched(true)}>
            🔍 Search
          </button>
        </div>

        <div className={styles.resultsHeader}>
          <div>
            <h1>{filtered.length} stays in {location.split(',')[0]}</h1>
            <p className={styles.resultsSub}>
              {new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''}
            </p>
          </div>
          <select className={styles.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className={styles.layout}>
          {/* Filters sidebar */}
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <span>Max price / night</span>
                <span className={styles.filterValue}>${priceMax}</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="5"
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className={styles.slider}
              />
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><span>Star rating</span></div>
              <div className={styles.starRow}>
                {[0, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    className={`${styles.starChip} ${minStars === s ? styles.starChipActive : ''}`}
                    onClick={() => setMinStars(s)}
                  >
                    {s === 0 ? 'Any' : `${s}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><span>Amenities</span></div>
              <div className={styles.amenityList}>
                {amenitiesList.map((a) => (
                  <label className={styles.amenityRow} key={a}>
                    <input
                      type="checkbox"
                      checked={activeAmenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                    />
                    <span className={styles.checkbox} />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results list */}
          <div className={styles.results}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <span>🔍</span>
                <p>No stays match your filters.</p>
                <button onClick={() => { setPriceMax(250); setMinStars(0); setActiveAmenities([]) }}>
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((h) => (
                <div className={styles.resultCard} key={h.id}>
                  <div className={styles.resultImage} style={{ background: `linear-gradient(160deg, ${h.color}, #12121c)` }} />
                  <div className={styles.resultBody}>
                    <div className={styles.resultTop}>
                      <div>
                        <span className={styles.resultStars}>{'★'.repeat(h.stars)}</span>
                        <h3>{h.name}</h3>
                        <span className={styles.resultLocation}>📍 {h.location}</span>
                      </div>
                      <div className={styles.ratingBadge}>
                        <span className={styles.ratingScore}>{h.rating}</span>
                        <span className={styles.ratingReviews}>{h.reviews} reviews</span>
                      </div>
                    </div>
                    <div className={styles.tagRow}>
                      {h.tags.map((t) => (
                        <span className={styles.tag} key={t}>{t}</span>
                      ))}
                    </div>
                    <div className={styles.resultBottom}>
                      <div className={styles.priceBlock}>
                        <span className={styles.priceValue}>${h.price}</span>
                        <span className={styles.priceUnit}>/ night · ${h.price * nights} total</span>
                      </div>
                      <button className={styles.viewBtn}>View deal →</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}