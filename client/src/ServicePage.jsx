import { useState } from 'react'
import { B, STEPS, Reveal, Photo, Header, Footer } from './App.jsx'
import { SERVICE_PAGES } from './services.js'

export default function ServicePage({ page }) {
  const [type, setType] = useState(page.type)
  const tel = `tel:+${B.phone.replace(/\D/g, '')}`
  const others = SERVICE_PAGES.filter((s) => s.slug !== page.slug)
  return (
    <>
      <Header pickType={() => setType(page.type)} base="/" />
      <main id="main">
        <section id="home" className="hero">
          <div className="wrap hero-grid">
            <div>
              <nav aria-label="Breadcrumb" className="crumbs hero-in" style={{ '--i': 0 }}>
                <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">{page.name}</span>
              </nav>
              <h1 className="hero-in" style={{ '--i': 0 }}>{page.h1}</h1>
              <p className="hero-in" style={{ '--i': 1 }}>{page.intro}</p>
              <p className="hero-in cta" style={{ '--i': 2 }}>
                <a className="btn" href="#contact" onClick={() => setType(page.type)}>Request a Quote</a>
                <a className="btn ghost dark" href={tel}>Call {B.name}</a>
              </p>
            </div>
            <Photo image={page.image} label={page.name} alt={page.alt} eager className="tall hero-in" showLabel={false} />
          </div>
        </section>

        <section className="sec sand">
          <Reveal className="wrap two">
            <div>
              <h2>{page.itemsTitle}</h2>
              <ul className="ticks">{page.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="story">
              {page.blocks.map(([h, p]) => <div key={h} className="block"><h3>{h}</h3><p>{p}</p></div>)}
            </div>
          </Reveal>
        </section>

        <section className="sec dark">
          <div className="wrap">
            <Reveal as="h2">How it works</Reveal>
            <Reveal as="ol" className="steps">
              {STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
            </Reveal>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <Reveal as="h2">Questions about {page.name.toLowerCase()}</Reveal>
            <Reveal className="faq">
              {page.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
            </Reveal>
          </div>
        </section>

        <section className="sec sand">
          <div className="wrap">
            <Reveal as="h2">More from {B.name}</Reveal>
            <Reveal as="ul" className="more-links">
              {others.map((s) => <li key={s.slug}><a href={`/${s.slug}`}>{s.name} in {B.city}</a></li>)}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer type={type} setType={setType} base="/" />
    </>
  )
}
