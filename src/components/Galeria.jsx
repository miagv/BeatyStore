import { useCallback, useEffect, useRef, useState } from 'react'
import { galleryImages, marqueeImages } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function Marquee() {
  // La lista se duplica para que el translateX(-50%) de `animate-marquee`
  // reinicie exactamente sobre la copia y el bucle no se note.
  // El separador va como padding de cada figura, no como `gap` del contenedor:
  // con gap el -50% no cae justo y el bucle da un salto de medio gap.
  const track = [...marqueeImages, ...marqueeImages]

  return (
    <div className="relative overflow-hidden">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {track.map((image, i) => (
          <figure
            key={`${image.src}-${i}`}
            aria-hidden={i >= marqueeImages.length}
            className="relative h-64 w-80 shrink-0 pr-4 sm:h-72 sm:w-[26rem]"
          >
            <div className="size-full overflow-hidden rounded-3xl">
              <img
                src={image.src}
                alt={i < marqueeImages.length ? image.alt : ''}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </figure>
        ))}
      </div>

      {/* Difuminado en los bordes para que la fila no se corte de golpe. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent sm:w-28"
      />
    </div>
  )
}

function SnapCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let best = Infinity
    Array.from(track.children).forEach((child, i) => {
      const mid = child.offsetLeft + child.offsetWidth / 2
      const distance = Math.abs(mid - center)
      if (distance < best) {
        best = distance
        closest = i
      }
    })
    setActive(closest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    syncActive()
    track.addEventListener('scroll', syncActive, { passive: true })
    return () => track.removeEventListener('scroll', syncActive)
  }, [syncActive])

  const scrollTo = (index) => {
    const track = trackRef.current
    if (!track) return
    const child = track.children[index]
    if (!child) return
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {galleryImages.map((image, i) => (
          <li
            key={image.src}
            data-reveal
            data-reveal-delay={i * 70}
            className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-[31%]"
          >
            <figure className="overflow-hidden rounded-3xl border border-line bg-surface-raised/70">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="aspect-3/4 w-full object-cover sm:aspect-4/5"
              />
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollTo((active - 1 + galleryImages.length) % galleryImages.length)}
          aria-label="Foto anterior"
          className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised text-body transition-colors hover:border-accent hover:text-accent"
        >
          <Icon name="arrow" className="size-4 rotate-180" />
        </button>

        <ul className="flex items-center gap-2">
          {galleryImages.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                aria-current={active === i}
                className={`block h-2 rounded-full transition-all duration-300 ${
                  active === i ? 'w-7 bg-accent' : 'w-2 bg-blush-300 hover:bg-accent/60 dark:bg-blush-700'
                }`}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollTo((active + 1) % galleryImages.length)}
          aria-label="Foto siguiente"
          className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised text-body transition-colors hover:border-accent hover:text-accent"
        >
          <Icon name="arrow" className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default function Galeria() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="galeria" className="relative overflow-hidden py-16 lg:py-20">
      <div ref={ref}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Galería"
            title="Así se ven los favoritos"
            text="Una mirada rápida a la rutina que armamos una y otra vez."
          />
        </div>

        <div className="mt-12">
          <Marquee />
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
          <SnapCarousel />
        </div>
      </div>
    </section>
  )
}