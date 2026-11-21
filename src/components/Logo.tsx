interface Props {
  size?: number
  /** Show the drafting construction lines around the mark. For large sizes only. */
  construction?: boolean
  className?: string
}

/**
 * NN monogram: two Ns sharing the middle stem. The first N is drawn in ink,
 * the second N's diagonal in the brand blue.
 */
export function Logo({ size = 32, construction = false, className }: Props) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={(size * 120) / 100}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {construction && (
        <g fill="none" stroke="var(--brand)" strokeWidth="0.5" opacity="0.55">
          <circle cx="60" cy="50" r="47" strokeDasharray="2.5 2.5" />
          <path d="M0 14h120M0 86h120M12 0v100M108 0v100M60 0v100M0 50h120" />
          <path d="M28 0v100M92 0v100" strokeDasharray="1.5 2.5" />
        </g>
      )}
      {/* second N: blue diagonal sits behind the shared stem */}
      <path d="M52 14h18l38 72H90z" fill="var(--brand)" />
      {/* first N */}
      <path d="M12 14h16v72H12z" fill="currentColor" />
      <path d="M12 14h18l38 72H50z" fill="currentColor" />
      <path d="M52 14h16v72H52z" fill="currentColor" />
      {/* right stem of the second N */}
      <path d="M92 14h16v72H92z" fill="currentColor" />
    </svg>
  )
}
