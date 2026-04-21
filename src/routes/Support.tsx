import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'

export function Support() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Trust"
        title="Risk & support"
        description="Solstice Terminal is a demo front end. It does not custody funds, guarantee quotes, or endorse any third-party venue that LI.FI may surface."
        actions={
          <>
            <Link to="/terminal" className="st-btn-primary">
              Open terminal
            </Link>
            <Link to="/" className="st-btn-ghost">
              Home
            </Link>
          </>
        }
      />

      <section className="st-card border-amber-200/90">
        <div className="st-card-inner space-y-4 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-amber-950">Operational risks</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
            <li className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2.5">
              <span className="shrink-0 font-mono text-amber-700">!</span>
              <span>Cross-chain routes can partially complete; monitor LI.FI status APIs for recovery.</span>
            </li>
            <li className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2.5">
              <span className="shrink-0 font-mono text-amber-700">!</span>
              <span>Slippage and minimum-received values exist for a reason — review them before signing.</span>
            </li>
            <li className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2.5">
              <span className="shrink-0 font-mono text-amber-700">!</span>
              <span>Public RPC endpoints may throttle reads; use dedicated providers for production.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="st-card border-t border-slate-200">
        <div className="st-card-inner space-y-4 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            LI.FI lists community and support options on{' '}
            <a
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
              href="https://li.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              li.fi
            </a>
            . Technical depth lives in the{' '}
            <a
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
              href="https://docs.li.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>
            .
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              ['LI.FI Discord', 'https://discord.com/invite/lifi'],
              ['Status / incidents', 'https://status.li.fi'],
              ['Explorer', 'https://explorer.li.fi'],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="st-focus flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
                >
                  <span>{label}</span>
                  <span className="font-mono text-xs text-slate-500">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-5 py-5 sm:px-6">
        <p className="text-sm font-medium text-slate-900">Hackathon / judging</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Follow the README to run locally, then walk <strong className="font-medium text-slate-800">Home → Fund session → Terminal</strong>{' '}
          for the full demo path. The Neon Drift sample is intentionally generic—map it to your own game, video, or web
          product. On Home, add <code className="st-code">?tab=lifi</code> for the live LI.FI index view.
        </p>
      </section>
    </div>
  )
}
