export interface FunnelTotals {
  customers: number
  leads: number
  prospects: number
}

export interface MonthBucket {
  month: number
  customers: number
  leads: number
  prospects: number
}

export function requiredCustomers(totalRevenue: number, avgOrderValue: number): number {
  if (avgOrderValue <= 0) return 0
  return Math.max(0, Math.round(totalRevenue / avgOrderValue))
}

export function requiredLeads(customers: number, leadResponseRate: number): number {
  if (leadResponseRate <= 0) return 0
  return Math.round((customers * 100) / leadResponseRate)
}

export function requiredProspects(leads: number, prospectResponseRate: number): number {
  if (prospectResponseRate <= 0) return 0
  return Math.round((leads * 100) / prospectResponseRate)
}

export function funnelTotals(
  totalRevenue: number,
  avgOrderValue: number,
  leadResponseRate: number,
  prospectResponseRate: number,
): FunnelTotals {
  const customers = requiredCustomers(totalRevenue, avgOrderValue)
  const leads = requiredLeads(customers, leadResponseRate)
  const prospects = requiredProspects(leads, prospectResponseRate)
  return { customers, leads, prospects }
}

const AVG_MONTH_MS = 30.4375 * 24 * 60 * 60 * 1000

export function campaignMonthCount(start: Date, end: Date): number {
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 1
  }
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / AVG_MONTH_MS))
}

export function distributeByMonth(totals: FunnelTotals, months: number): MonthBucket[] {
  const count = Math.max(1, Math.floor(months))
  return Array.from({ length: count }, (_, i) => ({
    month: i + 1,
    customers: Math.round((totals.customers * (i + 1)) / count),
    leads: Math.round((totals.leads * (i + 1)) / count),
    prospects: Math.round((totals.prospects * (i + 1)) / count),
  }))
}

export function percentOf(part: number, whole: number): number {
  if (whole <= 0) return 0
  return (part / whole) * 100
}
