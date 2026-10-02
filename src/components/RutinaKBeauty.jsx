import { useRef } from 'react'
import { routine } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function RutinaKBeauty() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="rutina" className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 size-140 -translate-x-1/2 rounded-full bg-blush-200/40 blur-3xl dark:bg-blush-800/20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Método"
          title="La rutina coreana en 5 pasos"
          text="El orden importa más que la cantidad. Si mantenés estos cinco todos los días, notás la diferencia en un mes."
        />

        <ol ref={ref} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {routine.map((step, i) => (
            <li
              key={step.step}
              data-reveal
              data-reveal-delay={i * 90}
              className="group relative flex flex-col rounded-3xl border border-line bg-surface-raised/75 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blush-300 hover:shadow-soft dark:hover:border-blush-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-accent/25 transition-colors duration-300 group-hover:text-accent/50">
                  {step.step}
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold tracking-wider text-accent">
                  {step.period}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-body">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.text}</p>

              {i < routine.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-2.5 hidden -translate-y-1/2 text-blush-400 lg:block"
                >
                  <Icon name="arrow" className="size-4" />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div
          data-reveal
          className="mt-10 flex flex-col gap-4 rounded-3xl border border-blush-200 bg-blush-50 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8 dark:border-blush-800 dark:bg-blush-900/40"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-contrast">
            <Icon name="drop" className="size-5" />
          </span>
          <p className="text-sm leading-relaxed text-body sm:text-base">
            <span className="font-semibold">El consejo que más cambia resultados:</span> aplicá
            los productos sobre la piel todavía húmeda y esperá 30 segundos entre capas. La
            hidratación penetra mejor y desperdicia menos producto.
          </p>
        </div>
      </div>
    </section>
  )
}
