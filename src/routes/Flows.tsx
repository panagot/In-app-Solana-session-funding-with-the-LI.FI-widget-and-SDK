import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  GitBranch,
  Repeat,
  Shuffle,
  Terminal as TerminalIcon,
  type LucideIcon,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

type FlowConfig = {
  title: string
  steps: string[]
  icon: LucideIcon
  accent: 'sky' | 'fuchsia' | 'emerald'
}

const flows: FlowConfig[] = [
  {
    title: 'Bridge into Solana',
    icon: Compass,
    accent: 'sky',
    steps: [
      'User selects an origin EVM chain and token with sufficient liquidity.',
      'LI.FI requests quotes; bridges such as Mayan or Allbridge may fulfill the path.',
      'User signs the source transaction; LI.FI tracks status until funds land on Solana.',
    ],
  },
  {
    title: 'Cross-chain swap touching Solana',
    icon: Shuffle,
    accent: 'fuchsia',
    steps: [
      'Source and destination chains differ; route may combine bridge segments and swaps.',
      'Widget surfaces estimated output, fees, and minimum received after slippage.',
      'Each step exposes transaction hashes for support and treasury reconciliation.',
    ],
  },
  {
    title: 'Pure Solana swap',
    icon: Repeat,
    accent: 'emerald',
    steps: [
      'Same-chain transfer stays entirely on Solana virtual machine.',
      'Jupiter and connected venues compete for best execution inside LI.FI.',
      'Single-signature experience when the route does not require auxiliary steps.',
    ],
  },
]

const accentClasses: Record<FlowConfig['accent'], string> = {
  sky: 'from-sky-500 to-cyan-500',
  fuchsia: 'from-fuchsia-500 to-pink-500',
  emerald: 'from-emerald-500 to-teal-500',
}

export function Flows() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <PageHeader
        kicker="User flows"
        brandKicker
        title="Typical journeys"
        description="These steps mirror what users can run in the terminal. Real flows depend on live liquidity, which venues are available, and the wallet they connect."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              <TerminalIcon className="h-4 w-4" strokeWidth={2.4} />
              Open terminal
            </Link>
            <Link to="/liquidity-map" className="st-btn-ghost">
              Liquidity map
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </Link>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {flows.map((flow, i) => {
          const Icon = flow.icon
          return (
            <article
              key={flow.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-cardHover"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${accentClasses[flow.accent]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20`}
              />
              <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentClasses[flow.accent]} text-white shadow-sm`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold leading-snug text-slate-900">{flow.title}</h2>
                    <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {String(i + 1).padStart(2, '0')} · Happy path
                    </p>
                  </div>
                </div>
                <ol className="relative mt-6 flex-1 space-y-0 border-l-2 border-slate-200/80 pl-6">
                  {flow.steps.map((step, idx) => (
                    <li key={step} className="relative pb-5 last:pb-0">
                      <span
                        className={`absolute -left-[27px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${accentClasses[flow.accent]} text-[9px] font-bold text-white shadow-[0_0_0_3px_white,0_0_0_4px_rgba(15,23,42,0.06)]`}
                        aria-hidden
                      >
                        {idx + 1}
                      </span>
                      <p className="text-[13.5px] leading-relaxed text-slate-600">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-sky-50/40 shadow-card">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-sky-200/35 to-cyan-200/25 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
              <GitBranch className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Try it in the widget</h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                On the terminal page, use{' '}
                <strong className="font-medium text-slate-800">quick intents</strong> to pre-fill common Solana
                routes. On Home, open <strong className="font-medium text-slate-800">Fund session</strong> to see the
                same orchestration pattern for a game, video product, or web app.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/terminal" className="st-btn-primary">
              <TerminalIcon className="h-4 w-4" strokeWidth={2.4} />
              Go to terminal
            </Link>
            <Link to="/" className="st-btn-ghost">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
