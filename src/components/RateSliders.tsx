import type { CSSProperties } from 'react'
import type { CalculatorInputs } from '../types'
import type { Strings } from '../lib/i18n'

interface RateSlidersProps {
  leadRate: number
  prospectRate: number
  onChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void
  t: Strings
}

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="slider-row">
      <label>{label}</label>
      <div className="slider-track-wrap">
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          style={{ '--fill': `${value}%` } as CSSProperties}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <span className="slider-value">{value.toFixed(2)}%</span>
    </div>
  )
}

export function RateSliders({ leadRate, prospectRate, onChange, t }: RateSlidersProps) {
  return (
    <div className="panel sliders-panel">
      <SliderRow
        label={t.leadResponseRate}
        value={leadRate}
        onChange={(v) => onChange('leadResponseRate', v)}
      />
      <SliderRow
        label={t.prospectResponseRate}
        value={prospectRate}
        onChange={(v) => onChange('prospectResponseRate', v)}
      />
    </div>
  )
}
