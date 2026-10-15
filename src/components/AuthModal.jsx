import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const initialFields = { name: '', email: '', password: '' }

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [mode, setMode] = useState('login')
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setError('')
        onClose()
      }
    }

    closeButtonRef.current?.focus()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isRegistering = mode === 'register'

  const closeModal = () => {
    setError('')
    onClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isRegistering && !fields.name.trim()) {
      setError('Ingresá tu nombre para crear la cuenta.')
      return
    }

    if (!fields.email.includes('@')) {
      setError('Ingresá un correo válido.')
      return
    }

    if (fields.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    const result = isRegistering ? onRegister(fields) : onLogin(fields)
    if (result.error) {
      setError(result.error)
      return
    }

    setFields(initialFields)
    closeModal()
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="w-full max-w-md rounded-4xl border border-line bg-surface-raised p-6 shadow-lift sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Tu cuenta</p>
            <h2 id="auth-title" className="mt-2 text-3xl text-body">
              {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            className="grid size-10 place-items-center rounded-full border border-line text-body transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="close" className="size-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-full bg-accent-soft p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`rounded-full px-4 py-2 transition-colors ${
              !isRegistering ? 'bg-surface-raised text-body shadow-sm' : 'text-muted'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`rounded-full px-4 py-2 transition-colors ${
              isRegistering ? 'bg-surface-raised text-body shadow-sm' : 'text-muted'
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <label className="block text-sm font-medium text-body">
              Nombre
              <input
                type="text"
                value={fields.name}
                onChange={(event) => setFields({ ...fields, name: event.target.value })}
                className="mt-1.5 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-body outline-none transition-colors focus:border-accent"
                autoComplete="name"
              />
            </label>
          )}
          <label className="block text-sm font-medium text-body">
            Correo electrónico
            <input
              type="email"
              value={fields.email}
              onChange={(event) => setFields({ ...fields, email: event.target.value })}
              className="mt-1.5 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-body outline-none transition-colors focus:border-accent"
              autoComplete="email"
            />
          </label>
          <label className="block text-sm font-medium text-body">
            Contraseña
            <input
              type="password"
              value={fields.password}
              onChange={(event) => setFields({ ...fields, password: event.target.value })}
              className="mt-1.5 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-body outline-none transition-colors focus:border-accent"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
            />
          </label>
          {error && <p className="rounded-2xl bg-accent-soft px-4 py-3 text-sm text-body">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition hover:brightness-95"
          >
            {isRegistering ? 'Crear mi cuenta' : 'Ingresar'}
          </button>
        </form>
      </section>
    </div>
  )
}
