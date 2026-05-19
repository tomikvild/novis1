import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!root.current) return
    const tl = [
      animate('.hero-eyebrow', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        ease: 'out(3)',
        delay: 200,
      }),
      animate('.hero-name .char', {
        opacity: [0, 1],
        translateY: [80, 0],
        rotate: [-8, 0],
        duration: 1100,
        ease: 'out(4)',
        delay: stagger(45, { start: 350 }),
      }),
      animate('.hero-role', {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
        ease: 'out(3)',
        delay: 1100,
      }),
      animate('.hero-tags li', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: stagger(80, { start: 1300 }),
        ease: 'out(3)',
      }),
      animate('.hero-hint', {
        opacity: [0, 0.7],
        translateY: [10, 0],
        duration: 900,
        delay: 1700,
        ease: 'out(3)',
      }),
      animate('.hero-hint .arrow', {
        translateY: [0, 10, 0],
        duration: 1600,
        loop: true,
        ease: 'inOut(2)',
        delay: 2200,
      }),
    ]
    return () => tl.forEach((a) => a.pause())
  }, [])

  const name = 'Jan Novák'
  return (
    <section className="hero" ref={root}>
      <p className="hero-eyebrow">
        <span className="dot" /> About — anglický lektor na infisu
      </p>
      <h1 className="hero-name" aria-label={name}>
        {name.split('').map((c, i) => (
          <span className="char" key={i} aria-hidden="true">
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </h1>
      <p className="hero-role">
        Učí angličtinu od dětí po dospělé. V Eufratu od roku 2024,
        na infisu od stejného roku. Hory, Skotsko, Korfu.
      </p>
      <ul className="hero-tags">
        <li>FCE Cambridge</li>
        <li>Hastings · Korfu · Dubaj</li>
        <li>Učitelství AJ — MUNI</li>
      </ul>
      <div className="hero-hint">
        scrolluj a uvidíš<span className="arrow">↓</span>
      </div>
    </section>
  )
}
