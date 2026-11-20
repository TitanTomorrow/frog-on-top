import type { ReactNode, SVGProps } from 'react'
import type { ServiceIcon } from '../config/site'

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

const servicePaths: Record<ServiceIcon, ReactNode> = {
  // laser head, beam and sparks on a sheet
  laser: (
    <>
      <path d="M9 2.5h6v5H9z" />
      <path d="M10 7.5l2 3 2-3" />
      <path d="M12 10.5v6" />
      <path d="M8.5 15l-1.5-1.5M15.5 15l1.5-1.5" />
      <path d="M3 17.5h18v3H3z" />
    </>
  ),
  // press-brake punch forming a sheet into a V-die
  bend: (
    <>
      <path d="M10 2.5h4v10.5l-2 3.5-2-3.5z" />
      <path d="M3 13l9 4 9-4" />
      <path d="M3 21v-4.5h4.5l4.5 3 4.5-3H21V21z" />
    </>
  ),
  // welding torch laying a bead between two plates
  weld: (
    <>
      <path d="M15.5 2.5l4 2.4-4.6 7.8-4-2.4z" />
      <path d="M10.9 10.3L12 15l2.9-2.3" />
      <path d="M8 14.5l-1.5-1.2M7.5 17l-2 .2" />
      <path d="M3 18h7.5M13.5 18H21M3 21h18" />
      <path d="M10.5 18a1.5 1.5 0 0 1 3 0" />
    </>
  ),
  // isometric part
  prototype: (
    <>
      <path d="M12 2.5l8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5z" />
      <path d="M3.5 7.25L12 12l8.5-4.75M12 12v9.5" />
    </>
  ),
  // sparkle finish
  finish: (
    <>
      <path d="M11 3l1.7 4.6L17.3 9.3l-4.6 1.7L11 15.6l-1.7-4.6L4.7 9.3l4.6-1.7z" />
      <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  // magnifier with check
  inspect: (
    <>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M20.5 20.5l-5-5" />
      <path d="M7.5 10.5l2 2 3.75-3.75" />
    </>
  ),
}

export function ServiceGlyph({ name, ...props }: IconProps & { name: ServiceIcon }) {
  return <Icon {...props}>{servicePaths[name]}</Icon>
}

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </Icon>
)

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.5 1.5V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" />
  </Icon>
)

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
)

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
)

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
)

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
)

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
)
