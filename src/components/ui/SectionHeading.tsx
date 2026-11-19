interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  id,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? 'text-fern-300' : 'text-moss-600'}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? 'text-mist-50' : 'text-forest-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-mist-100/75' : 'text-forest-900/70'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
