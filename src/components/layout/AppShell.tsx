import { useEffect, useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ExternalLink, Menu, X } from 'lucide-react'
import { SideNav } from './SideNav'
import { Footer } from './Footer'

function Logo() {
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-slate-900/10">
      <svg
        viewBox="0 0 32 32"
        className="h-4 w-4"
        aria-hidden
      >
        <defs>
          <linearGradient id="st-logo-flow" x1="4" y1="26" x2="28" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5eead4" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#st-logo-flow)"
          strokeWidth="2.4"
          strokeLinecap="round"
          d="M5 16c2.75-4.5 7.25-4.5 10 0 2.75 4.5 7.25 4.5 10 0"
        />
        <circle cx="9" cy="16" r="2.6" fill="url(#st-logo-flow)" />
        <circle cx="22" cy="16" r="2.6" fill="url(#st-logo-flow)" />
      </svg>
    </span>
  )
}

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (!sidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sidebarOpen])

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main-content"
        className="st-focus sr-only rounded-lg bg-sky-500 px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 flex min-h-14 shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 py-2.5 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          className="st-focus inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
          aria-controls="site-sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-4 w-4" strokeWidth={2.2} />
        </button>
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2.5">
          <Logo />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold tracking-tight text-slate-900">
              Solstice <span className="text-slate-400">Terminal</span>
            </span>
            <span className="mt-0.5 block truncate text-[10px] font-normal leading-snug text-slate-500">
              Session-native funding for Solana
            </span>
          </span>
        </Link>
        <a
          href="https://docs.li.fi"
          target="_blank"
          rel="noopener noreferrer"
          className="st-focus inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          Docs
          <ExternalLink className="h-3 w-3" strokeWidth={2.2} />
        </a>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div
          className={`fixed inset-0 z-30 bg-slate-900/35 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden ${
            sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          id="site-sidebar"
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(100vw-3rem,18rem)] flex-col border-r border-slate-200/80 bg-white/95 shadow-nav backdrop-blur-xl transition-transform duration-300 ease-out lg:static lg:w-auto lg:translate-x-0 lg:bg-white/70 lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${collapsed ? 'lg:w-[4.25rem]' : 'lg:w-64'}`}
        >
          <div className="hidden border-b border-slate-200/70 lg:block">
            <div className={`px-3 py-3.5 ${collapsed ? 'flex flex-col items-center gap-2' : 'space-y-2'}`}>
              {collapsed ? (
                <Link
                  to="/"
                  className="transition hover:opacity-80"
                  title="Solstice Terminal"
                >
                  <Logo />
                </Link>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to="/"
                      className="group flex min-w-0 flex-1 items-center gap-2.5 transition"
                    >
                      <Logo />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold tracking-tight text-slate-900 group-hover:text-slate-700">
                          Solstice <span className="text-slate-400">Terminal</span>
                        </span>
                        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-sky-600">
                          LI.FI · Solana
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-emerald-800">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                      Mainnet
                    </span>
                    <a
                      href="https://docs.li.fi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="st-focus inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      Docs
                      <ExternalLink className="h-2.5 w-2.5" strokeWidth={2.2} />
                    </a>
                  </div>
                  <p className="text-[11px] leading-snug text-slate-600">
                    Fund Solana for this visit, without sending people to a bridge tab.
                  </p>
                </>
              )}
            </div>
            <div className="flex items-center justify-end border-t border-slate-100 px-2 py-1.5">
              <button
                type="button"
                className="st-focus inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? (
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                ) : (
                  <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/70 px-3 py-2 lg:hidden">
            <span className="pl-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Menu
            </span>
            <button
              type="button"
              className="st-focus inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
          <SideNav collapsed={collapsed} onNavigate={() => setSidebarOpen(false)} />
        </aside>
        <main
          id="main-content"
          tabIndex={-1}
          className="st-grid-bg relative min-h-0 min-w-0 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80"
        >
          <div className="st-main-inner mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
