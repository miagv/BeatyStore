import { useState } from 'react'

const silhouettes = {
  'serum-niacinamida': (
    <>
      <rect x="42" y="34" width="16" height="12" rx="3" />
      <path d="M38 46h24v40a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6V46Z" />
      <path d="M46 58h8" strokeWidth="3" />
    </>
  ),
  'tonico-centella': (
    <>
      <path d="M44 26h12v10H44z" />
      <path d="M40 36h20l4 52a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6l4-52Z" />
      <path d="M38 58h24" strokeWidth="3" />
    </>
  ),
  'crema-barrera': (
    <>
      <path d="M34 40h32v10H34z" />
      <path d="M30 50h40v34a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10V50Z" />
      <circle cx="50" cy="70" r="7" strokeWidth="2.5" />
    </>
  ),
  'lip-tint-rosa': (
    <>
      <rect x="44" y="22" width="12" height="30" rx="2" />
      <path d="M42 52h16l-2 42H44l-2-42Z" />
      <path d="M44 62h12" strokeWidth="3" />
    </>
  ),
  'protector-solar': (
    <>
      <rect x="36" y="30" width="28" height="14" rx="4" />
      <path d="M34 44h32l3 44a8 8 0 0 1-8 8H39a8 8 0 0 1-8-8l3-44Z" />
      <circle cx="50" cy="68" r="9" strokeWidth="2.5" />
    </>
  ),
  'mascarilla-arcilla': (
    <>
      <path d="M36 34h28v10H36z" />
      <path d="M32 44h36v42a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V44Z" />
      <path d="M42 62c4 6 12 6 16 0" strokeWidth="3" />
    </>
  ),
}

/**
 * Marco placeholder con etiqueta. Si el producto trae `image`, intenta cargar
 * esa foto y vuelve al placeholder si el archivo no existe o falla la carga.
 */
export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = product.image && !failed

  return (
    <div
      className={`relative aspect-3/2 overflow-hidden rounded-3xl bg-gradient-to-br from-blush-100 via-blush-200 to-blush-300 dark:from-blush-900 dark:via-blush-800 dark:to-blush-700 ${className}`}
    >
      {showPhoto ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_60%)]" />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 left-1/2 size-4/13 -translate-x-1/2 -translate-y-1/2 text-blush-700/70 dark:text-blush-200/70"
          >
            {silhouettes[product.id] ?? silhouettes['serum-niacinamida']}
          </svg>
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/75 px-3 py-1.5 text-center text-[11px] font-medium text-blush-800 backdrop-blur-sm dark:bg-black/35 dark:text-blush-100">
            {product.name}
          </span>
        </>
      )}
    </div>
  )
}
