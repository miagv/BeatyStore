import { useState } from 'react'
import Icon from './Icon'
import { site } from '../data/site'

const stats = [
  { value: '12k+', label: 'clientas felices' },
  { value: '48 h', label: 'de entrega promedio' },
  { value: '100%', label: 'producto original' },
]

export default function Hero() {
  const [heroFailed, setHeroFailed] = useState(false)

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-32 -left-24 size-105 rounded-full bg-blush-200/50 blur-3xl dark:bg-blush-800/25" />
        <div className="animate-float absolute top-40 -right-28 size-125 rounded-full bg-blush-300/45 blur-3xl dark:bg-blush-700/25" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blush-300 bg-blush-100 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-blush-800 uppercase dark:border-blush-700 dark:bg-blush-900/60 dark:text-blush-200">
            <Icon name="leaf" className="size-3.5" />
            K-Beauty · Seúl
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] text-body">
            Piel luminosa,
            <br />
            <span className="italic text-accent">rutina coreana</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Maquillaje y skincare importados directamente de Corea del Sur. Productos
            originales, fichas honestas y una rutina que sí se sostiene todos los días.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-contrast shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Ver productos
              <Icon name="arrow" className="size-4.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface-raised/60 px-7 py-4 text-base font-semibold text-body transition-colors hover:border-accent hover:text-accent"
            >
              Hablar con una asesora
            </a>
          </div>

          <dl className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-reveal
          className="relative mt-14 overflow-hidden rounded-4xl bg-gradient-to-br from-blush-100 via-blush-200 to-blush-400 shadow-lift dark:from-blush-900 dark:via-blush-800 dark:to-blush-600"
        >
          {heroFailed ? (
            <div className="flex aspect-3/1 items-center justify-center px-6 text-center">
              <p className="text-sm text-blush-900/70 dark:text-blush-100/70">
                Reemplazá <code className="font-semibold">heroImage</code> en{' '}
                <code className="font-semibold">src/data/site.js</code>.
              </p>
            </div>
          ) : (
            <img
              src={site.heroImage}
              alt="Productos de skincare y maquillaje coreano de Beauty Store"
              onError={() => setHeroFailed(true)}
              fetchPriority="high"
              decoding="async"
              className="aspect-3/1 w-full object-cover"
            />
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-line bg-surface-raised/90 p-4 shadow-soft backdrop-blur-md sm:bottom-6 sm:left-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon name="check" className="size-4.5" />
            </span>
            <p className="text-xs leading-snug text-muted">
              Envío gratis desde <span className="font-semibold text-body">$45.000</span>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          ¿Primera vez con K-beauty?{' '}
          <a href="#rutina" className="font-semibold text-accent underline underline-offset-4">
            Te mostramos la rutina
          </a>{' '}
          en 5 pasos.
        </p>
      </div>
    </section>
  )
}
