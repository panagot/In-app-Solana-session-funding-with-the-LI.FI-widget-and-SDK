import { Link } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../components/ui/PageHeader'
import { useLifiStats } from '../features/lifi/useLifiStats'
import { SOLANA_CHAIN_ID } from '../features/lifi/constants'

function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="st-card group">
      <div className="st-card-inner border-t-2 border-slate-200 p-5 pt-4">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </div>
        <div className="mt-3 bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text font-mono text-3xl font-semibold tabular-nums text-transparent">
          {value}
        </div>
        {hint ? <p className="mt-2 text-xs leading-relaxed text-slate-600">{hint}</p> : null}
      </div>
    </div>
  )
}

/** Former landing page: stats, charts, and LI.FI narrative (shown under Home → LI.FI tab). */
export function OverviewPanel() {
  const { chainsQuery, toolsQuery, chainSummary, toolSummary } = useLifiStats()
  const indexError = chainsQuery.isError || toolsQuery.isError
  const refetchIndex = () => {
    void chainsQuery.refetch()
    void toolsQuery.refetch()
  }

  const chartData = [
    { name: 'EVM', count: chainSummary.evm },
    { name: 'Solana', count: chainSummary.svm },
    { name: 'Bitcoin', count: chainSummary.utxo },
    { name: 'Sui', count: chainSummary.mvm },
  ]

  return (
    <div className="space-y-14">
      {indexError ? (
        <div
          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4"
          role="status"
        >
          <p className="text-sm text-amber-950">
            Could not reach the LI.FI index (<code className="st-code">getChains</code> /{' '}
            <code className="st-code">getTools</code>). Stats and the chart may be stale or empty until the request
            succeeds.
          </p>
          <button
            type="button"
            className="st-focus mt-3 shrink-0 rounded-full border border-amber-300 bg-white px-4 py-2 text-xs font-semibold text-amber-950 transition hover:bg-amber-100 sm:mt-0"
            onClick={() => refetchIndex()}
          >
            Retry
          </button>
        </div>
      ) : null}

      <PageHeader
        kicker="LI.FI · Solana frontier"
        title="Institutional-grade routing for Solana liquidity."
        description="Same LI.FI engine as the fund-session pattern on Home—this tab focuses on live index telemetry from the SDK (chains, tools, ecosystem chart). Open the terminal to connect a wallet, pick a quick intent, and route with full transparency."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              Open terminal
            </Link>
            <a
              href="https://docs.li.fi/widget/install-widget"
              target="_blank"
              rel="noopener noreferrer"
              className="st-btn-ghost"
            >
              Widget guide
            </a>
          </>
        }
      />

      <section
        className="rounded-2xl border border-slate-200/80 bg-slate-50/60 px-5 py-4 sm:px-6"
        aria-labelledby="live-proof-heading"
      >
        <h2 id="live-proof-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          What&apos;s live on this tab
        </h2>
        <ul className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">SDK index</strong> — <code className="st-code">getChains</code> /{' '}
            <code className="st-code">getTools</code> against production LI.FI APIs (same surface as telemetry).
          </li>
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">Widget parity</strong> — Terminal embed uses the same integrator and{' '}
            <code className="st-code">?intent=</code> quick presets as this demo shell.
          </li>
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">Shareable URLs</strong> — Deep-link home stats with{' '}
            <Link to="/?tab=lifi" className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500">
              <code className="st-code">?tab=lifi</code>
            </Link>{' '}
            or routes from the sidebar.
          </li>
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_minmax(0,1fr)]">
        <div className="st-card animate-fade-up">
          <div className="st-card-inner space-y-4 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Why this stack</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              You get a full product shell: navigation, education surfaces, and a live execution widget—not a bare embed.
              The overview below is powered by the same{' '}
              <code className="st-code">@lifi/sdk</code> calls you would use for dashboards and
              monitoring in production.
            </p>
            <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <li className="flex gap-2 rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5">
                <span className="text-slate-400" aria-hidden>
                  ◆
                </span>
                <span>One integration for bridges, DEXs, and Solvers.</span>
              </li>
              <li className="flex gap-2 rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2.5">
                <span className="text-slate-400" aria-hidden>
                  ◆
                </span>
                <span>Shareable deep links via widget URL mode.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="st-card animate-fade-up [animation-delay:80ms]">
          <div className="st-card-inner p-6 sm:p-7">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Live LI.FI index
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Pulled with <code className="st-code">getChains</code> /{' '}
              <code className="st-code">getTools</code> — identical surface area to production
              telemetry.
            </p>
            <dl className="mt-6 space-y-3 rounded-xl border border-slate-200/90 bg-slate-50 p-4 font-mono text-xs">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
                <dt className="text-slate-600">Chains loaded</dt>
                <dd className="tabular-nums text-slate-900">
                  {chainsQuery.isLoading ? '…' : chainsQuery.isError ? '—' : chainSummary.total}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 pt-1">
                <dt className="shrink-0 text-slate-600">LI.FI Solana id</dt>
                <dd className="break-all text-right text-[11px] text-slate-800">{SOLANA_CHAIN_ID}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Supported chains"
          value={chainsQuery.isLoading ? '…' : chainSummary.total}
          hint="Distinct networks from getChains()."
        />
        <StatCard
          label="Bridge adapters"
          value={toolsQuery.isLoading ? '…' : toolSummary.bridges}
          hint="Bridge protocols exposed via LI.FI."
        />
        <StatCard
          label="DEX / solvers"
          value={toolsQuery.isLoading ? '…' : toolSummary.exchanges}
          hint="Swap venues including Jupiter on Solana."
        />
        <StatCard
          label="Solana footprint"
          value={chainsQuery.isLoading ? '…' : chainSummary.svm}
          hint="SVM chains in the LI.FI universe."
        />
      </section>

      <section className="st-card overflow-hidden">
        <div className="st-card-inner p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Ecosystem mix</h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Distribution of chain types currently advertised by LI.FI for routing.
              </p>
            </div>
          </div>
          <div className="mt-8 h-72 w-full rounded-xl border border-slate-200/90 bg-slate-50 p-2 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" stroke="rgba(0,0,0,0.06)" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6e6e73', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#86868b', fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    padding: '12px 14px',
                  }}
                  labelStyle={{ color: '#1d1d1f', fontWeight: 600, marginBottom: 4 }}
                  itemStyle={{ color: '#334155' }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#barGradOverview)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={56}
                />
                <defs>
                  <linearGradient id="barGradOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="st-card border-red-200/80">
          <div className="st-card-inner p-6 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-700">
              Without LI.FI
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="text-red-500">—</span>
                Maintain separate integrations per bridge and venue.
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">—</span>
                Inconsistent UX and status tracking across protocols.
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">—</span>
                Harder to swap routing when liquidity shifts.
              </li>
            </ul>
          </div>
        </div>
        <div className="st-card border-emerald-200/80">
          <div className="st-card-inner p-6 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              With LI.FI
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="text-emerald-600">+</span>
                One API and widget for discovery, quotes, and execution.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600">+</span>
                Unified route presentation, slippage, and minimum received.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600">+</span>
                Redundant routing with operational visibility into steps.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
