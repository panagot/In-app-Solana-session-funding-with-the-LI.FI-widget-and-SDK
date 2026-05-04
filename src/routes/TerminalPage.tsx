import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Link2,
  Server,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { LiFiTerminal } from '../features/lifi/LiFiTerminal'
import { parseQuickIntentParam } from '../features/lifi/widgetBaseConfig'

export function TerminalPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const intent = parseQuickIntentParam(searchParams.get('intent'))
  const fromHomeFundDemo = Boolean(
    (location.state as { fromFundDemo?: boolean } | null)?.fromFundDemo,
  )

  return (
    <div className="space-y-8 lg:space-y-10">
      {fromHomeFundDemo || intent ? (
        <div
          className="relative flex gap-3 overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/95 to-cyan-50/40 px-4 py-3.5 text-sm leading-relaxed text-sky-950 shadow-sm sm:px-5"
          role="status"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl"
          />
          <span className="relative mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <div className="relative space-y-1">
            {fromHomeFundDemo ? (
              <p>
                <strong className="text-sky-950">You continued from the Home fund-session preview.</strong> Use this
                page to fund <span className="font-medium">Solana for this visit</span> with the real{' '}
                <span className="font-medium">LI.FI</span> widget. Connect when you are ready, then compare live
                quotes, fees, and route steps before you sign.
              </p>
            ) : null}
            {intent && !fromHomeFundDemo ? (
              <p>
                <strong className="text-sky-950">Quick intent for funding Solana is active in the sidebar.</strong>{' '}
                The widget is pre-filled from your URL. Double-check amounts, fees, and hops in the LI.FI UI before
                confirming.
              </p>
            ) : null}
            {intent && fromHomeFundDemo ? (
              <p className="border-t border-sky-200/80 pt-2 text-sky-900">
                Active preset: <code className="st-code">{intent}</code>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <PageHeader
        kicker="Live execution · LI.FI widget"
        brandKicker
        title="Cross-chain terminal"
        description={
          <>
            Embedded <code className="st-code">LiFiWidget</code> with Solana-first quick intents. Presets write to
            the query string (for example <code className="st-code">?intent=fundSolana</code>) so links are
            shareable. <code className="st-code">buildUrl</code> keeps widget state in the URL; optional RPC URLs
            come from <code className="st-code">sdkConfig.rpcUrls</code> in env.
          </>
        }
        actions={
          <>
            <Link to="/" className="st-btn-ghost">
              Fund session demo
            </Link>
            <a
              href="https://docs.li.fi/widget/install-widget"
              target="_blank"
              rel="noopener noreferrer"
              className="st-btn-primary"
            >
              Widget docs
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.4} />
            </a>
          </>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 shadow-card">
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-6 sm:py-5">
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm">
              <Shield className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <p className="text-sm font-bold text-slate-900">Before you route</p>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            Connect a wallet in the widget, confirm chain and token details, then sign only what you expect. Funds
            stay in wallets the user controls. LI.FI does not custody assets; it routes what they approve. The same
            embed pattern fits games, video or streaming checkouts, web memberships, and other Solana-first surfaces.
            For the guided sample with preview-only balances, use{' '}
            <Link
              to="/"
              className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
            >
              Home → Fund session
            </Link>
            .
          </p>
        </div>
      </div>

      <section
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white px-5 py-5 sm:px-6"
        aria-labelledby="terminal-proof-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-12 h-40 w-40 rounded-full bg-sky-200/25 blur-3xl"
        />
        <h2
          id="terminal-proof-heading"
          className="relative flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-600"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500" />
          What this page shows
        </h2>
        <ul className="relative mt-3.5 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          {[
            {
              icon: Zap,
              title: 'LiFiWidget',
              body: (
                <>
                  Production widget with <code className="st-code">buildUrl</code> so wallet and route state stay
                  reflected in the address bar.
                </>
              ),
            },
            {
              icon: Link2,
              title: 'Quick intents',
              body: (
                <>
                  Presets set <code className="st-code">?intent=</code> (for example{' '}
                  <code className="st-code">fundSolana</code>) so a shared link opens the same preset for you or your
                  team.
                </>
              ),
            },
            {
              icon: Server,
              title: 'RPC hooks',
              body: (
                <>
                  Optional <code className="st-code">sdkConfig.rpcUrls</code> from env mirror how you would harden
                  reads in production.
                </>
              ),
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.title}
                className="flex gap-2.5 rounded-xl border border-slate-200/70 bg-white/90 px-3.5 py-3 backdrop-blur-sm transition hover:-translate-y-px hover:border-slate-300/80 hover:shadow-sm"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-700 ring-1 ring-sky-200/70">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <div className="min-w-0 leading-snug">
                  <strong className="block text-slate-900">{item.title}</strong>
                  <p className="mt-0.5 text-[12.5px] text-slate-600">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <LiFiTerminal />

      <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/50 to-white px-4 py-3.5 text-sm text-emerald-950 sm:px-5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} />
        <p>
          <strong>Non-custodial by design.</strong> LI.FI surfaces routes; your wallet always signs. Use{' '}
          <Link
            to="/liquidity-map"
            className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
          >
            Liquidity map
          </Link>{' '}
          to see where this widget sits in the broader stack, or{' '}
          <Link
            to="/flows"
            className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
          >
            User flows
          </Link>{' '}
          for typical journeys.
          <ArrowRight className="ml-1 inline h-3 w-3" strokeWidth={2.4} />
        </p>
      </div>
    </div>
  )
}
