import { useEffect, useRef, useState } from 'react'
import livingRoom from '../Assets/living-room.webp'
import bedroom from '../Assets/bedroom.webp'
import mandir from '../Assets/mandir.webp'
import kitchen from '../Assets/kitchen.webp'
import diningTables from '../Assets/dining-tables.webp'
import officeFurniture from '../Assets/office-furniture.webp'
import wardrobe from '../Assets/wardrobe.webp'
import heroImg from '../Assets/hero-img.webp'
import tvCabinet from '../Assets/TV-Cabinet.webp'
import sofaSet from '../Assets/Sofa-set.webp'
import bedroomDesign from '../Assets/Bedroom-design.webp'
import kitchenDesign from '../Assets/kitchen-design.webp'
import mandirDesign from '../Assets/mandir-design.webp'
import { SERVICE_PAGES } from './services.js'

// Edit these. Leave phone/email empty until confirmed; buttons stay inactive until set.
// Phone: digits with country code, e.g. "919876543210".
export const B = { name: 'Gurukrupa Furniture', city: 'Vadodara', phone: '919724516312', email: 'mohinanirishi7@gmail.com', address: 'Shop No. 10, Kubereshwar Compound, near Vasvani Estate, Suvez Pumping Road, Gajarawadi, Vadodara, Gujarat 390004', hours: 'Monday to Saturday 9:00 AM to 6:00 PM (Sunday Closed)' }
const digits = B.phone.replace(/\D/g, '')
const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const TYPES = ['Retail furniture', 'Custom home furnishing', 'Bulk / mass production', 'Other']

const NAV = [['home', 'Home'], ['furniture', 'Furniture'], ['custom', 'Custom Orders'], ['manufacturing', 'Manufacturing'], ['about', 'About'], ['contact', 'Contact']]
const SERVICES = [
  ['Retail furniture orders', 'Buy furniture for your home, or order a single piece made to suit your needs. We make centre tables, dressing tables, wardrobes, kitchen furniture, sofas, computer tables, TV cabinets, dining tables and more. Contact us to discuss your design, size and requirements.', 'Retail furniture', 'Ask about a piece'],
  ['Custom home furnishing', 'Tell us the room and the style you want, and we will discuss what can be made.', 'Custom home furnishing', 'Plan my home'],
  ['Bulk and mass production', 'Orders for retailers, designers, contractors and hospitality businesses, made in our factory.', 'Bulk / mass production', 'Request a bulk quote'],
]
// [label, service page slug]
const CATEGORIES = [['Beds', 'custom-furniture-vadodara'], ['Sofas and seating', 'custom-furniture-vadodara'], ['Dining tables and chairs', 'custom-furniture-vadodara'], ['Wardrobes and storage', 'wardrobes-vadodara'], ['Office furniture', 'office-furniture-vadodara'], ['Mandir', 'mandir-design-vadodara']]
export const STEPS = [
  ['Enquiry', 'Tell us everything you need. We start with a visit to your site to see the space.'],
  ['Specifications', 'We go through what you need: sizes, finishes, requirements and your preferences.'],
  ['Production', 'Work is done on site, with some pieces made in our factory. We provide the materials and workers, taking your order from scratch to a ready product.'], ['Delivery or pickup', 'We deliver across Vadodara and all over Gujarat, or you can pick up your order from our factory. Best-quality home furnishing at affordable prices.']]
const HELP = ['Room type', 'Approximate dimensions', 'Preferred style', 'Reference photos or links']
// Shown on the page and, via scripts/prerender.mjs, as FAQPage data for Google. Keep answers factual.
export const FAQ = [
  ['Do you deliver outside Vadodara?', 'Yes. We deliver across Vadodara and all over Gujarat. You can also pick up your order from our factory.'],
  ['Do you visit the site before starting work?', 'Yes. Every project starts with a visit to your site so we can see the space and understand what you need.'],
  ['Can you make furniture to my size and design?', 'Yes. We make furniture to your dimensions, finishes and preferences, from a single piece to a complete home or office.'],
  ['Do you provide the materials and workers?', 'Yes. We provide the materials and workers and take your order from scratch to a ready product. Work is done on site, with some pieces made in our factory.'],
  ['Do you take bulk orders?', 'Yes. We handle bulk and mass production for homes, offices, industrial spaces, retailers, designers and contractors.'],
  ['How do I get a quote?', 'Call or WhatsApp us on +91 97245 16312, or send an enquiry through the form on this page. We are open Monday to Saturday, 9:00 AM to 6:00 PM.'],
]

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
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

export const Photo = ({ label, className = '', showLabel = true, image: imageOverride, eager = false, alt }) => {
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
export function Header({ pickType, base = '' }) {
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
      <a className="brand" href={`${base}#home`}>{B.name}</a>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={open ? 'open' : ''} aria-label="Main">
        {NAV.map(([id, l]) => <a key={id} href={id === 'contact' ? '#contact' : `${base}#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
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

export function Footer({ type, setType, base = '' }) {
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
      <nav className="wrap foot-services" aria-label="Our services">
        <h2>Our services in {B.city}</h2>
        <ul>{SERVICE_PAGES.map((s) => <li key={s.slug}><a href={`/${s.slug}`}>{s.name}</a></li>)}</ul>
      </nav>
      <p className="wrap legal">© {new Date().getFullYear()} {B.name}. {NAV.map(([id, l]) => <a key={id} href={id === 'contact' ? '#contact' : `${base}#${id}`}>{l}</a>)}</p>
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
                <a className="btn ghost dark" href="#gallery">See Design Ideas</a>
              </p>
            </div>
            <Photo
              label="Furniture or workshop photo"
              alt="Living and dining room design with a wooden dining table, upholstered chairs and lit display shelves"
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
            <Reveal as="p" className="lead">From home and office furniture to complete interior furnishing, we create pieces in a range of sizes and designs. Explore our furniture categories, or talk to us about interior design, industrial furnishing and bulk orders. Share your requirements and we’ll discuss a design and solution for your space.</Reveal>
            <Reveal className="cats">{CATEGORIES.map(([c, slug]) => <a key={c} className="cat-link" href={`/${slug}`}><Photo label={c} /></a>)}</Reveal>
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
            <Reveal as="p" className="lead">Based in Vadodara, Gurukrupa Furniture makes custom furniture and furnishings for homes, offices and industrial spaces. We handle individual pieces as well as bulk orders. Share your design, dimensions and quantity, and we’ll discuss the specifications and production for your project.</Reveal>
            <Reveal as="ol" className="steps">
              {STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
            </Reveal>
          </div>
        </section>

        <section id="about" className="sec">
          <Reveal className="wrap two">
            <h2>About {B.name}</h2>
            <div className="story">
              <p>{B.name}’s story began in the 1990s in Vadodara. Known to generations of local customers as “Ram Bhai Tipoi Wala,” our business built its legacy around table tops and furniture. With more than 30 years of experience, we have grown to offer home design, custom furniture and interior design services in Vadodara.</p>
              <p>Today, we help customers furnish their homes with designs tailored to their spaces and requirements. From individual furniture pieces to customised interiors, we bring decades of local experience to every project.</p>
            </div>
          </Reveal>
        </section>

        <section id="gallery" className="sec sand">
          <div className="wrap">
            <Reveal as="h2">Design ideas we can make for you</Reveal>
            <Reveal as="p" className="lead">Looking for inspiration? These are the kinds of designs we can make to fit your space. Like one of them, or have a photo of your own? Share it with us and we will discuss making it for your home.</Reveal>
            <Reveal className="gallery">
              {/* Inspiration images, not photos of our completed projects. Keep labels descriptive, not "made by us". */}
              {[
                ['TV unit with lit display shelves', tvCabinet, 'Wall-mounted TV unit design with fluted wood panelling, a marble-finish back panel, lit display shelves and a drawer console'],
                ['L-shaped sofa set', sofaSet, 'Living room design with a grey L-shaped sofa, round wooden coffee table and panelled wall'],
                ['Bedroom with upholstered headboard', bedroomDesign, 'Bedroom design with an upholstered headboard, fluted wall panel, backlit wall art, side tables and a full-length mirror'],
                ['L-shaped kitchen', kitchenDesign, 'L-shaped kitchen design with glossy cabinets, glass-front overhead units and a built-in microwave unit'],
                ['Pooja room with backlit Om panel', mandirDesign, 'Pooja room design with wood-finish side panels, a backlit Om jali panel and a cabinet with drawers below'],
              ].map(([label, image, alt]) => <Photo key={label} label={label} image={image} alt={alt} />)}
            </Reveal>
          </div>
        </section>

        <section id="faq" className="sec">
          <div className="wrap">
            <Reveal as="h2">Frequently asked questions</Reveal>
            <Reveal className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer type={type} setType={setType} />
    </>
  )
}
