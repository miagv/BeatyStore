import { useRef } from 'react'
import { about } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function SobreNosotros() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="nosotros" className="relative overflow-hidden py-16 lg:py-20">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div data-reveal className="relative">
          <img
            src="/productos/nosotros-foto.jpg"
            alt="Fotografía de la colección de skincare coreano de Beauty Store"
            loading="lazy"
            decoding="async"
            className="aspect-3/4 w-full rounded-4xl object-cover shadow-soft"
          />
          <img
            src="/productos/nosotros-detalle.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute -right-3 -bottom-6 size-28 rounded-full border-4 border-surface object-cover shadow-soft sm:-right-6 sm:size-36"
          />
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow={about.eyebrow}
            title={about.title}
            text={about.text}
          />

          <ul className="mt-8 flex flex-col gap-5">
            {about.points.map((point) => (
              <li key={point.title} data-reveal className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-contrast">
                  <Icon name={point.icon} className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-body">{point.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
