import { useRef, useState } from 'react'
import { testimonials } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

function Avatar({ name, src }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = src && !failed

  return (
    <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft text-sm font-semibold text-accent">
      {showPhoto ? (
        <img
          src={src}
          alt={`Foto de ${name}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  )
}

export default function Testimonios() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="opiniones" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen ellas"
          text="Reseñas de clientas que ya tienen su rutina armada con nosotros."
        />

        <ul ref={ref} className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <li
              key={item.name}
              data-reveal
              data-reveal-delay={i * 100}
              className="flex flex-col rounded-3xl border border-line bg-surface-raised/75 p-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-center gap-1 text-accent" aria-label={`${item.rating} de 5 estrellas`}>
                {Array.from({ length: item.rating }, (_, star) => (
                  <Icon key={star} name="star" className="size-4" strokeWidth={0} />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                “{item.text}”
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <Avatar name={item.name} src={item.avatar} />
                <span>
                  <span className="block text-sm font-semibold text-body">{item.name}</span>
                  <span className="block text-xs text-muted">{item.location}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
