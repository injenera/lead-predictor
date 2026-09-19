import { useMemo, useState } from 'react'
import type { CalculatorInputs } from './types'
import { campaignMonthCount, distributeByMonth, funnelTotals } from './lib/calculations'
import { strings } from './lib/i18n'
import { ControlPanel } from './components/ControlPanel'
import { FunnelChart } from './components/FunnelChart'
import { StatsCards } from './components/StatsCards'
import { RateSliders } from './components/RateSliders'

function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" fill="currentColor" />
      </svg>
    </span>
  )
}

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    language: 'en',
    currency: 'USD',
    campaignStart: '2026-05-08',
    campaignEnd: '2026-11-04',
    totalRevenue: 10000,
    avgOrderValue: 1000,
    leadResponseRate: 40,
    prospectResponseRate: 20,
  })

  const update = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }))

  const t = strings[inputs.language]

  const totals = useMemo(
    () =>
      funnelTotals(
        inputs.totalRevenue,
        inputs.avgOrderValue,
        inputs.leadResponseRate,
        inputs.prospectResponseRate,
      ),
    [inputs.totalRevenue, inputs.avgOrderValue, inputs.leadResponseRate, inputs.prospectResponseRate],
  )

  const buckets = useMemo(() => {
    const months = campaignMonthCount(new Date(inputs.campaignStart), new Date(inputs.campaignEnd))
    return distributeByMonth(totals, months)
  }, [totals, inputs.campaignStart, inputs.campaignEnd])

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <h1>LeadPredictor</h1>
      </header>
      <main className="dashboard">
        <ControlPanel inputs={inputs} onChange={update} t={t} />
        <div className="center-column">
          <FunnelChart buckets={buckets} t={t} />
          <RateSliders
            leadRate={inputs.leadResponseRate}
            prospectRate={inputs.prospectResponseRate}
            onChange={update}
            t={t}
          />
        </div>
        <StatsCards totals={totals} t={t} />
      </main>
    </div>
  )
}

export default App
