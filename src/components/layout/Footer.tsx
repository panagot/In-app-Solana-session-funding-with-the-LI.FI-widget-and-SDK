import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const footerLink =
  'inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-slate-900'

function ExternalIcon() {
  return <ExternalLink className="h-2.5 w-2.5 opacity-60" strokeWidth={2.4} />
}

function Logo() {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-slate-900/10">
      <svg viewBox="0 0 32 32" className="h-4 w-4" aria-hidden>
        <defs>
          <linearGradient
            id="footer-flow"
            x1="4"
            y1="26"
            x2="28"
            y2="6"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5eead4" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#footer-flow)"
          strokeWidth="2.4"
          strokeLinecap="round"
          d="M5 16c2.75-4.5 7.25-4.5 10 0 2.75 4.5 7.25 4.5 10 0"
        />
        <circle cx="9" cy="16" r="2.6" fill="url(#footer-flow)" />
        <circle cx="22" cy="16" r="2.6" fill="url(#footer-flow)" />
      </svg>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/20 via-cyan-200/15 to-transparent blur-3xl"
      />
      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-2.5">
            <Logo />
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900">
                Solstice <span className="text-slate-400">Terminal</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">
                LI.FI · Solana
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Non-custodial UI on top of LI.FI routing: you always hold the signing keys. Fund-session flows are meant
            to sit beside real products (games, media, passes, sites), not only demos. Built for the LI.FI × Solana
            Frontier track; verify every transaction in your wallet before you approve.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
              Mainnet
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Non-custodial
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              LI.FI
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link className={footerLink} to="/">
                  Home (fund session + LI.FI)
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/terminal">
                  Terminal
                </Link>
              </li>
              <li>
                <a className={footerLink} href="https://li.fi" target="_blank" rel="noopener noreferrer">
                  Website <ExternalIcon />
                </a>
              </li>
              <li>
                <a className={footerLink} href="https://docs.li.fi" target="_blank" rel="noopener noreferrer">
                  Documentation <ExternalIcon />
                </a>
              </li>
              <li>
                <a className={footerLink} href="https://explorer.li.fi" target="_blank" rel="noopener noreferrer">
                  Explorer <ExternalIcon />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Solana
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  className={footerLink}
                  href="https://solana.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Core docs <ExternalIcon />
                </a>
              </li>
              <li>
                <a
                  className={footerLink}
                  href="https://docs.li.fi/introduction/lifi-architecture/solana-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LI.FI Solana overview <ExternalIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-slate-200/70 bg-white/50 py-5 text-center font-mono text-[11px] text-slate-500 backdrop-blur">
        Built with{' '}
        <a
          href="https://li.fi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-700 transition hover:text-sky-700"
        >
          LI.FI
        </a>{' '}
        · © {new Date().getFullYear()}
      </div>
    </footer>
  )
}
