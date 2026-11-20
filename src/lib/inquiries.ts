import { site } from '../config/site'

export interface Inquiry {
  name: string
  email: string
  company?: string
  material?: string
  quantity?: string
  message: string
}

/** How the inquiry was delivered — lets the UI show the right confirmation. */
export type DeliveryChannel = 'email-client' | 'firestore'

/**
 * Single seam for submitting quote requests.
 *
 * Today: opens the visitor's email app with a pre-filled message to the shop.
 *
 * Later (Firestore), replace the body with something like:
 *   import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
 *   import { db } from './firebase'
 *   await addDoc(collection(db, 'inquiries'), { ...inquiry, createdAt: serverTimestamp() })
 *   return 'firestore'
 * The contact form does not need to change.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<DeliveryChannel> {
  const subject = `Quote request from ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ''}`
  const details: [string, string | undefined][] = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Company', inquiry.company],
    ['Material', inquiry.material],
    ['Quantity', inquiry.quantity],
  ]
  const body = [
    ...details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    '',
    inquiry.message,
    '',
    '(Please attach your DXF files to this email.)',
  ].join('\n')

  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
  return 'email-client'
}
