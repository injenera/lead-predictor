# LeadPredictor

A marketing funnel calculator. Given a revenue goal, average order value and
expected response rates, it computes how many prospects, leads and customers a
campaign needs and distributes them across the campaign months.

## Formulas

- **Customers** = Total Revenue / Avg. Order Value
- **Leads** = Customers × 100 / Lead Response Rate %
- **Prospects** = Leads × 100 / Prospect Response Rate %

Totals are distributed evenly (cumulatively) across the number of months
between the campaign start and end dates and rendered as a stacked funnel
chart.

## Stack

- React 19 + TypeScript + Vite
- No runtime dependencies beyond React

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Deployment

The repo ships a `netlify.toml` — connect the repo in Netlify and it will
build with `npm run build` and publish `dist/`.
