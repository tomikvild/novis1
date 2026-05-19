import { useReveal } from '../hooks/useReveal'

const stats = [
  { k: '~500', v: 'studentů na škole' },
  { k: '4 roky', v: 'maturitní obor IT' },
  { k: 'Bory', v: 'bývalá kasárna, Klatovská 200g' },
  { k: '2024', v: 'rok, kdy Honza přišel učit AJ' },
]

const points = [
  {
    h: 'Angličtina pro IT generaci',
    t: 'Učí studenty, co píšou kód a baví je sítě, kyberbezpečnost nebo grafika. Slovní zásoba i konverzace jsou v hodinách tahané tímhle směrem — od code review po stand-upy.',
  },
  {
    h: 'Konverzace > drilování',
    t: 'V hodinách žije reálný jazyk — situace, který v zahraničí potkáš. Gramatika přijde, ale ve službě tomu, co fakt řekneš.',
  },
  {
    h: 'Dvojí pohled učitele',
    t: 'Učí i informatiku na základce, takže ví, jak technicky uvažující studenti přemýšlejí a kde se v jazyce zaseknou.',
  },
  {
    h: 'Zkušenost z první ruky',
    t: 'Hastings, Korfu, Rhodos, Dubaj — angličtina jako pracovní prostředek, ne školní povinnost. Tohle si přináší do třídy.',
  },
]

export default function Infis() {
  const ref = useReveal<HTMLElement>({ y: 32, staggerMs: 80 })
  return (
    <section className="section infis" ref={ref}>
      <header className="section-head">
        <span className="section-num" data-reveal>02</span>
        <h2 data-reveal>Na infisu</h2>
      </header>
      <p className="lead" data-reveal>
        Honza učí angličtinu na <strong>INFISu</strong> — Střední škole
        informatiky a finančních služeb v Plzni, Klatovská 200g. Škola, kde
        se potkává programování, sítě a finance s humanitními předměty.
      </p>

      <div className="stats">
        {stats.map((s, i) => (
          <div className="stat" key={i} data-reveal>
            <span className="stat-k">{s.k}</span>
            <span className="stat-v">{s.v}</span>
          </div>
        ))}
      </div>

      <div className="points">
        {points.map((p, i) => (
          <article className="point" key={i} data-reveal>
            <h3>{p.h}</h3>
            <p>{p.t}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
