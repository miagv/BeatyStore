import { useRef } from 'react'
import { faqs } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Faq() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="faq" className="py-16 lg:py-20">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div>
          <SectionHeading
            align="left"
            eyebrow="Preguntas"
            title="Todo lo que suelen preguntarnos"
            text="Si tu duda no está acá, escribinos y te respondemos en menos de 24 h hábiles."
          />

          <img
            data-reveal
            src="/productos/faq-foto.jpg"
            alt="Detalle de la textura de un producto de skincare"
            loading="lazy"
            decoding="async"
            className="mt-10 hidden w-full rounded-4xl object-cover shadow-soft sm:block lg:aspect-4/5"
          />
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((faq, i) => (
            <li key={faq.q} data-reveal data-reveal-delay={i * 70}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent">
                  <h3 className="text-base font-semibold text-body group-hover:text-accent sm:text-lg">
                    {faq.q}
                  </h3>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-accent transition-transform duration-300 group-open:rotate-45">
                    <Icon name="arrow" className="size-4 -rotate-45" />
                  </span>
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-muted sm:text-base">{faq.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
