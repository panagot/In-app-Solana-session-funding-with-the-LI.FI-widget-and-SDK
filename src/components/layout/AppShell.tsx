import { useEffect, useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { SideNav } from './SideNav'
import { Footer } from './Footer'

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
        className="st-focus sr-only rounded-lg bg-accent px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200/90 bg-white/90 px-4 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          className="st-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition hover:border-slate-300 hover:bg-white"
          aria-label="Open navigation"
          aria-expanded={sidebarOpen}
          aria-controls="site-sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="font-mono text-base leading-none">≡</span>
        </button>
        <Link
          to="/"
          className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
        >
          Solstice Terminal
        </Link>
        <a
          href="https://docs.li.fi"
          target="_blank"
          rel="noopener noreferrer"
          className="st-focus shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          Docs
        </a>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div
          className={`fixed inset-0 z-30 bg-slate-900/25 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden ${
            sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          id="site-sidebar"
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(100vw-3rem,18rem)] flex-col border-r border-slate-200/90 bg-white/95 shadow-nav backdrop-blur-xl transition-transform duration-300 ease-out lg:static lg:w-auto lg:translate-x-0 lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${collapsed ? 'lg:w-[4.25rem]' : 'lg:w-60'}`}
        >
          <div className="hidden border-b border-slate-200/90 lg:block">
            <div
              className={`flex items-center gap-2 px-2 py-2.5 ${collapsed ? 'flex-col' : 'justify-between'}`}
            >
              {collapsed ? (
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-300"
                  title="Solstice Terminal"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-800 ring-2 ring-slate-800/15" />
                </Link>
              ) : (
                <Link
                  to="/"
                  className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400/25 opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-slate-800 ring-2 ring-slate-800/12" />
                  </span>
                  <span className="truncate text-sm">
                    Solstice <span className="text-slate-500">Terminal</span>
                  </span>
                </Link>
              )}
              {!collapsed ? (
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-emerald-800 xl:inline-flex">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                    Mainnet
                  </span>
                  <a
                    href="https://docs.li.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="st-focus rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Docs
                  </a>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-end border-t border-slate-100 px-2 py-1.5">
              <button
                type="button"
                className="st-focus rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? '→' : '←'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/90 px-3 py-2 lg:hidden">
            <span className="pl-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Menu
            </span>
            <button
              type="button"
              className="st-focus rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="block text-lg leading-none">×</span>
            </button>
          </div>
          <SideNav
            collapsed={collapsed}
            onNavigate={() => setSidebarOpen(false)}
          />
        </aside>
        <main
          id="main-content"
          tabIndex={-1}
          className="st-grid-bg relative min-h-0 min-w-0 flex-1 bg-radial-fade outline-none focus-visible:ring-2 focus-visible:ring-slate-300/80"
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
