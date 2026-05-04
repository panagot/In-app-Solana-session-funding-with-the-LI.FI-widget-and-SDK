import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  LifeBuoy,
  Map,
  MessageCircle,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const supportLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'LI.FI Discord', href: 'https://discord.com/invite/lifi', icon: MessageCircle },
  { label: 'Status / incidents', href: 'https://status.li.fi', icon: AlertTriangle },
  { label: 'Explorer', href: 'https://explorer.li.fi', icon: Map },
]

export function Support() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 lg:space-y-12">
      <PageHeader
        kicker="Trust & support"
        brandKicker
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

      <section className="overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/60 to-white shadow-card">
        <div className="space-y-4 p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm">
              <AlertTriangle className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h2 className="text-base font-bold text-amber-950">Operational risks</h2>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700">
            {[
              'Cross-chain routes can partially complete; monitor LI.FI status APIs for recovery.',
              'Slippage and minimum-received values exist for a reason. Review them before signing.',
              'Public RPC endpoints may throttle reads; use dedicated providers for production.',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/70 px-3.5 py-2.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-[10px] font-bold text-amber-800">
                  !
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="space-y-4 p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
              <LifeBuoy className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <h2 className="text-lg font-bold text-slate-900">Need help?</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            LI.FI lists community and support options on{' '}
            <a
              className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
              href="https://li.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              li.fi
            </a>
            . Technical depth lives in the{' '}
            <a
              className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
              href="https://docs.li.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="-mb-px mr-0.5 inline h-3 w-3" strokeWidth={2.4} />
              documentation
            </a>
            .
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {supportLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="st-focus group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white px-4 py-3 text-sm text-slate-800 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-white hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-sky-600" strokeWidth={2.4} />
                    {label}
                  </span>
                  <ExternalLink className="h-3 w-3 text-slate-400 transition group-hover:text-slate-700" strokeWidth={2.4} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-sky-50/40 to-white px-5 py-5 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-8 h-32 w-32 rounded-full bg-cyan-200/25 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
            <Sparkles className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Suggested walkthrough</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Walk{' '}
              <Link
                to="/"
                className="font-bold text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
              >
                Home → Fund session
              </Link>{' '}
              <ArrowUpRight className="-mb-px inline h-3 w-3" strokeWidth={2.4} /> for the full demo path. The Neon
              Drift sample is intentionally generic; map it to your own game, video, or web product. On Home, add{' '}
              <code className="st-code">?tab=lifi</code> for the live LI.FI index view.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
