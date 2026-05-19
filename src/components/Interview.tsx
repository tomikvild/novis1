import { useReveal } from '../hooks/useReveal'

const qa = [
  {
    q: 'Co tě přivedlo do Eufratu?',
    a: 'Parádní prostory, flexibilita a kvalita.',
  },
  {
    q: 'Co u tebe ve výuce frčí?',
    a: 'Metody zaměřené na potřeby studentů — moderní i ty tradičnější.',
  },
  {
    q: 'Na co se mohou studenti těšit?',
    a: 'Na fajn konverzace a zajímavá témata, kde se naučíš to, co reálná komunikace v cizím jazyce vyžaduje — gramatiku, slovíčka, všechno.',
  },
  {
    q: 'V čem spočívá poslání lektora?',
    a: '„Předat studentům to, co jsem se naučil, tak, aby si sami řekli: Jo, dal jsem to, jsem dobrej.“',
  },
  {
    q: 'Jak bys popsal svoje studenty?',
    a: 'Mají tzv. tah na bránu. Jdou si za poznáním a nebojí se nových věcí.',
  },
  {
    q: 'Co si mají z tvých hodin odnést?',
    a: 'Kladný vztah k jazyku a přesvědčení, že když budou chtít, můžou být profíci v čemkoliv.',
  },
  {
    q: 'Vzkaz budoucím studentům?',
    a: 'Už to, že chcete, je polovina úspěchu. Dejte tomu čas a za chvíli budete jedničky.',
  },
]

export default function Interview() {
  const ref = useReveal<HTMLElement>({ y: 40, staggerMs: 110 })
  return (
    <section className="section interview" ref={ref}>
      <header className="section-head">
        <span className="section-num" data-reveal>03</span>
        <h2 data-reveal>Rozhovor</h2>
      </header>
      <div className="qa-list">
        {qa.map((item, i) => (
          <article className="qa" key={i} data-reveal>
            <p className="q">{item.q}</p>
            <p className="a">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
