import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../data/site'
import Icon from './Icon'

const currentYear = new Date().getFullYear()

const socialIcons = { Instagram: 'instagram', TikTok: 'tiktok', WhatsApp: 'whatsapp' }

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!termsOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setTermsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [termsOpen])

  return (
    <>
      <footer id="footer" className="border-t border-line bg-surface-sunken">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-contrast">
                <Icon name="sparkles" className="size-5" />
              </span>
              <span className="font-display text-lg font-semibold text-body">{site.name}</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {site.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised text-body transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
                  >
                    <Icon name={socialIcons[social.label]} className="size-4.5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Navegación
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {[...navLinks, { label: 'Preguntas frecuentes', href: '#faq' }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Contacto
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.address}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {site.name}. Todos los derechos reservados.
          </p>
          <p className="flex flex-wrap gap-5">
            <button
              type="button"
              onClick={() => setTermsOpen(true)}
              className="cursor-pointer transition-colors hover:text-accent"
            >
              Términos
            </button>
            <a href="#faq" className="transition-colors hover:text-accent">
              Privacidad
            </a>
          </p>
        </div>
      </div>
      </footer>
      {termsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setTermsOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-4xl border border-line bg-surface-raised p-6 shadow-lift sm:max-h-[calc(100dvh-3rem)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  {site.name}
                </p>
                <h2 id="terms-title" className="mt-2 text-3xl text-body">
                  Términos y condiciones
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setTermsOpen(false)}
                className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted">
              <p>
                Al navegar por este sitio y realizar una compra, aceptás estos términos y condiciones.
                Te recomendamos leerlos antes de confirmar tu pedido.
              </p>
              <div>
                <h3 className="font-sans text-base font-semibold text-body">Productos y disponibilidad</h3>
                <p className="mt-1.5">
                  Las imágenes son ilustrativas. La disponibilidad, los precios y las promociones pueden cambiar
                  sin previo aviso hasta la confirmación de la compra.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold text-body">Compras y envíos</h3>
                <p className="mt-1.5">
                  Una vez recibido el pedido, te contactaremos para confirmar el pago, los datos de entrega y el
                  plazo estimado de envío. Los tiempos pueden variar según la ubicación y el operador logístico.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold text-body">Uso responsable</h3>
                <p className="mt-1.5">
                  Revisá los ingredientes y las indicaciones de cada producto antes de usarlo. Ante cualquier
                  irritación, suspendé su uso y consultá a un profesional de la salud.
                </p>
              </div>
              <p>
                Para consultas sobre tu compra o estos términos, escribinos a{' '}
                <a href={`mailto:${site.email}`} className="font-medium text-accent underline underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
