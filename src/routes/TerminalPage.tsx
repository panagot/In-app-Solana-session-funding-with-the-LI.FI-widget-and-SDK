import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { LiFiTerminal } from '../features/lifi/LiFiTerminal'

export function TerminalPage() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Execution"
        title="Cross-chain terminal"
        description={
          <>
            Embedded <code className="st-code">LiFiWidget</code> with Solana-first quick intents. Intents sync to the
            query string (<code className="st-code">?intent=fundSolana</code> and friends) for shareable deep links.{' '}
            <code className="st-code">buildUrl</code> stays on for widget state in the URL; optional RPCs go through{' '}
            <code className="st-code">sdkConfig.rpcUrls</code>.
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
            Connect a wallet in the widget, confirm chain and token details, then sign only what you expect. The same
            embed pattern fits games, video or streaming checkouts, web memberships, and other Solana-first surfaces.
            For the guided sample with mock balances, use{' '}
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
          Live integration proof points
        </h2>
        <ul className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">LiFiWidget</strong> — Production widget build with{' '}
            <code className="st-code">buildUrl</code> so wallet + route state serialize into the address bar.
          </li>
          <li className="rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2.5 leading-snug">
            <strong className="text-slate-900">Quick intents</strong> — Presets write <code className="st-code">?intent=</code>{' '}
            (e.g. <code className="st-code">fundSolana</code>) for judges and support to reproduce paths.
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
