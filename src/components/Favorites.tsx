import { useReveal } from '../hooks/useReveal'

const favs = [
  { label: 'Kniha', value: '„It shouldn’t happen to a vet“ — James Herriot' },
  { label: 'Film', value: 'The Man in the Iron Mask (1998)' },
  { label: 'Hudba', value: 'KALEO' },
  { label: 'Moře / hory', value: 'Hory' },
  { label: 'Léto / zima', value: 'Léto' },
  { label: 'Oblíbená destinace', value: 'Skotsko a Korfu' },
  { label: 'Nejexotičtější destinace', value: 'Omán' },
  { label: 'Chce navštívit', value: 'Brazílie' },
]

const tone = ['v Eufratu', 've firmě', 'on-line']

export default function Favorites() {
  const ref = useReveal<HTMLElement>({ y: 28, staggerMs: 55 })
  return (
    <section className="section favorites" ref={ref}>
      <header className="section-head">
        <span className="section-num" data-reveal>04</span>
        <h2 data-reveal>Mimo třídu</h2>
      </header>
      <div className="fav-grid">
        {favs.map((f, i) => (
          <div className="fav-card" key={i} data-reveal>
            <span className="fav-label">{f.label}</span>
            <span className="fav-value">{f.value}</span>
          </div>
        ))}
      </div>
      <div className="modes">
        <span data-reveal>Vyučuje:</span>
        {tone.map((t) => (
          <span className="chip" key={t} data-reveal>{t}</span>
        ))}
      </div>
      <figure className="quote" data-reveal>
        <blockquote>
          Mohu jen doporučit! Jsem velice spokojená. :)
        </blockquote>
        <figcaption>— Marie S., hodnocení na Eufrat.cz</figcaption>
      </figure>
    </section>
  )
}
