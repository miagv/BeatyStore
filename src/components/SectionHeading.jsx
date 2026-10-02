export default function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  const alignment =
    align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'

  return (
    <div className={alignment}>
      {eyebrow && (
        <span
          data-reveal
          className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-accent uppercase"
        >
          {eyebrow}
        </span>
      )}
      <h2
        data-reveal
        data-reveal-delay="80"
        className="mt-5 text-3xl leading-[1.1] text-body sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {text && (
        <p data-reveal data-reveal-delay="160" className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {text}
        </p>
      )}
    </div>
  )
}
