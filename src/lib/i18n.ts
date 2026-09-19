import type { CurrencyCode, Language } from '../types'

export type FlagCode = 'us' | 'bg'

export interface LanguageOption {
  code: Language
  label: string
  flag: FlagCode
}

export const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'bg', label: 'Български', flag: 'bg' },
]

export interface CurrencyOption {
  code: CurrencyCode
  label: string
  symbol: string
}

export const currencyOptions: CurrencyOption[] = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'BGN', label: 'Bulgarian Lev', symbol: 'лв' },
]

export function currencySymbol(code: CurrencyCode): string {
  return currencyOptions.find((c) => c.code === code)?.symbol ?? '$'
}

export interface Strings {
  language: string
  currency: string
  campaignStart: string
  campaignEnd: string
  totalRevenue: string
  avgOrderValue: string
  prospects: string
  leads: string
  customers: string
  months: string
  month: string
  people: string
  leadResponseRate: string
  prospectResponseRate: string
}

export const strings: Record<Language, Strings> = {
  en: {
    language: 'Language',
    currency: 'Currency',
    campaignStart: 'Campaign Start',
    campaignEnd: 'Campaign End',
    totalRevenue: 'Total Revenue',
    avgOrderValue: 'Avg. Order Value',
    prospects: 'Prospects',
    leads: 'Leads',
    customers: 'Customers',
    months: 'Months',
    month: 'Month',
    people: 'people',
    leadResponseRate: 'Lead Response Rate',
    prospectResponseRate: 'Prospect Response Rate',
  },
  bg: {
    language: 'Език',
    currency: 'Валута',
    campaignStart: 'Начало на кампанията',
    campaignEnd: 'Край на кампанията',
    totalRevenue: 'Общ оборот',
    avgOrderValue: 'Средна стойност на поръчка',
    prospects: 'Проспекти',
    leads: 'Лийдове',
    customers: 'Клиенти',
    months: 'Месеци',
    month: 'Месец',
    people: 'души',
    leadResponseRate: 'Процент отговорили лийдове',
    prospectResponseRate: 'Процент отговорили проспекти',
  },
}
