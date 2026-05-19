import { useReveal } from '../hooks/useReveal'

const milestones = [
  { year: '2015', text: 'Cambridge Certificate First — FCE' },
  { year: '2016', text: 'Maturita, Obchodní akademie v Klatovech' },
  { year: '2016', text: 'Měsíční intenzivní kurz v Hastings, UK' },
  { year: '2016', text: 'Pracovní stáž — Rhodos' },
  { year: '2019', text: 'Bc., Česká zemědělská univerzita v Praze' },
  { year: '2023', text: 'Pracovní stáž — Korfu' },
  { year: '23/24', text: 'Pracovní pobyt — Dubaj, SAE' },
  { year: '2024', text: 'V Eufratu — lektor anglického jazyka' },
  { year: 'teď', text: 'Studium Učitelství AJ pro SŠ na MUNI' },
]

export default function Bio() {
  const ref = useReveal<HTMLElement>({ staggerMs: 90 })
  return (
    <section className="section bio" ref={ref}>
      <header className="section-head">
        <span className="section-num" data-reveal>01</span>
        <h2 data-reveal>Cesta jazykem</h2>
      </header>
      <p className="lead" data-reveal>
        Učí angličtinu na základce, dokončuje obor Učitelství anglického
        jazyka pro střední školy. Zkušenosti sbíral od Klatov přes Hastings
        až po Korfu a Dubaj.
      </p>
      <ol className="timeline">
        {milestones.map((m, i) => (
          <li key={i} data-reveal>
            <span className="year">{m.year}</span>
            <span className="line" />
            <span className="text">{m.text}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
