import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Hash,
  Layers,
  Network,
  Server,
  Sparkles,
  Terminal as TerminalIcon,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { SOLANA_CHAIN_ID, WSOL_MINT, SOL_NATIVE } from '../features/lifi/constants'

function RoutingDiagram() {
  return (
    <svg
      viewBox="0 0 720 320"
      className="h-auto w-full max-w-3xl"
      role="img"
      aria-label="Architecture diagram from user wallet through LI.FI to destination chains"
    >
      <defs>
        <linearGradient id="g-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="panel-flow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="lifi-card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.7" />
        </linearGradient>
        <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feFlood floodColor="rgba(15,23,42,0.12)" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="720" height="320" fill="url(#panel-flow)" rx="20" stroke="rgba(15,23,42,0.08)" />

      <text
        x="40"
        y="48"
        fill="#64748b"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        letterSpacing="2"
      >
        ROUTING TOPOLOGY
      </text>

      {/* User wallet */}
      <rect
        x="40"
        y="80"
        width="148"
        height="86"
        rx="14"
        fill="#ffffff"
        stroke="rgba(15,23,42,0.1)"
        filter="url(#soft-shadow)"
      />
      <text x="60" y="116" fill="#0f172a" fontSize="15" fontFamily="Inter, sans-serif" fontWeight="700">
        User wallet
      </text>
      <text x="60" y="138" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">
        EVM · SVM · UTXO · Sui
      </text>
      <text
        x="60"
        y="155"
        fill="#94a3b8"
        fontSize="9"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="1"
      >
        SELF-CUSTODY
      </text>

      {/* Arrow to LI.FI */}
      <path
        d="M198 122 H252"
        stroke="url(#g-flow)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <polygon points="252,122 264,122 258,134" fill="#0ea5e9" />

      {/* LI.FI router */}
      <rect
        x="278"
        y="68"
        width="212"
        height="110"
        rx="18"
        fill="url(#lifi-card)"
        stroke="rgba(14,165,233,0.3)"
        filter="url(#soft-shadow)"
      />
      <circle cx="300" cy="92" r="6" fill="#0ea5e9" />
      <text x="316" y="98" fill="#0c4a6e" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="800">
        LI.FI router
      </text>
      <text x="300" y="124" fill="#1e293b" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="500">
        Quotes · simulation · status
      </text>
      <text
        x="300"
        y="146"
        fill="#0284c7"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="600"
      >
        li.quest API / SDK
      </text>
      <rect
        x="300"
        y="156"
        width="60"
        height="14"
        rx="4"
        fill="#fff"
        stroke="rgba(14,165,233,0.3)"
      />
      <text x="306" y="166" fill="#0284c7" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        AGGREGATE
      </text>

      {/* Arrow to destinations */}
      <path d="M498 122 H548" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />

      {/* Solana */}
      <rect
        x="568"
        y="72"
        width="132"
        height="56"
        rx="12"
        fill="#ffffff"
        stroke="rgba(99,102,241,0.25)"
        filter="url(#soft-shadow)"
      />
      <circle cx="586" cy="100" r="5" fill="#8b5cf6" />
      <text x="600" y="105" fill="#0f172a" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">
        Solana
      </text>
      <text x="600" y="118" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono, monospace">
        SVM · primary
      </text>

      {/* EVM */}
      <rect
        x="568"
        y="140"
        width="132"
        height="56"
        rx="12"
        fill="#ffffff"
        stroke="rgba(15,23,42,0.1)"
        filter="url(#soft-shadow)"
      />
      <circle cx="586" cy="168" r="5" fill="#475569" />
      <text x="600" y="173" fill="#0f172a" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">
        EVM L2/L1
      </text>
      <text x="600" y="186" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono, monospace">
        BASE · ARB · ETH
      </text>

      {/* Connection curves */}
      <path d="M488 110 Q540 30 600 92" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M488 138 Q540 230 600 168" stroke="rgba(15,23,42,0.15)" strokeWidth="1.5" fill="none" />

      <text x="40" y="290" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">
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
        brandKicker
        title="Liquidity map"
        description="Where this app sits in the stack: users keep custody of their keys, LI.FI supplies quotes and routes across venues, and bridges or DEXs settle the movement on each chain."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              <TerminalIcon className="h-4 w-4" strokeWidth={2.4} />
              Open terminal
            </Link>
            <Link to="/flows" className="st-btn-ghost">
              User flows
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </Link>
          </>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-gradient-to-r from-slate-50/80 to-white px-5 py-3.5 sm:px-6">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
            <Network className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Reference
            </p>
            <p className="text-sm text-slate-600">
              High-level diagram only. Available routes change as LI.FI adds or updates integrations.
            </p>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <RoutingDiagram />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-cardHover">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-sm">
                <Hash className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Solana identifiers
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Use these when debugging presets or comparing against LI.FI chain metadata.
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-[11px] leading-relaxed text-slate-600">
              {[
                { label: 'chainId', value: SOLANA_CHAIN_ID, strong: true },
                { label: 'native SOL', value: SOL_NATIVE },
                { label: 'wSOL', value: WSOL_MINT },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-0.5 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white px-3 py-2 transition hover:border-slate-300/80"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className={`break-all ${item.strong ? 'text-slate-900' : 'text-slate-800'}`}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-cardHover">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
                <Layers className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h3 className="text-sm font-bold text-slate-900">Why use an aggregator</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Bridge and DEX options change often. LI.FI centralizes discovery, slippage limits, and status updates so
              your product does not have to chase every new venue or route by hand.
            </p>
            <Link
              to="/?tab=lifi"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-700 transition hover:text-sky-900"
            >
              See live index
              <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-cardHover">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm">
                <Server className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <h3 className="text-sm font-bold text-slate-900">Operational note</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Configure premium Solana RPC endpoints in production. Public RPCs are fine for demos but will
              rate-limit balances and simulations under load.
            </p>
            <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" strokeWidth={2.4} />
              <span>
                Env wiring: copy <code className="st-code">.env.example</code> to{' '}
                <code className="st-code">.env</code> at the project root and set integrator plus RPC URLs (see LI.FI
                widget docs for production guidance).
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
