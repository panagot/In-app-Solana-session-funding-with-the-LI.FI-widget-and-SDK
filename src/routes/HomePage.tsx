import { useCallback, useMemo, useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Coins, MapPin, Sparkles, Zap } from 'lucide-react'
import { FundSessionDemo } from './FundSessionDemo'
import { OverviewPanel } from './OverviewPanel'

type HomeTab = 'session' | 'lifi'

function parseTab(value: string | null): HomeTab {
  return value === 'lifi' ? 'lifi' : 'session'
}

const STEPS = [
  {
    n: '01',
    icon: MapPin,
    title: 'Need on Solana',
    body: 'SOL or USDC on Solana for fees, gates, or checkout — while their spend balance often sits on Base, Ethereum, or elsewhere.',
  },
  {
    n: '02',
    icon: Coins,
    title: 'Fund in your app',
    body: 'Embed LI.FI so quotes, routes, and funding happen inside your product. No detached bridge tab.',
  },
  {
    n: '03',
    icon: ArrowRight,
    title: 'Continue',
    body: 'Same screen, same session. Balances meet your checks and they carry on in your flow.',
  },
]

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = useMemo(() => parseTab(searchParams.get('tab')), [searchParams])
  const sessionTabRef = useRef<HTMLButtonElement>(null)
  const lifiTabRef = useRef<HTMLButtonElement>(null)

  const setTab = useCallback(
    (next: HomeTab) => {
      setSearchParams(
        (prev) => {
          const n = new URLSearchParams(prev)
          if (next === 'session') n.delete('tab')
          else n.set('tab', 'lifi')
          return n
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const onTabListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setTab('lifi')
        queueMicrotask(() => lifiTabRef.current?.focus())
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setTab('session')
        queueMicrotask(() => sessionTabRef.current?.focus())
      } else if (e.key === 'Home') {
        e.preventDefault()
        setTab('session')
        sessionTabRef.current?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        setTab('lifi')
        lifiTabRef.current?.focus()
      }
    },
    [setTab],
  )

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 lg:space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-sky-50/40 shadow-card">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/45 via-cyan-200/30 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-100/40 via-sky-100/30 to-transparent blur-3xl"
        />
        <div className="relative px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl space-y-4">
              <span className="st-kicker-brand">
                <Sparkles className="h-3 w-3" strokeWidth={2.4} />
                Session-native funding · LI.FI × Solana
              </span>
              <h1 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-[2.25rem]">
                Fund users in place.{' '}
                <span className="bg-gradient-to-br from-sky-600 via-cyan-500 to-sky-700 bg-clip-text text-transparent">
                  Continue the same experience.
                </span>
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Keep people inside your product while LI.FI routes value to Solana for fees,
                paywalls, and purchases. No detached bridge tabs, no broken sessions.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setTab('session')}
                  className="st-btn-primary"
                >
                  <Zap className="h-4 w-4" strokeWidth={2.4} />
                  See the pattern
                </button>
                <button
                  type="button"
                  onClick={() => setTab('lifi')}
                  className="st-btn-ghost"
                >
                  Live LI.FI index
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </button>
              </div>
            </div>

            {/* Hero feature cards */}
            <ol className="grid w-full max-w-md shrink-0 gap-3 lg:max-w-sm">
              {STEPS.map((s) => {
                const Icon = s.icon
                return (
                  <li
                    key={s.n}
                    className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-sky-300/60 hover:shadow-md"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm ring-1 ring-slate-900/10"
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold tracking-wider text-sky-600">
                          {s.n}
                        </span>
                        <span className="text-[13px] font-semibold text-slate-900">
                          {s.title}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-slate-600">
                        {s.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Home sections"
          aria-orientation="horizontal"
          className="inline-flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1 shadow-sm backdrop-blur"
          onKeyDown={onTabListKeyDown}
        >
          <button
            ref={sessionTabRef}
            type="button"
            role="tab"
            id="home-tab-session"
            aria-selected={tab === 'session'}
            aria-controls="home-panel-session"
            aria-label="Fund session: pattern preview with Neon Drift demo (not live quotes)"
            tabIndex={tab === 'session' ? 0 : -1}
            className={`relative flex min-h-10 items-center gap-2 rounded-xl px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
              tab === 'session'
                ? 'bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            onClick={() => setTab('session')}
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            <span className="flex flex-col items-start leading-tight">
              <span>Fund session</span>
              <span
                className={`text-[9.5px] font-medium tracking-wide ${
                  tab === 'session' ? 'text-white/70' : 'text-slate-500'
                }`}
              >
                Pattern preview
              </span>
            </span>
          </button>
          <button
            ref={lifiTabRef}
            type="button"
            role="tab"
            id="home-tab-lifi"
            aria-selected={tab === 'lifi'}
            aria-controls="home-panel-lifi"
            aria-label="LI.FI: live index stats and ecosystem view from the SDK"
            tabIndex={tab === 'lifi' ? 0 : -1}
            className={`relative flex min-h-10 items-center gap-2 rounded-xl px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
              tab === 'lifi'
                ? 'bg-gradient-to-br from-sky-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            onClick={() => setTab('lifi')}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  tab === 'lifi' ? 'animate-ping bg-cyan-300' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  tab === 'lifi' ? 'bg-cyan-200' : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span>LI.FI</span>
              <span
                className={`text-[9.5px] font-medium tracking-wide ${
                  tab === 'lifi' ? 'text-white/75' : 'text-slate-500'
                }`}
              >
                Live index
              </span>
            </span>
          </button>
        </div>
      </div>

      <div
        role="tabpanel"
        id="home-panel-session"
        aria-labelledby="home-tab-session"
        hidden={tab !== 'session'}
        className="animate-fade-in"
      >
        {tab === 'session' ? <FundSessionDemo /> : null}
      </div>
      <div
        role="tabpanel"
        id="home-panel-lifi"
        aria-labelledby="home-tab-lifi"
        hidden={tab !== 'lifi'}
        className="animate-fade-in"
      >
        {tab === 'lifi' ? <OverviewPanel /> : null}
      </div>
    </div>
  )
}
