export type Language = 'en' | 'bg'

export type CurrencyCode = 'USD' | 'EUR' | 'BGN'

export interface CalculatorInputs {
  language: Language
  currency: CurrencyCode
  campaignStart: string
  campaignEnd: string
  totalRevenue: number
  avgOrderValue: number
  leadResponseRate: number
  prospectResponseRate: number
}
