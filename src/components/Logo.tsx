interface Props {
  size?: number
  className?: string
}

/** NN monogram: two Ns sharing the middle stem. The second N's diagonal carries the ember. */
export function Logo({ size = 32, className }: Props) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={(size * 120) / 100}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M52 14h18l38 72H90z" fill="var(--ember)" />
      <path d="M12 14h16v72H12zM12 14h18l38 72H50zM52 14h16v72H52zM92 14h16v72H92z" fill="currentColor" />
    </svg>
  )
}
