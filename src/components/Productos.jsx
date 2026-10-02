import { useRef, useState } from 'react'
import { categories, priceFormat, products } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import ProductImage from './ProductImage'
import SectionHeading from './SectionHeading'

export default function Productos() {
  const [active, setActive] = useState('todos')
  const ref = useRef(null)
  useReveal(ref)

  const visible = active === 'todos' ? products : products.filter((p) => p.category === active)

  return (
    <section id="productos" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Catálogo"
          title="Los básicos que no fallan"
          text="Formulaciones simples, efectivas y probadas. Empezá por acá y armá tu rutina alrededor."
        />

        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = active === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.id)}
                aria-pressed={isActive}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-accent text-accent-contrast shadow-soft'
                    : 'border border-line bg-surface-raised/60 text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, i) => (
            <li
              key={product.id}
              data-reveal
              data-reveal-delay={i * 70}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-raised/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-blush-300 hover:shadow-lift dark:hover:border-blush-600"
            >
              <div className="relative p-3 pb-0">
                <ProductImage product={product} />
                {product.badge && (
                  <span className="absolute top-6 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-contrast">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {product.brand}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-body">{product.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{product.text}</p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="font-display text-xl font-semibold text-body">
                    {priceFormat.format(product.price)}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-body transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
                  >
                    <Icon name="check" className="size-4" />
                    <span className="sr-only">Agregar {product.name} al carrito</span>
                    <span aria-hidden="true">Agregar</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-10 text-center text-sm text-muted">
          ¿No sabés cuál elegir?{' '}
          <a href="#contacto" className="font-semibold text-accent underline underline-offset-4">
            Contanos tu tipo de piel
          </a>{' '}
          y te respondemos con una recomendación.
        </p>
      </div>
    </section>
  )
}
