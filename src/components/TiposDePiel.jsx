import { useRef } from 'react'
import { skinTypes } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function TiposDePiel() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="tipos-de-piel" className="relative py-16 lg:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tipos de piel"
          title="¿Cuál es la tuya?"
          text="Antes de elegir un producto, conviene saber qué necesita tu piel. Estas son las cinco que más vemos, con lo que funciona en cada una."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {skinTypes.map((type, i) => (
            <li
              key={type.id}
              data-reveal
              data-reveal-delay={i * 80}
              className="group flex flex-col rounded-3xl border border-line bg-surface-raised/75 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blush-300 hover:shadow-soft dark:hover:border-blush-600"
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon name={type.icon} className="size-5" />
              </span>

              <h3 className="mt-5 text-lg font-semibold text-body">{type.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{type.text}</p>

              <div className="mt-4 border-t border-line pt-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                  Qué usar
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{type.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
