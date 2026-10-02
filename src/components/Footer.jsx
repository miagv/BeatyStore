import { navLinks, site } from '../data/site'
import Icon from './Icon'

const currentYear = new Date().getFullYear()

const socialIcons = { Instagram: 'instagram', TikTok: 'tiktok', WhatsApp: 'whatsapp' }

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-sunken">
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
            <a href="#faq" className="transition-colors hover:text-accent">
              Términos
            </a>
            <a href="#faq" className="transition-colors hover:text-accent">
              Privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
