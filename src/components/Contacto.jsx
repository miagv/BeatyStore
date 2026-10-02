import { useRef, useState } from 'react'
import { contactReasons, site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

const initialValues = { nombre: '', email: '', telefono: '', motivo: '', mensaje: '' }

const fieldClass =
  'w-full rounded-2xl border border-line bg-surface-raised px-4 py-3.5 text-sm text-body transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none'

function validate(values) {
  const errors = {}
  if (!values.nombre.trim()) errors.nombre = 'Contanos tu nombre.'
  if (!values.email.trim()) errors.email = 'Necesitamos un email para responderte.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Revisá el formato del email.'
  if (!values.motivo) errors.motivo = 'Elegí un motivo.'
  if (values.mensaje.trim().length < 10)
    errors.mensaje = 'Escribinos un poco más, mínimo 10 caracteres.'
  return errors
}

const contactInfo = [
  { icon: 'mail', label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: 'phone', label: 'Teléfono', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: 'pin', label: 'Showroom', value: site.address },
  { icon: 'clock', label: 'Horarios', value: site.hours },
]

const socialIcons = { Instagram: 'instagram', TikTok: 'tiktok', WhatsApp: 'whatsapp' }

export default function Contacto() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const honeypot = useRef(null)
  const sectionRef = useRef(null)

  useReveal(sectionRef)

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'loading') return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Trampa anti-spam: si el bot llenó el campo oculto, fingimos éxito.
    const trapValue = honeypot.current?.value ?? ''
    if (trapValue) {
      setStatus('success')
      setValues(initialValues)
      return
    }

    setStatus('loading')
    setServerError('')

    try {
      const body = new FormData()
      body.append('nombre', values.nombre.trim())
      body.append('email', values.email.trim())
      body.append('telefono', values.telefono.trim())
      body.append('motivo', values.motivo)
      body.append('mensaje', values.mensaje.trim())
      body.append('_subject', 'Nuevo mensaje desde Beauty Store')
      body.append('_gotcha', trapValue)

      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`)

      setStatus('success')
      setValues(initialValues)
    } catch {
      setServerError(
        'No pudimos enviar el mensaje. Probá de nuevo en unos segundos o escribinos directo por email.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contacto" className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div
            ref={sectionRef}
            data-reveal
            className="rounded-4xl border border-blush-200 bg-blush-50 p-10 text-center sm:p-14 dark:border-blush-800 dark:bg-blush-900/40"
          >
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-contrast">
              <Icon name="check" className="size-8" strokeWidth={2} />
            </span>
            <h2 className="mt-7 text-3xl text-body sm:text-4xl">¡Mensaje enviado!</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Gracias por escribirnos. Te respondemos a la brevedad, normalmente dentro de las
              24 horas hábiles.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-semibold text-body transition-colors hover:border-accent hover:text-accent"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu piel"
          text="Contanos qué te preocupa y una asesora te arma una rutina a medida. Respondemos en menos de 24 h hábiles."
        />

        <div ref={sectionRef} className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <form
            noValidate
            onSubmit={handleSubmit}
            data-reveal
            className="rounded-4xl border border-line bg-surface-raised/75 p-6 shadow-soft sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-body">
                  Nombre <span className="text-accent">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={values.nombre}
                  onChange={update('nombre')}
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                  placeholder="Tu nombre"
                  className={fieldClass}
                />
                {errors.nombre && (
                  <p id="error-nombre" className="mt-1.5 text-xs text-blush-700 dark:text-blush-300">
                    {errors.nombre}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-body">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  placeholder="nombre@email.com"
                  className={fieldClass}
                />
                {errors.email && (
                  <p id="error-email" className="mt-1.5 text-xs text-blush-700 dark:text-blush-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-body">
                  Teléfono <span className="text-muted">(opcional)</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  value={values.telefono}
                  onChange={update('telefono')}
                  placeholder="+51 987986986"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="motivo" className="mb-2 block text-sm font-medium text-body">
                  Motivo <span className="text-accent">*</span>
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  value={values.motivo}
                  onChange={update('motivo')}
                  aria-invalid={Boolean(errors.motivo)}
                  aria-describedby={errors.motivo ? 'error-motivo' : undefined}
                  className={`${fieldClass} ${values.motivo ? '' : 'text-muted/80'}`}
                >
                  <option value="">Elegí una opción</option>
                  {contactReasons.map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {reason.label}
                    </option>
                  ))}
                </select>
                {errors.motivo && (
                  <p id="error-motivo" className="mt-1.5 text-xs text-blush-700 dark:text-blush-300">
                    {errors.motivo}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="mb-2 block text-sm font-medium text-body">
                  Mensaje <span className="text-accent">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={values.mensaje}
                  onChange={update('mensaje')}
                  aria-invalid={Boolean(errors.mensaje)}
                  aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                  placeholder="Contanos tu tipo de piel, qué te preocupa y con qué estás usando hoy."
                  className={`${fieldClass} resize-y`}
                />
                {errors.mensaje && (
                  <p id="error-mensaje" className="mt-1.5 text-xs text-blush-700 dark:text-blush-300">
                    {errors.mensaje}
                  </p>
                )}
              </div>
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="bot-trap">No completes este campo</label>
              <input
                id="bot-trap"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypot}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              Al enviar aceptás que usemos tus datos únicamente para responderte. No los
              compartilhamos con terceros.
            </p>

            <div aria-live="polite">
              {status === 'error' && (
                <p className="mt-5 rounded-2xl border border-blush-300 bg-blush-50 px-4 py-3 text-sm text-blush-800 dark:border-blush-700 dark:bg-blush-900/50 dark:text-blush-200">
                  {serverError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-contrast shadow-lift transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
            >
              {status === 'loading' ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Icon name="arrow" className="size-4.5" />
                </>
              )}
            </button>
          </form>

          <aside
            data-reveal
            data-reveal-delay="120"
            className="flex flex-col gap-6 rounded-4xl border border-line bg-gradient-to-br from-blush-100 to-blush-200 p-8 dark:from-blush-900 dark:to-blush-800"
          >
            <h3 className="font-display text-2xl text-body">Datos de contacto</h3>

            <ul className="flex flex-col gap-5">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-raised/80 text-accent">
                      <Icon name={item.icon} className="size-4.5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-wider text-accent uppercase">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-body">{item.value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3.5 transition-opacity hover:opacity-70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3.5">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto border-t border-blush-300/60 pt-6 dark:border-blush-700/60">
              <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                Seguinos
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {site.social.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-surface-raised/80 px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-accent hover:text-accent-contrast"
                    >
                      <Icon name={socialIcons[social.label]} className="size-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
