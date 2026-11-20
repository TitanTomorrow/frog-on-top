import { useState, type FormEvent, type ReactNode } from 'react'
import { materials, site } from '../../config/site'
import { Frog } from '../../graphics/Frog'
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from '../../graphics/icons'
import { submitInquiry, type DeliveryChannel, type Inquiry } from '../../lib/inquiries'
import { buttonClasses } from '../ui/buttonStyles'
import { SectionHeading } from '../ui/SectionHeading'

type FormValues = Required<Inquiry>
type Errors = Partial<Record<keyof FormValues, string>>

const quantities = ['1', '2', '3', '4', '5'] as const

const empty: FormValues = { name: '', email: '', company: '', material: '', quantity: '', message: '' }

function validate(v: FormValues): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'That email doesn’t look quite right.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little about your part (at least 10 characters).'
  return e
}

const inputCls =
  'mt-1.5 block w-full rounded-xl border bg-mist-50 px-3.5 py-2.5 text-base text-forest-900 shadow-xs ' +
  'placeholder:text-forest-900/35 focus:border-moss-500 focus:ring-2 focus:ring-moss-500/25 focus:outline-none'

export function Contact() {
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [sentVia, setSentVia] = useState<DeliveryChannel | null>(null)

  const update = (field: keyof FormValues, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (attempted) setErrors(validate(next))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const trimmed = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, v.trim()]),
      ) as FormValues
      setSentVia(await submitInquiry(trimmed))
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const field = (name: keyof FormValues) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
    className: `${inputCls} ${errors[name] ? 'border-red-400' : 'border-forest-900/15'}`,
  })

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pt-20 pb-36 sm:pt-28 sm:pb-44">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="contact-title"
            align="left"
            eyebrow="Get a quote"
            title="Let’s make your parts"
            description="Tell us what you need and we’ll reply with a quote or a few questions — usually within one to two business days."
          />

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-fern-100 p-5">
            <Frog waving accessories={['goggles']} className="h-24 w-24 shrink-0" />
            <p className="text-sm leading-relaxed text-forest-900/80">
              Have CAD files ready? Send DXF, STEP or PDF drawings with your request — it’s the fastest way to an
              accurate quote.
            </p>
          </div>

          <ul className="mt-8 space-y-4 text-sm">
            <ContactLine icon={<MailIcon className="h-5 w-5" />}>
              <a href={`mailto:${site.email}`} className="font-medium text-forest-900 hover:text-moss-600">
                {site.email}
              </a>
            </ContactLine>
            <ContactLine icon={<PhoneIcon className="h-5 w-5" />}>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="font-medium text-forest-900 hover:text-moss-600">
                {site.phone}
              </a>
            </ContactLine>
            <ContactLine icon={<PinIcon className="h-5 w-5" />}>{site.location}</ContactLine>
            <ContactLine icon={<ClockIcon className="h-5 w-5" />}>{site.hours}</ContactLine>
          </ul>
        </div>

        <div className="rounded-3xl border border-forest-900/8 bg-mist-50 p-6 shadow-lg shadow-forest-900/5 sm:p-8">
          {sentVia ? (
            <div role="status" className="flex flex-col items-center py-10 text-center">
              <Frog accessories={['box']} className="h-32 w-32" />
              <h3 className="mt-4 text-2xl font-semibold text-forest-900">
                {sentVia === 'firestore' ? 'Request received!' : 'Almost there!'}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest-900/70">
                {sentVia === 'firestore'
                  ? 'Thanks — we’ll be in touch shortly.'
                  : 'Your email app should have opened with your request filled in. Attach any drawings, then hit send.'}
              </p>
              {sentVia === 'email-client' && (
                <p className="mt-3 text-xs text-forest-900/55">
                  Nothing opened? Email us directly at{' '}
                  <a href={`mailto:${site.email}`} className="font-medium text-moss-600 underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}
              <button
                type="button"
                className={buttonClasses('secondary', 'mt-6')}
                onClick={() => {
                  setSentVia(null)
                  setValues(empty)
                  setAttempted(false)
                  setErrors({})
                }}
              >
                Start a new request
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required error={errors.name} htmlFor="field-name">
                <input type="text" autoComplete="name" {...field('name')} onChange={(e) => update('name', e.target.value)} />
              </Field>
              <Field label="Email" required error={errors.email} htmlFor="field-email">
                <input type="email" autoComplete="email" {...field('email')} onChange={(e) => update('email', e.target.value)} />
              </Field>
              <Field label="Company" htmlFor="field-company" className="sm:col-span-2">
                <input
                  type="text"
                  autoComplete="organization"
                  {...field('company')}
                  onChange={(e) => update('company', e.target.value)}
                />
              </Field>
              <Field label="Material" htmlFor="field-material">
                <select {...field('material')} onChange={(e) => update('material', e.target.value)}>
                  <option value="">Not sure yet</option>
                  {materials.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Quantity" error={errors.quantity} htmlFor="field-quantity">
                <select {...field('quantity')} onChange={(e) => update('quantity', e.target.value)}>
                  <option value="">Not sure yet</option>
                  {quantities.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project details" required error={errors.message} htmlFor="field-message" className="sm:col-span-2">
                <textarea
                  rows={5}
                  placeholder="What is the part, material thickness, key dimensions or tolerances, finish, and when do you need it?"
                  {...field('message')}
                  onChange={(e) => update('message', e.target.value)}
                />
              </Field>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-forest-900/55">
                  <span className="text-red-600">*</span> Required. We never share your details.
                </p>
                <button type="submit" disabled={status === 'submitting'} className={buttonClasses('primary', 'px-8')}>
                  {status === 'submitting' ? 'Sending…' : 'Send request'}
                </button>
              </div>
              {status === 'error' && (
                <p role="alert" className="text-sm text-red-700 sm:col-span-2">
                  Something went wrong sending your request. Please try again, or email us at {site.email}.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  required,
  error,
  className = '',
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  const name = htmlFor.replace('field-', '')
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-forest-900">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`error-${name}`} className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-forest-900/80">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fern-100 text-moss-600">
        {icon}
      </span>
      {children}
    </li>
  )
}
