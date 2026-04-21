import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { INTEGRATOR } from '../features/lifi/constants'

const external = [
  ['Widget playground', 'https://playground.li.fi'],
  ['Vite widget example', 'https://github.com/lifinance/widget/tree/main/examples/vite'],
] as const

export function Developers() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Integration"
        title="Developer integration"
        description="Patterns in this repository are structured so a production Solana team can lift them into their own app shell with minimal rework—whether you ship a game, a media surface, or a web app. Same integrator and env keys power the embedded widget and any SDK calls you add alongside it."
        actions={
          <>
            <a href="https://docs.li.fi/widget/install-widget" target="_blank" rel="noopener noreferrer" className="st-btn-primary">
              Install widget
            </a>
            <Link to="/terminal" className="st-btn-ghost">
              See it live
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {external.map(([label, href]) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="st-focus flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white px-5 py-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span>{label}</span>
            <span className="font-mono text-xs text-slate-500" aria-hidden>
              ↗
            </span>
          </a>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="st-card border-t border-slate-200">
          <div className="st-card-inner p-6 sm:p-7">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Integrator string</h2>
            <p className="mt-2 text-sm text-slate-600">
              Passed to <code className="st-code">LiFiWidget</code> and{' '}
              <code className="st-code">createConfig</code> for attribution.
            </p>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-50 p-4 font-mono text-sm text-slate-800 shadow-inner">
              {INTEGRATOR}
            </pre>
          </div>
        </div>
        <div className="st-card border-t border-slate-200">
          <div className="st-card-inner p-6 sm:p-7">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Environment variables</h2>
            <p className="mt-2 text-sm text-slate-600">
              Copy into <code className="st-code">.env</code> (or your host&apos;s secret store). Only{' '}
              <code className="st-code">VITE_LIFI_INTEGRATOR</code> is required for the demo build.
            </p>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-700 shadow-inner">
              {`VITE_LIFI_INTEGRATOR=
VITE_LIFI_API_KEY=          # optional
VITE_SOLANA_RPC_URL=
VITE_ETHEREUM_RPC_URL=
VITE_ARBITRUM_RPC_URL=
VITE_BASE_RPC_URL=
VITE_OPTIMISM_RPC_URL=
VITE_POLYGON_RPC_URL=`}
            </pre>
          </div>
        </div>
      </div>

      <div className="st-card">
        <div className="st-card-inner p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Official references</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            LI.FI maintains widget, SDK, and architecture docs — bookmark these when extending beyond the terminal shell.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {[
              ['Install widget', 'https://docs.li.fi/widget/install-widget'],
              ['Configure widget', 'https://docs.li.fi/widget/configure-widget'],
              ['Wallet management', 'https://docs.li.fi/widget/wallet-management'],
              ['Solana architecture', 'https://docs.li.fi/introduction/lifi-architecture/solana-overview'],
              ['docs index (llms.txt)', 'https://docs.li.fi/llms.txt'],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="st-focus flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                >
                  <span>{label}</span>
                  <span className="font-mono text-xs text-slate-500">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
