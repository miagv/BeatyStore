import { useEffect, useRef } from 'react'
import { priceFormat } from '../data/site'
import Icon from './Icon'

export default function CartDrawer({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  user,
  whatsappUrl,
}) {
  const closeButtonRef = useRef(null)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const message = [
    user ? `Hola, soy ${user.name} y quisiera finalizar mi compra:` : 'Hola, quisiera finalizar mi compra:',
    '',
    ...cart.map(
      (item) => `- ${item.name} x${item.quantity}: ${priceFormat.format(item.price * item.quantity)}`,
    ),
    '',
    `Total: ${priceFormat.format(total)}`,
  ].join('\n')

  return (
    <div
      className="fixed inset-0 z-60 flex justify-end bg-black/55 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="flex h-full w-full max-w-md flex-col bg-surface-raised shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Tu selección</p>
            <h2 id="cart-title" className="mt-1 text-2xl text-body">Carrito</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-line text-body transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="close" className="size-4" />
            <span className="sr-only">Cerrar carrito</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon name="cart" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl text-body">Tu carrito está vacío</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Elegí tus productos favoritos y agregalos para armar tu pedido.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-2xl border border-line p-3">
                  <img src={item.image} alt="" className="size-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate text-sm font-semibold text-body">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="grid size-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-accent"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Icon name="trash" className="size-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-accent">{priceFormat.format(item.price)}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() => onDecrease(item.id)}
                          className="grid size-7 place-items-center text-body transition-colors hover:text-accent"
                          aria-label={`Reducir cantidad de ${item.name}`}
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-body">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onIncrease(item.id)}
                          className="grid size-7 place-items-center text-body transition-colors hover:text-accent"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-body">
                        {priceFormat.format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-base font-semibold text-body">
                <span>Total</span>
                <span>{priceFormat.format(total)}</span>
              </div>
              <a
                href={`${whatsappUrl}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1fba58]"
              >
                <Icon name="whatsapp" className="size-5" />
                Finalizar compra por WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
