import { Link } from 'react-router-dom'

const footerLink =
  'text-sm text-slate-600 transition hover:text-slate-900 hover:underline hover:underline-offset-4'

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200/90 bg-gradient-to-b from-white to-slate-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-800 ring-2 ring-slate-800/12" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">Solstice Terminal</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Non-custodial UI on top of LI.FI routing—you always hold the signing keys. Fund-session flows are meant to
            sit beside real products (games, media, passes, sites), not only demos. Built for the LI.FI × Solana Frontier
            track; verify every transaction in your wallet before you approve.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
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
                <a className={footerLink} href="https://li.fi">
                  Website
                </a>
              </li>
              <li>
                <a className={footerLink} href="https://docs.li.fi">
                  Documentation
                </a>
              </li>
              <li>
                <a className={footerLink} href="https://explorer.li.fi">
                  Explorer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Solana
            </div>
            <ul className="space-y-2.5">
              <li>
                <a className={footerLink} href="https://solana.com/docs">
                  Core docs
                </a>
              </li>
              <li>
                <a
                  className={footerLink}
                  href="https://docs.li.fi/introduction/lifi-architecture/solana-overview"
                >
                  LI.FI Solana overview
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-5 text-center font-mono text-[11px] text-slate-500">
        Built with LI.FI · © {new Date().getFullYear()}
      </div>
    </footer>
  )
}
