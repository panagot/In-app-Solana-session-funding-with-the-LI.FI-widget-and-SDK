import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'

const flows = [
  {
    title: 'Bridge into Solana',
    steps: [
      'User selects an origin EVM chain and token with sufficient liquidity.',
      'LI.FI requests quotes; bridges such as Mayan or Allbridge may fulfill the path.',
      'User signs the source transaction; LI.FI tracks status until funds land on Solana.',
    ],
  },
  {
    title: 'Cross-chain swap touching Solana',
    steps: [
      'Source and destination chains differ; route may combine bridge segments and swaps.',
      'Widget surfaces estimated output, fees, and minimum received after slippage.',
      'Each step exposes transaction hashes for support and treasury reconciliation.',
    ],
  },
  {
    title: 'Pure Solana swap',
    steps: [
      'Same-chain transfer stays entirely on Solana virtual machine.',
      'Jupiter and connected venues compete for best execution inside LI.FI.',
      'Single-signature experience when the route does not require auxiliary steps.',
    ],
  },
]

export function Flows() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Journeys"
        title="Representative flows"
        description="These journeys mirror what you can execute inside the terminal. Actual steps depend on live liquidity, venue availability, and wallet capabilities."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              Open terminal
            </Link>
            <Link to="/liquidity-map" className="st-btn-ghost">
              Liquidity map
            </Link>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {flows.map((flow, i) => (
          <article key={flow.title} className="st-card flex flex-col border-t border-slate-200">
            <div className="st-card-inner flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-mono text-sm font-bold text-slate-800">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug text-slate-900">{flow.title}</h2>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Happy path</p>
                </div>
              </div>
              <ol className="relative mt-6 flex-1 space-y-0 border-l border-slate-200 pl-6">
                {flow.steps.map((step, idx) => (
                  <li key={step} className="relative pb-6 last:pb-0">
                    <span
                      className="absolute -left-[25px] top-1.5 flex h-3 w-3 rounded-full border-2 border-white bg-slate-800 shadow-[0_0_0_2px_rgba(15,23,42,0.12)]"
                      aria-hidden
                    />
                    {idx < flow.steps.length - 1 ? (
                      <span
                        className="absolute -left-[22px] top-5 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-slate-300 to-transparent"
                        aria-hidden
                      />
                    ) : null}
                    <p className="text-sm leading-relaxed text-slate-600">
                      <span className="mr-2 font-mono text-[10px] font-bold text-slate-500">{idx + 1}.</span>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>

      <div className="st-card">
        <div className="st-card-inner flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Run a flow in the widget</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              Use quick intents on the terminal page to pre-fill common Solana routes, or start from the fund-session
              sample on Home—the same orchestration idea whether you ship a game client, a video surface, or a web app.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/terminal" className="st-btn-primary">
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
