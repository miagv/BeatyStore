import { useEffect } from 'react'

/**
 * Marca los hijos de `ref` con data-reveal y los revela al entrar en viewport.
 * Respeta prefers-reduced-motion (el CSS desactiva la transición).
 */
export function useReveal(ref, { threshold = 0.15, rootMargin = '0px 0px -60px' } = {}) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    targets.forEach((el) => el.setAttribute('data-reveal', 'pending'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = Number(entry.target.dataset.revealDelay ?? 0)
          entry.target.style.setProperty('--reveal-delay', `${delay}ms`)
          entry.target.setAttribute('data-reveal', 'visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])
}
