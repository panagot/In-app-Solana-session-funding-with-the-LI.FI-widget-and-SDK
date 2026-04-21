import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { SOLANA_CHAIN_ID, WSOL_MINT, SOL_NATIVE } from '../features/lifi/constants'

function RoutingDiagram() {
  return (
    <svg
      viewBox="0 0 720 300"
      className="h-auto w-full max-w-3xl text-slate-800"
      role="img"
      aria-label="Architecture diagram from user wallet through LI.FI to destination chains"
    >
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#334155" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="panel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#f5f5f7" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="720" height="300" fill="url(#panel)" rx="18" stroke="rgba(0,0,0,0.08)" />
      <text x="40" y="44" fill="#86868b" fontSize="11" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
        ROUTING TOPOLOGY
      </text>
      <rect x="40" y="64" width="148" height="80" rx="12" fill="#ffffff" stroke="rgba(0,0,0,0.08)" />
      <text x="60" y="98" fill="#1d1d1f" fontSize="15" fontFamily="IBM Plex Sans, sans-serif" fontWeight="600">
        User wallet
      </text>
      <text x="60" y="122" fill="#86868b" fontSize="11" fontFamily="IBM Plex Sans, sans-serif">
        EVM · SVM · UTXO · Sui
      </text>
      <path d="M198 104 H258" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
      <polygon points="258,104 270,104 264,116" fill="#334155" />
      <rect x="278" y="52" width="212" height="104" rx="14" fill="#fbfbfd" stroke="rgba(15,23,42,0.12)" />
      <text x="300" y="88" fill="#1e293b" fontSize="16" fontFamily="IBM Plex Sans, sans-serif" fontWeight="700">
        LI.FI router
      </text>
      <text x="300" y="114" fill="#6e6e73" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">
        Quotes · simulation · status
      </text>
      <text x="300" y="138" fill="#86868b" fontSize="10" fontFamily="IBM Plex Mono, monospace">
        li.quest API / SDK
      </text>
      <path d="M498 104 H552" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round" />
      <rect x="568" y="56" width="132" height="52" rx="10" fill="#ffffff" stroke="rgba(15,23,42,0.1)" />
      <text x="588" y="88" fill="#1d1d1f" fontSize="13" fontFamily="IBM Plex Sans, sans-serif" fontWeight="600">
        Solana
      </text>
      <rect x="568" y="124" width="132" height="52" rx="10" fill="#ffffff" stroke="rgba(0,0,0,0.08)" />
      <text x="588" y="156" fill="#1d1d1f" fontSize="13" fontFamily="IBM Plex Sans, sans-serif" fontWeight="600">
        EVM L2/L1
      </text>
      <path d="M488 96 Q540 28 600 82" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" />
      <path d="M488 118 Q540 210 600 148" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" />
      <text x="40" y="268" fill="#86868b" fontSize="11" fontFamily="IBM Plex Sans, sans-serif">
        Jupiter, Mayan, Allbridge, and other adapters compete inside LI.FI for best execution.
      </text>
    </svg>
  )
}

export function LiquidityMap() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Architecture"
        title="Liquidity map"
        description="Where Solstice Terminal sits in the stack: your wallets stay primary, LI.FI handles routing and transaction packaging, and underlying venues settle flow."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              Open terminal
            </Link>
            <Link to="/flows" className="st-btn-ghost">
              User flows
            </Link>
          </>
        }
      />

      <div className="st-card overflow-hidden">
        <div className="st-card-inner border-b border-slate-100 px-4 py-3 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Reference</p>
          <p className="mt-1 text-sm text-slate-600">
            High-level topology only — route inventory changes with LI.FI releases.
          </p>
        </div>
        <div className="st-card-inner p-4 sm:p-6">
          <RoutingDiagram />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="st-card border-t border-slate-200">
          <div className="st-card-inner p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Solana identifiers</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Use these when debugging presets or comparing against LI.FI chain metadata.
            </p>
            <ul className="mt-4 space-y-3 font-mono text-[11px] leading-relaxed text-slate-600">
              <li className="flex flex-col gap-0.5 rounded-lg border border-slate-200/90 bg-slate-50 px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">chainId</span>
                <span className="break-all text-slate-900">{SOLANA_CHAIN_ID}</span>
              </li>
              <li className="flex flex-col gap-0.5 rounded-lg border border-slate-200/90 bg-slate-50 px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">native SOL</span>
                <span className="break-all text-slate-800">{SOL_NATIVE}</span>
              </li>
              <li className="flex flex-col gap-0.5 rounded-lg border border-slate-200/90 bg-slate-50 px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">wSOL</span>
                <span className="break-all text-slate-800">{WSOL_MINT}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="st-card border-t border-slate-200">
          <div className="st-card-inner p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900">Why aggregation</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Bridge and DEX inventory changes weekly. LI.FI centralizes discovery, slippage guards, and status
              tracking so your interface does not fork every time a venue ships a new route.
            </p>
          </div>
        </div>
        <div className="st-card border-t border-slate-200">
          <div className="st-card-inner p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900">Operational note</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Configure premium Solana RPC endpoints in production. Public RPCs are fine for demos but will rate-limit
              balances and simulations under load.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Env wiring lives on{' '}
              <Link
                to="/developers"
                className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
              >
                Integration
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
