import { useEffect, useRef, useState } from 'react'
import livingRoom from '../Assets/living-room.webp'
import bedroom from '../Assets/bedroom.webp'
import mandir from '../Assets/mandir.webp'
import kitchen from '../Assets/kitchen.webp'
import diningTables from '../Assets/dining-tables.webp'
import officeFurniture from '../Assets/office-furniture.webp'
import wardrobe from '../Assets/wardrobe.webp'
import heroImg from '../Assets/hero-img.webp'
import sample1 from '../Assets/Sample 1.jpg'
import sample2 from '../Assets/Sample 2.jpg'
import sample3 from '../Assets/Sample 3.jpg'
import sample4 from '../Assets/Sample 4.jpg'
import sample5 from '../Assets/Sample 5.jpg'

// Edit these. Leave phone/email empty until confirmed; buttons stay inactive until set.
// Phone: digits with country code, e.g. "919876543210".
const B = { name: 'Gurukrupa Furniture', city: 'Vadodara', phone: '919724516312', email: 'mohinanirishi7@gmail.com', address: 'Shop no.10, Kubereshwar Compund nr Vasvani Estate, suvez Pumping road, Road, Gajarawadi, Vadodara, Gujarat 390004', hours: 'Monday to Saturday 9:00 AM to 6:00 PM (Sunday Closed)' }
const digits = B.phone.replace(/\D/g, '')
const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const TYPES = ['Retail furniture', 'Custom home furnishing', 'Bulk / mass production', 'Other']

const NAV = [['home', 'Home'], ['furniture', 'Furniture'], ['custom', 'Custom Orders'], ['manufacturing', 'Manufacturing'], ['about', 'About'], ['contact', 'Contact']]
const SERVICES = [
  ['Retail furniture orders', 'Buy finished pieces for your home or shop. [ADD RANGE AND HOW TO ORDER]', 'Retail furniture', 'Ask about a piece'],
  ['Custom home furnishing', 'Tell us the room and the style you want, and we will discuss what can be made.', 'Custom home furnishing', 'Plan my home'],
  ['Bulk and mass production', 'Orders for retailers, designers, contractors and hospitality businesses, made in our factory.', 'Bulk / mass production', 'Request a bulk quote'],
]
const CATEGORIES = ['Beds', 'Sofas and seating', 'Dining tables and chairs', 'Wardrobes and storage', 'Office furniture', 'Mandir']
const STEPS = [['Enquiry', 'You tell us what you need.'], ['Specifications', 'We confirm sizes, materials and finishes.'], ['Production', 'Your order is made in our factory.'], ['Delivery or pickup', '[ADD DELIVERY DETAILS]']]
const HELP = ['Room type', 'Approximate dimensions', 'Preferred style', 'Reference photos or links']

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

const Photo = ({ label, className = '', showLabel = true, image: imageOverride, eager = false, alt }) => {
  const image = imageOverride || (
    /furniture or workshop/i.test(label)
      ? heroImg
      : /mandir|pooja/i.test(label)
        ? mandir
        : /kitchen/i.test(label)
          ? kitchen
          : /wardrobe|storage/i.test(label)
            ? wardrobe
            : /dining|table/i.test(label)
              ? diningTables
              : /office/i.test(label)
                ? officeFurniture
                : /bed/i.test(label)
                  ? bedroom
                  : livingRoom
  )

  return (
    <div className={`photo ${className}`}>
      <img
        src={image}
        alt={alt || label}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {showLabel && (
        <span className="photo-label" style={{ position: 'relative', zIndex: 1 }}>
          {label}
        </span>
      )}
    </div>
  )
}
function Header({ pickType }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('keydown', k) }
  }, [])
  return (
    <header className={`header ${scrolled ? 'solid' : ''}`}>
      <a className="skip" href="#main">Skip to content</a>
      <a className="brand" href="#home">{B.name}</a>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={open ? 'open' : ''} aria-label="Main">
        {NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="btn" href="#contact" onClick={() => { pickType(''); setOpen(false) }}>Request a Quote</a>
      </nav>
    </header>
  )
}

// Defined at module level so its identity is stable across renders;
// defining it inside Footer remounted the input on every keystroke and dropped focus.
function Field({ k, label, err, ...p }) {
  return (
    <label className="field">{label}
      <input aria-invalid={!!err} aria-describedby={err ? `${k}-e` : undefined} {...p} />
      {err && <span className="err" id={`${k}-e`}>{err}</span>}
    </label>
  )
}

function Footer({ type, setType }) {
  const empty = { name: '', phone: '', email: '', location: '', message: '', referenceLink: '', hpField: '' }
  const [f, setF] = useState(empty)
  const [errs, setErrs] = useState({})
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setStatus('sending'); setErrs({})
    try {
      const r = await fetch(`${apiBaseUrl}/api/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, type }) })
      const d = await r.json().catch(() => ({}))
      if (r.ok) { setStatus('success'); setF(empty); window.gtag?.('event', 'generate_lead', { enquiry_type: type }); return }
      setErrs(d.errors || {}); setStatus(d.errors ? 'idle' : 'error')
    } catch { setStatus('error') }
  }
  const tel = digits ? `tel:+${digits}` : undefined
  const wa = digits ? `https://wa.me/${digits}` : undefined
  const fieldProps = (k) => ({ k, value: f[k], onChange: set(k) })
  return (
    <footer id="contact" className="footer">
      <div className="wrap foot-grid">
        <Reveal>
          <h2>Request a quote</h2>
          <p>Tell us what you need and we will get back to you. Phone and WhatsApp are quickest.</p>
          <div className="actions">
            <a className="btn light" href={tel} aria-disabled={!tel}>{tel ? 'Call us' : '[ADD PHONE NUMBER]'}</a>
            <a className="btn ghost" href={wa} aria-disabled={!wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <address>
            {B.email ? <a href={`mailto:${B.email}`}>{B.email}</a> : <span>[ADD EMAIL]</span>}<br />
            {B.address}<br />{B.hours}
          </address>
        </Reveal>
        <form onSubmit={submit} noValidate aria-label="Request a quote">
          <Field {...fieldProps('name')} label="Your name" err={errs.name} required autoComplete="name" />
          <Field {...fieldProps('phone')} label="Phone" err={errs.contact} type="tel" autoComplete="tel" />
          <Field {...fieldProps('email')} label="Email" err={errs.email} type="email" autoComplete="email" />
          <label className="field">Enquiry type
            <select value={type} onChange={(e) => setType(e.target.value)} aria-invalid={!!errs.type}>
              <option value="">Choose one</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            {errs.type && <span className="err">{errs.type}</span>}
          </label>
          <Field {...fieldProps('location')} label="Your location" autoComplete="address-level2" />
          <label className="field">Message
            <textarea rows="4" value={f.message} onChange={set('message')} maxLength="2000" />
          </label>
          <Field {...fieldProps('referenceLink')} label="Reference photo link (optional)" err={errs.referenceLink} type="url" />
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.hpField} onChange={set('hpField')} name="hpField" />
          <button className="btn light" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
          <div role="status" aria-live="polite">
            {status === 'success' && <p className="ok">Thank you. We have your enquiry and will contact you soon.</p>}
            {status === 'error' && <p className="err">We could not send this. Please call or email us instead.</p>}
          </div>
        </form>
      </div>
      <p className="wrap legal">© {new Date().getFullYear()} {B.name}. {NAV.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</p>
    </footer>
  )
}

export default function App() {
  const [type, setType] = useState('')
  return (
    <>
      <Header pickType={setType} />
      <main id="main">
        <section id="home" className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1 className="hero-in" style={{ '--i': 0 }}>{B.name}: furniture made in our own factory in {B.city}</h1>
              <p className="hero-in" style={{ '--i': 1 }}>Based in Vadodara, Gurukrupa Furniture manufactures furniture for homes and businesses.
                We create custom home furnishings, supply retail pieces, and handle bulk production—working with homeowners and interior designers
                to bring considered spaces to life.</p>
              <p className="hero-in cta" style={{ '--i': 2 }}>
                <a className="btn" href="#contact" onClick={() => setType('')}>Request a Quote</a>
                <a className="btn ghost dark" href="#gallery">Explore Our Work</a>
              </p>
            </div>
            <Photo
              label="Furniture or workshop photo"
              alt={`Furniture made by ${B.name} in ${B.city}`}
              eager
              className="tall hero-in"
              showLabel={false}
            />
          </div>
        </section>

        <section id="services" className="sec">
          <div className="wrap">
            <Reveal as="h2">Who we make furniture for</Reveal>
            <div className="services">
              {SERVICES.map(([t, d, ty, cta], i) => (
                <Reveal as="article" key={t} className={`svc s${i}`}>
                  <h3>{t}</h3><p>{d}</p>
                  <a className="btn ghost dark" href="#contact" onClick={() => setType(ty)}>{cta}</a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="furniture" className="sec sand">
          <div className="wrap">
            <Reveal as="h2">Furniture we make</Reveal>
            <Reveal as="p" className="lead">Edit this list to match your actual range. Add sizes, materials and finishes only once confirmed.</Reveal>
            <Reveal className="cats">{CATEGORIES.map((c) => <Photo key={c} label={c} />)}</Reveal>
          </div>
        </section>

        <section id="custom" className="sec">
          <Reveal className="wrap two">
            <div>
              <h2>Custom home furnishing</h2>
              <p>Furnishing a room or a whole home? Send us the details and we will talk through what can be made for you.</p>
              <a className="btn" href="#contact" onClick={() => setType('Custom home furnishing')}>Start a custom enquiry</a>
            </div>
            <div>
              <h3>Helpful to share</h3>
              <ul className="ticks">{HELP.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          </Reveal>
        </section>

        <section id="manufacturing" className="sec dark">
          <div className="wrap">
            <Reveal as="h2">Made in our factory</Reveal>
            <Reveal as="p" className="lead">We make our own furniture, which lets us take on larger orders as well as single pieces. [ADD FACTORY DETAILS]</Reveal>
            <Reveal as="ol" className="steps">
              {STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
            </Reveal>
          </div>
        </section>

        <section id="about" className="sec">
          <Reveal className="wrap two">
            <h2>About our family business</h2>
            <div><p>[ADD FAMILY AND BUSINESS STORY: who started it, how it grew, what you care about when making furniture.]</p></div>
          </Reveal>
        </section>

        <section id="gallery" className="sec sand">
          <div className="wrap">
            <Reveal as="h2">Selected work</Reveal>
            <Reveal as="p" className="lead">These are sample images. Replace them with photos of your own work.</Reveal>
            <Reveal className="gallery">
              {[
                ['Sample 1', sample1],
                ['Sample 2', sample2],
                ['Sample 3', sample3],
                ['Sample 4', sample4],
                ['Sample 5', sample5],
              ].map(([label, image]) => <Photo key={label} label={label} image={image} />)}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer type={type} setType={setType} />
    </>
  )
}
