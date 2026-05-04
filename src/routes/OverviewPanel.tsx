import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Layers,
  RefreshCcw,
  Repeat,
  Sparkles,
  Wand2,
  XCircle,
} from 'lucide-react'
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
  icon: Icon,
  accent = 'slate',
}: {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  accent?: 'slate' | 'sky' | 'emerald' | 'fuchsia'
}) {
  const accentMap = {
    slate: 'from-slate-500 to-slate-700',
    sky: 'from-sky-500 to-cyan-600',
    emerald: 'from-emerald-500 to-emerald-600',
    fuchsia: 'from-fuchsia-500 to-pink-600',
  } as const
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/60 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-cardHover">
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${accentMap[accent]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </div>
        <span
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentMap[accent]} text-white shadow-sm`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
      </div>
      <div className="relative mt-3 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text font-mono text-3xl font-bold tabular-nums text-transparent">
        {value}
      </div>
      {hint ? <p className="relative mt-2 text-xs leading-relaxed text-slate-600">{hint}</p> : null}
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
    <div className="space-y-12">
      {indexError ? (
        <div
          className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-50/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
          role="status"
        >
          <div className="flex gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm">
              <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <div className="text-sm text-amber-950">
              <p>
                Could not reach the LI.FI index (<code className="st-code">getChains</code> /{' '}
                <code className="st-code">getTools</code>). Stats and the chart stay empty until the request succeeds.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-amber-900/95">
                <li>
                  Confirm <code className="st-code">VITE_LIFI_INTEGRATOR</code> is set in your deployment environment
                  variables.
                </li>
                <li>
                  Add <code className="st-code">VITE_LIFI_API_KEY</code> for higher rate limits if traffic spikes (
                  <a
                    href="https://docs.li.fi/api-reference/rate-limits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-amber-400 underline-offset-2 hover:decoration-amber-600"
                  >
                    docs
                  </a>
                  ).
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="st-focus inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300 bg-white px-4 py-2 text-xs font-bold text-amber-950 shadow-sm transition hover:-translate-y-px hover:bg-amber-100 hover:shadow-md"
            onClick={() => refetchIndex()}
          >
            <RefreshCcw className="h-3 w-3" strokeWidth={2.4} />
            Retry
          </button>
        </div>
      ) : null}

      <PageHeader
        kicker="LI.FI · Solana frontier"
        brandKicker
        title="Live LI.FI index for Solana work"
        description="Same LI.FI engine as the fund-session pattern on Home. Here you see live index data from the SDK (chains, tools, ecosystem chart). Open the terminal to connect a wallet, pick a quick intent, and review every step before you sign."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              Open terminal
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </Link>
            <a
              href="https://docs.li.fi/widget/install-widget"
              target="_blank"
              rel="noopener noreferrer"
              className="st-btn-ghost"
            >
              Widget guide
              <ExternalLink className="h-3 w-3" strokeWidth={2.4} />
            </a>
          </>
        }
      />

      <section
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white px-5 py-5 sm:px-6"
        aria-labelledby="live-proof-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-12 h-40 w-40 rounded-full bg-sky-200/25 blur-3xl"
        />
        <h2
          id="live-proof-heading"
          className="relative flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-600"
        >
          <Activity className="h-3 w-3 text-sky-500" strokeWidth={2.6} />
          What&apos;s live on this tab
        </h2>
        <ul className="relative mt-3.5 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="flex gap-2.5 rounded-xl border border-slate-200/70 bg-white/90 px-3.5 py-3 backdrop-blur-sm transition hover:-translate-y-px hover:border-slate-300/80 hover:shadow-sm">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-700 ring-1 ring-sky-200/70">
              <Activity className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <div className="leading-snug">
              <strong className="block text-slate-900">SDK index</strong>
              <p className="mt-0.5 text-[12.5px] text-slate-600">
                <code className="st-code">getChains</code> / <code className="st-code">getTools</code> against
                production LI.FI APIs.
              </p>
            </div>
          </li>
          <li className="flex gap-2.5 rounded-xl border border-slate-200/70 bg-white/90 px-3.5 py-3 backdrop-blur-sm transition hover:-translate-y-px hover:border-slate-300/80 hover:shadow-sm">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 ring-1 ring-emerald-200/70">
              <Wand2 className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <div className="leading-snug">
              <strong className="block text-slate-900">Widget parity</strong>
              <p className="mt-0.5 text-[12.5px] text-slate-600">
                Terminal embed uses the same integrator and <code className="st-code">?intent=</code> presets.
              </p>
            </div>
          </li>
          <li className="flex gap-2.5 rounded-xl border border-slate-200/70 bg-white/90 px-3.5 py-3 backdrop-blur-sm transition hover:-translate-y-px hover:border-slate-300/80 hover:shadow-sm">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-50 to-pink-50 text-fuchsia-700 ring-1 ring-fuchsia-200/70">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <div className="leading-snug">
              <strong className="block text-slate-900">Shareable URLs</strong>
              <p className="mt-0.5 text-[12.5px] text-slate-600">
                Deep-link with{' '}
                <Link
                  to="/?tab=lifi"
                  className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
                >
                  <code className="st-code">?tab=lifi</code>
                </Link>{' '}
                or routes from the sidebar.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card animate-fade-up">
          <div className="space-y-4 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
                <Layers className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h2 className="text-lg font-bold text-slate-900">Why this stack</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              You get a full product shell: navigation, education surfaces, and a live execution widget, not a bare
              embed. The overview below is powered by the same <code className="st-code">@lifi/sdk</code> calls you
              would use for dashboards and monitoring in production.
            </p>
            <ul className="grid gap-2.5 text-sm text-slate-600 sm:grid-cols-2">
              {[
                'One integration for bridges, DEXs, and solver-style routes.',
                'Shareable deep links via widget URL mode.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white px-3 py-2.5"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card animate-fade-up [animation-delay:80ms]">
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
                <Activity className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-700">
                Live LI.FI index
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Pulled with <code className="st-code">getChains</code> / <code className="st-code">getTools</code>, the
              same API surface you would use for production telemetry.
            </p>
            <dl className="mt-5 space-y-3 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white p-4 font-mono text-xs">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
                <dt className="text-slate-600">Chains loaded</dt>
                <dd className="text-base font-bold tabular-nums text-slate-900">
                  {chainsQuery.isLoading ? '…' : chainsQuery.isError ? 'n/a' : chainSummary.total}
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
          icon={Globe2}
          accent="sky"
          value={chainsQuery.isLoading ? '…' : chainSummary.total}
          hint="Distinct networks from getChains()."
        />
        <StatCard
          label="Bridge adapters"
          icon={Repeat}
          accent="slate"
          value={toolsQuery.isLoading ? '…' : toolSummary.bridges}
          hint="Bridge protocols exposed via LI.FI."
        />
        <StatCard
          label="DEX / solvers"
          icon={Wand2}
          accent="fuchsia"
          value={toolsQuery.isLoading ? '…' : toolSummary.exchanges}
          hint="Swap venues including Jupiter on Solana."
        />
        <StatCard
          label="Solana footprint"
          icon={Sparkles}
          accent="emerald"
          value={chainsQuery.isLoading ? '…' : chainSummary.svm}
          hint="SVM chains in the LI.FI universe."
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
                <BarChart3 className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Ecosystem mix</h2>
                <p className="mt-0.5 max-w-xl text-sm text-slate-600">
                  Distribution of chain types currently advertised by LI.FI for routing.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 h-72 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white p-3 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" stroke="rgba(15,23,42,0.06)" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(14, 165, 233, 0.06)' }}
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid rgba(15,23,42,0.08)',
                    borderRadius: 14,
                    boxShadow: '0 8px 32px rgba(15,23,42,0.1)',
                    padding: '10px 14px',
                    backdropFilter: 'blur(6px)',
                  }}
                  labelStyle={{ color: '#0f172a', fontWeight: 700, marginBottom: 4 }}
                  itemStyle={{ color: '#334155' }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#barGradOverview)"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={56}
                />
                <defs>
                  <linearGradient id="barGradOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0c4a6e" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-red-200/70 bg-gradient-to-br from-red-50/40 to-white shadow-card">
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-red-500 text-white shadow-sm">
                <XCircle className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-700">Without LI.FI</h3>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
              {[
                'Maintain separate integrations per bridge and venue.',
                'Inconsistent UX and status tracking across protocols.',
                'Harder to swap routing when liquidity shifts.',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/50 to-white shadow-card">
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-sm">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">With LI.FI</h3>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
              {[
                'One API and widget for discovery, quotes, and execution.',
                'Unified route presentation, slippage, and minimum received.',
                'Redundant routing with operational visibility into steps.',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
