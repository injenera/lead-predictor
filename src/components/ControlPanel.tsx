import type { CalculatorInputs, CurrencyCode, Language } from '../types'
import { currencyOptions, currencySymbol, languageOptions, type Strings } from '../lib/i18n'
import { FlagIcon } from './FlagIcon'

interface ControlPanelProps {
  inputs: CalculatorInputs
  onChange: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void
  t: Strings
}

export function ControlPanel({ inputs, onChange, t }: ControlPanelProps) {
  const symbol = currencySymbol(inputs.currency)
  const activeFlag = languageOptions.find((l) => l.code === inputs.language)?.flag ?? 'us'

  return (
    <aside className="panel control-panel">
      <div className="field">
        <label htmlFor="language">{t.language}</label>
        <div className="select-wrap">
          <FlagIcon flag={activeFlag} />
          <select
            id="language"
            value={inputs.language}
            onChange={(e) => onChange('language', e.target.value as Language)}
          >
            {languageOptions.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="currency">{t.currency}</label>
        <div className="select-wrap">
          <span className="select-symbol">{symbol}</span>
          <select
            id="currency"
            value={inputs.currency}
            onChange={(e) => onChange('currency', e.target.value as CurrencyCode)}
          >
            {currencyOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="campaign-start">{t.campaignStart}</label>
        <input
          id="campaign-start"
          type="date"
          value={inputs.campaignStart}
          onChange={(e) => onChange('campaignStart', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="campaign-end">{t.campaignEnd}</label>
        <input
          id="campaign-end"
          type="date"
          value={inputs.campaignEnd}
          onChange={(e) => onChange('campaignEnd', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="total-revenue">{t.totalRevenue}</label>
        <div className="input-wrap">
          <span className="input-symbol">{symbol}</span>
          <input
            id="total-revenue"
            type="number"
            min={0}
            value={inputs.totalRevenue}
            onChange={(e) => onChange('totalRevenue', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="avg-order-value">{t.avgOrderValue}</label>
        <div className="input-wrap">
          <span className="input-symbol">{symbol}</span>
          <input
            id="avg-order-value"
            type="number"
            min={0}
            value={inputs.avgOrderValue}
            onChange={(e) => onChange('avgOrderValue', Number(e.target.value))}
          />
        </div>
      </div>
    </aside>
  )
}
