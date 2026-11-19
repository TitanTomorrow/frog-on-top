export type ButtonVariant = 'primary' | 'secondary' | 'onDark'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ' +
  'transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-honey-500 text-forest-950 shadow-sm shadow-honey-600/30 hover:bg-honey-400',
  secondary: 'border border-forest-900/20 bg-mist-50/70 text-forest-900 backdrop-blur hover:bg-mist-50',
  onDark: 'border border-mist-100/25 text-mist-100 hover:bg-mist-100/10',
}

export function buttonClasses(variant: ButtonVariant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim()
}
