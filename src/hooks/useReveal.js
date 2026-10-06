import { useLayoutEffect } from 'react'

/**
 * Marca los elementos con data-reveal de `ref` como `pending` y los revela al
 * entrar en viewport. Los que no llegue a procesar quedan visibles sin
 * animación (el CSS solo oculta el estado `pending`).
 * Respeta prefers-reduced-motion (el CSS desactiva la transición).
 */
export function useReveal(ref, { threshold = 0.15, rootMargin = '0px 0px -60px' } = {}) {
  useLayoutEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = [...container.querySelectorAll('[data-reveal]')]
    if (container.hasAttribute('data-reveal')) targets.unshift(container)
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
