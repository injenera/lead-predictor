import { percentOf, type FunnelTotals } from '../lib/calculations'
import type { Strings } from '../lib/i18n'

interface StatsCardsProps {
  totals: FunnelTotals
  t: Strings
}

function ProspectsIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 3h12l-1.5 4h-9L2 3z" fill="currentColor" opacity="0.9" />
      <path d="M6 8h4v2l2 3H4l2-3V8z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function LeadsIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="5" r="3" fill="currentColor" />
      <path d="M2.5 13c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function CustomersIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="6.5" cy="5" r="2.8" fill="currentColor" />
      <path d="M1.5 13c0-2.8 2.2-4.2 5-4.2 1 0 1.9.15 2.7.45" fill="currentColor" opacity="0.6" />
      <path d="M9 10.5l1.8 1.8 3.2-3.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  )
}

export function StatsCards({ totals, t }: StatsCardsProps) {
  const cards = [
    { key: 'prospects', label: t.prospects, value: totals.prospects, pct: 100, icon: <ProspectsIcon /> },
    { key: 'leads', label: t.leads, value: totals.leads, pct: percentOf(totals.leads, totals.prospects), icon: <LeadsIcon /> },
    { key: 'customers', label: t.customers, value: totals.customers, pct: percentOf(totals.customers, totals.prospects), icon: <CustomersIcon /> },
  ]

  return (
    <div className="stats-column">
      {cards.map((card) => (
        <div className="stat-card" key={card.key}>
          <div className="stat-head">
            <span className="stat-icon">{card.icon}</span>
            <span className="stat-label">{card.label}</span>
            <span className="stat-pct">{Math.round(card.pct)}%</span>
          </div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${Math.min(100, card.pct)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
