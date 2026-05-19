import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

type Options = {
  selector?: string
  y?: number
  duration?: number
  delay?: number
  staggerMs?: number
  once?: boolean
}

export function useReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null)
  const {
    selector = '[data-reveal]',
    y = 36,
    duration = 900,
    delay = 0,
    staggerMs = 70,
    once = true,
  } = opts

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return

    targets.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = `translateY(${y}px)`
      el.style.willChange = 'transform, opacity'
    })

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        animate(visible.map((e) => e.target as HTMLElement), {
          opacity: [0, 1],
          translateY: [y, 0],
          duration,
          delay: stagger(staggerMs, { start: delay }),
          ease: 'out(3)',
        })
        if (once) visible.forEach((e) => io.unobserve(e.target))
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector, y, duration, delay, staggerMs, once])

  return ref
}
