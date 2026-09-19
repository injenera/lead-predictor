import type { FlagCode } from '../lib/i18n'

export function FlagIcon({ flag }: { flag: FlagCode }) {
  if (flag === 'bg') {
    return (
      <svg className="flag" viewBox="0 0 20 14" aria-hidden="true">
        <rect width="20" height="14" rx="2" fill="#ffffff" />
        <rect y="4.67" width="20" height="4.66" fill="#00966e" />
        <rect y="9.33" width="20" height="4.67" rx="2" fill="#d62612" />
        <rect y="9.33" width="20" height="2" fill="#d62612" />
      </svg>
    )
  }
  return (
    <svg className="flag" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" rx="2" fill="#ffffff" />
      <rect y="1.6" width="20" height="1.6" fill="#b22234" />
      <rect y="4.8" width="20" height="1.6" fill="#b22234" />
      <rect y="8" width="20" height="1.6" fill="#b22234" />
      <rect y="11.2" width="20" height="1.6" fill="#b22234" />
      <rect width="9" height="7.4" rx="2" fill="#3c3b6e" />
    </svg>
  )
}
