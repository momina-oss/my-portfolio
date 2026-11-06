import { useState, useMemo } from 'react'
import styles from './shop.module.css'

const products = [
  { id: 1, name: 'Cedar & Smoke', category: 'Candles', price: 28, size: '8oz', color: '#8a5a3b', tag: 'Bestseller' },
  { id: 2, name: 'Amber Fields', category: 'Candles', price: 32, size: '10oz', color: '#c98a3e' },
  { id: 3, name: 'Salt Linen', category: 'Candles', price: 24, size: '6oz', color: '#9fb8c9' },
  { id: 4, name: 'Fig & Vetiver', category: 'Candles', price: 34, size: '10oz', color: '#5a6b47', tag: 'New' },
  { id: 5, name: 'Ceramic Matchbox', category: 'Home', price: 18, size: 'Std', color: '#d9c9b8' },
  { id: 6, name: 'Wick Trimmer', category: 'Home', price: 16, size: 'Std', color: '#c4744a' },
  { id: 7, name: 'Oak Wax Warmer', category: 'Home', price: 46, size: 'Std', color: '#7c5c43' },
  { id: 8, name: 'Linen Gift Box', category: 'Gifts', price: 12, size: 'Std', color: '#e4d3c3' },
]

const categories = ['All', 'Candles', 'Home', 'Gifts']

export default function Shop() {
  const [activeCat, setActiveCat] = useState('All')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState(null)

  const filtered = useMemo(() => {
    let list = activeCat === 'All' ? products : products.filter((p) => p.category === activeCat)
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [activeCat, sort])

  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id)
      if (existing) {
        return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...c, { ...product, qty: 1 }]
    })
    setAdded(product.id)
    setTimeout(() => setAdded(null), 900)
  }

  const updateQty = (id, delta) => {
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <div className={styles.page}>
      {/* Nav */}
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>🕯️ Ember &amp; Oak</div>
          <nav className={styles.navLinks}>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Journal</a>
          </nav>
          <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
            🛍️ Cart
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.heroEyebrow}>Hand-poured in small batches</span>
          <h1>Scents that feel like home</h1>
          <p>Soy candles and home goods, made by hand in our Lahore studio.</p>
          <button className={styles.heroBtn} onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}>
            Shop the collection ↓
          </button>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCandle} />
          <div className={styles.heroGlow} />
        </div>
      </section>

      {/* Filters */}
      <div className={styles.toolbar} id="grid">
        <div className={styles.catRow}>
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.catChip} ${activeCat === c ? styles.catChipActive : ''}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <select className={styles.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className={styles.grid}>
        {filtered.map((p) => (
          <div className={styles.card} key={p.id}>
            <div className={styles.cardImage} style={{ background: `linear-gradient(160deg, ${p.color}, #1a1410)` }}>
              {p.tag && <span className={styles.cardTag}>{p.tag}</span>}
              <button
                className={`${styles.quickAdd} ${added === p.id ? styles.quickAddDone : ''}`}
                onClick={() => addToCart(p)}
              >
                {added === p.id ? '✓ Added' : '+ Add to cart'}
              </button>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <span className={styles.cardName}>{p.name}</span>
                <span className={styles.cardPrice}>${p.price}</span>
              </div>
              <span className={styles.cardMeta}>{p.category} · {p.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cart drawer */}
      {cartOpen && <div className={styles.overlay} onClick={() => setCartOpen(false)} />}
      <div className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h3>Your cart ({cartCount})</h3>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <span>🕯️</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className={styles.drawerItems}>
              {cart.map((i) => (
                <div className={styles.drawerItem} key={i.id}>
                  <div className={styles.drawerThumb} style={{ background: i.color }} />
                  <div className={styles.drawerInfo}>
                    <span className={styles.drawerName}>{i.name}</span>
                    <span className={styles.drawerMeta}>{i.size} · ${i.price}</span>
                  </div>
                  <div className={styles.qtyControl}>
                    <button onClick={() => updateQty(i.id, -1)}>−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.drawerFooter}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <p className={styles.shippingNote}>Free shipping over $50</p>
              <button className={styles.checkoutBtn}>Checkout →</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}