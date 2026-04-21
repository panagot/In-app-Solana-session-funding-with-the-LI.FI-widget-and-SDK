import { Link, useLocation, useSearchParams } from 'react-router-dom'
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
    <div className="space-y-10 lg:space-y-12">
      {fromHomeFundDemo || intent ? (
        <div
          className="rounded-2xl border border-sky-200/90 bg-sky-50/90 px-4 py-3.5 text-sm leading-relaxed text-sky-950 sm:px-5"
          role="status"
        >
          {fromHomeFundDemo ? (
            <p>
              <strong className="text-sky-950">You continued from the Home fund-session preview.</strong> Use this page
              to fund <span className="font-medium">Solana for this visit</span> with the real{' '}
              <span className="font-medium">LI.FI</span> widget—connect when you are ready, then compare live quotes,
              fees, and route steps before you sign.
            </p>
          ) : null}
          {intent && !fromHomeFundDemo ? (
            <p>
              <strong className="text-sky-950">Quick intent for funding Solana is active in the sidebar.</strong> The
              widget is pre-filled from your URL—double-check amounts, fees, and hops in the LI.FI UI before confirming.
            </p>
          ) : null}
          {intent && fromHomeFundDemo ? (
            <p className="mt-2 border-t border-sky-200/80 pt-2 text-sky-900">
              Active preset: <code className="st-code">{intent}</code>
            </p>
          ) : null}
        </div>
      ) : null}

      <PageHeader
        kicker="Execution"
        title="Cross-chain terminal"
        description={
          <>
            Embedded <code className="st-code">LiFiWidget</code> with Solana-first quick intents. Presets write to the
            query string (for example <code className="st-code">?intent=fundSolana</code>) so links are shareable.{' '}
            <code className="st-code">buildUrl</code> keeps widget state in the URL; optional RPC URLs come from{' '}
            <code className="st-code">sdkConfig.rpcUrls</code> in env.
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
            </a>
          </>
        }
      />

      <div className="st-card">
        <div className="st-card-inner flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-6 sm:py-5">
          <p className="shrink-0 text-sm font-medium text-slate-900">Before you route</p>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            Connect a wallet in the widget, confirm chain and token details, then sign only what you expect.             Funds stay in wallets the user controls—LI.FI does not custody assets; it routes what they approve. The same embed pattern
            fits games, video or streaming checkouts, web memberships, and other Solana-first surfaces. For the guided
            sample with preview-only balances, use{' '}
            <Link to="/" className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500">
              Home → Fund session
            </Link>
            .
          </p>
        </div>
      </div>

      <section
        className="rounded-2xl border border-slate-200/80 bg-slate-50/60 px-5 py-4 sm:px-6"
        aria-labelledby="terminal-proof-heading"
      >
        <h2 id="terminal-proof-heading" className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          What this page shows
        </h2>
        <ul className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">LiFiWidget</strong> — Production widget with{' '}
            <code className="st-code">buildUrl</code> so wallet and route state stay reflected in the address bar.
          </li>
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">Quick intents</strong> — Presets set <code className="st-code">?intent=</code>{' '}
            (for example <code className="st-code">fundSolana</code>) so judges or support can reproduce a path from a link.
          </li>
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">RPC hooks</strong> — Optional <code className="st-code">sdkConfig.rpcUrls</code>{' '}
            from env mirror how you would harden reads in production.
          </li>
        </ul>
      </section>

      <LiFiTerminal />
    </div>
  )
}
