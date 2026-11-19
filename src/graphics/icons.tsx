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
  // spindle, end mill and workpiece
  mill: (
    <>
      <path d="M8.5 2.5h7v4h-7z" />
      <path d="M10.5 6.5v6.5l1.5 1.5 1.5-1.5V6.5" />
      <path d="M10.5 9l3-1.2M10.5 11.5l3-1.2" />
      <path d="M3 17h18v4H3z" />
      <path d="M7 17v-1.5h6" />
    </>
  ),
  // chuck jaws and a turned part
  lathe: (
    <>
      <path d="M2.5 6.5h5v11h-5z" />
      <path d="M7.5 9h4v6h-4" />
      <path d="M11.5 10h6l3.5 2-3.5 2h-6" />
      <path d="M14.5 10v4" />
    </>
  ),
  // polymer hexagon
  plastic: (
    <>
      <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />
      <path d="M12 8l3.9 2.25v4.5L12 17l-3.9-2.25v-4.5z" />
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
