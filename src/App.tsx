import { useEffect } from 'react'
import StatueScene from './components/StatueScene'
import Hero from './components/Hero'
import Bio from './components/Bio'
import Infis from './components/Infis'
import Interview from './components/Interview'
import Favorites from './components/Favorites'
import ProgressBar from './components/ProgressBar'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  const progress = useScrollProgress()

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.stage')
    if (!stage) return
    const dim = Math.min(0.7, progress * 0.9)
    stage.style.setProperty('--stage-dim', String(1 - dim * 0.45))
    stage.style.setProperty('--stage-scale', String(1 - progress * 0.12))
  }, [progress])

  return (
    <div className="page">
      <ProgressBar progress={progress} />
      <header className="topbar">
        <a className="brand" href="#top">infis · about</a>
        <span className="topbar-meta">Jan Novák — anglický lektor</span>
      </header>

      <div className="layout" id="top">
        <aside className="stage" aria-hidden="true">
          <div className="stage-glow" />
          <div className="stage-canvas">
            <StatueScene />
          </div>
          <div className="stage-caption">
            <span className="dot" /> rotuj scrollem
          </div>
        </aside>

        <main className="content">
          <Hero />
          <Bio />
          <Infis />
          <Interview />
          <Favorites />
          <footer className="foot">
            <p>
              Zdroje:{' '}
              <a href="https://www.eufrat.cz/jazykove-kurzy/lektori/983-jan-n/" target="_blank" rel="noreferrer">eufrat.cz</a>
              {' · '}
              <a href="https://infis.cz/" target="_blank" rel="noreferrer">infis.cz</a>
            </p>
            <p>About page · infis · {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
