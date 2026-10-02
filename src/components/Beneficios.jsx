import { useRef } from 'react'
import { benefits } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Beneficios() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="beneficios" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Por qué comprarnos"
          title="Belleza que llega bien"
          text="Cuidamos cada detalle desde el container de Seúl hasta tu baño: producto real, precios sin intermediarios y una persona real respondiendo."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <li
              key={benefit.title}
              data-reveal
              data-reveal-delay={i * 90}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface-raised/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-blush-300 hover:shadow-soft dark:hover:border-blush-600"
            >
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 size-32 rounded-full bg-accent-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-accent text-accent-contrast">
                <Icon name={benefit.icon} className="size-6" />
              </span>
              <h3 className="relative mt-6 text-lg font-semibold text-body">{benefit.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">{benefit.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
