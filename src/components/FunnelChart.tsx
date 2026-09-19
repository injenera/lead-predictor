import { useState } from 'react'
import type { MonthBucket } from '../lib/calculations'
import type { Strings } from '../lib/i18n'

interface FunnelChartProps {
  buckets: MonthBucket[]
  t: Strings
}

const TICK_STEPS = [5, 10, 20, 25, 50, 100, 250, 500, 1000, 2500, 5000]

function pickStep(max: number): number {
  return TICK_STEPS.find((s) => max / s <= 7) ?? 10000
}

const W = 620
const H = 260
const PAD_L = 34
const PAD_R = 16
const PAD_T = 14
const PAD_B = 30

export function FunnelChart({ buckets, t }: FunnelChartProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const maxValue = Math.max(1, ...buckets.map((b) => b.prospects))
  const step = pickStep(maxValue)
  const axisMax = Math.ceil(maxValue / step) * step
  const ticks = Array.from({ length: axisMax / step + 1 }, (_, i) => i * step)

  const innerW = W - PAD_L - PAD_R
  const innerH = H - PAD_T - PAD_B
  const slot = innerH / buckets.length
  const barH = Math.min(34, slot * 0.58)
  const x = (v: number) => PAD_L + (v / axisMax) * innerW

  const hoveredBucket = hovered !== null ? buckets[hovered] : null

  return (
    <div className="panel chart-panel">
      <div className="chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img">
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={x(tick)}
              x2={x(tick)}
              y1={PAD_T}
              y2={H - PAD_B}
              className="gridline"
            />
          ))}

          {buckets.map((b, i) => {
            const cy = PAD_T + slot * i + slot / 2
            const y = cy - barH / 2
            const customersW = x(b.customers) - x(0)
            const leadsW = x(b.leads) - x(b.customers)
            const prospectsW = x(b.prospects) - x(b.leads)
            return (
              <g
                key={b.month}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <rect x={PAD_L} y={y} width={Math.max(0, customersW)} height={barH} className="seg-customers" />
                <rect x={x(b.customers)} y={y} width={Math.max(0, leadsW)} height={barH} className="seg-leads" />
                <rect x={x(b.leads)} y={y} width={Math.max(0, prospectsW)} height={barH} className="seg-prospects" />
                <rect x={PAD_L} y={PAD_T + slot * i} width={innerW} height={slot} fill="transparent" />
              </g>
            )
          })}

          {buckets.map((b, i) => (
            <text
              key={`label-${b.month}`}
              x={PAD_L - 10}
              y={PAD_T + slot * i + slot / 2}
              className="axis-label"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {b.month}
            </text>
          ))}

          <text
            x={12}
            y={PAD_T + innerH / 2}
            className="axis-title"
            textAnchor="middle"
            transform={`rotate(-90 12 ${PAD_T + innerH / 2})`}
          >
            {t.months}
          </text>

          {ticks.map((tick) => (
            <text
              key={`tick-${tick}`}
              x={x(tick)}
              y={H - PAD_B + 16}
              className="axis-label"
              textAnchor="middle"
            >
              {tick} {t.people}
            </text>
          ))}
        </svg>

        {hoveredBucket && (
          <div className="chart-tooltip" style={{ left: '46%', top: '38%' }}>
            <div className="tooltip-title">
              {t.month} #{hoveredBucket.month}
            </div>
            <div>
              {t.prospects}: {hoveredBucket.prospects}
            </div>
            <div>
              {t.leads}: {hoveredBucket.leads}
            </div>
            <div>
              {t.customers}: {hoveredBucket.customers}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
