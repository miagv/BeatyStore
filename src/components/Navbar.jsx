import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../data/site'
import { useTheme } from '../hooks/useTheme'
import Icon from './Icon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const openRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && openRef.current) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-surface/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#inicio" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-contrast shadow-soft transition-transform duration-300 group-hover:-rotate-6">
            <Icon name="sparkles" className="size-5" />
          </span>
          <span className="font-display text-lg leading-none font-semibold tracking-tight text-body">
            {site.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-pressed={theme === 'dark'}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised/70 text-body transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="size-4.5" />
          </button>

          <a
            href="#contacto"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Comprar ahora
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised/70 text-body xl:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="size-5" />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-line bg-surface transition-[max-height,opacity] duration-300 xl:hidden ${
          open ? 'max-h-120 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-body transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
