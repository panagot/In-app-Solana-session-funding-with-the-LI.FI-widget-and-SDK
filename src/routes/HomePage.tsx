import { useCallback, useMemo, useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FundSessionDemo } from './FundSessionDemo'
import { OverviewPanel } from './OverviewPanel'

type HomeTab = 'session' | 'lifi'

function parseTab(value: string | null): HomeTab {
  return value === 'lifi' ? 'lifi' : 'session'
}

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
    <div className="mx-auto w-full max-w-6xl space-y-4 lg:space-y-6">
      <div className="flex flex-col gap-3 border-b border-slate-200/90 pb-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div
          role="tablist"
          aria-label="Home sections"
          aria-orientation="horizontal"
          className="flex shrink-0 flex-wrap gap-2"
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
            className={`st-focus flex min-h-9 flex-col items-center justify-center gap-0 rounded-full px-3 py-1 text-center transition ${
              tab === 'session'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            onClick={() => setTab('session')}
          >
            <span className="text-[13px] font-semibold leading-none">Fund session</span>
            <span
              className={`text-[9px] font-medium leading-none ${
                tab === 'session' ? 'text-white/75' : 'text-slate-500'
              }`}
            >
              Pattern preview
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
            className={`st-focus flex min-h-9 flex-col items-center justify-center gap-0 rounded-full px-3 py-1 text-center transition ${
              tab === 'lifi'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            onClick={() => setTab('lifi')}
          >
            <span className="text-[13px] font-semibold leading-none">LI.FI</span>
            <span
              className={`text-[9px] font-medium leading-none ${
                tab === 'lifi' ? 'text-white/75' : 'text-slate-500'
              }`}
            >
              Live index
            </span>
          </button>
        </div>
        <ol className="m-0 grid min-w-0 flex-1 list-none items-stretch gap-3 p-0 sm:grid-cols-3 lg:max-w-3xl xl:max-w-none">
          {[
            {
              n: '1',
              t: 'Need on Solana',
              d: 'SOL or USDC on Solana for fees, gates, or checkout, while their spend balance often sits on Base, Ethereum, or elsewhere.',
            },
            {
              n: '2',
              t: 'Fund in your app',
              d: 'Embed LI.FI so quotes, routes, and funding happen inside your product, not a detached bridge tab.',
            },
            {
              n: '3',
              t: 'Continue',
              d: 'Same screen and session; balances meet your checks and they carry on in your flow.',
            },
          ].map((step) => (
            <li
              key={step.n}
              className="flex h-full min-h-0 gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-2.5 py-2.5 shadow-sm"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-mono text-xs font-bold text-white"
                aria-hidden
              >
                {step.n}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs font-semibold leading-tight text-slate-900">{step.t}</span>
                <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-600 sm:text-xs">
                  {step.d}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        role="tabpanel"
        id="home-panel-session"
        aria-labelledby="home-tab-session"
        hidden={tab !== 'session'}
      >
        {tab === 'session' ? <FundSessionDemo /> : null}
      </div>
      <div
        role="tabpanel"
        id="home-panel-lifi"
        aria-labelledby="home-tab-lifi"
        hidden={tab !== 'lifi'}
      >
        {tab === 'lifi' ? <OverviewPanel /> : null}
      </div>
    </div>
  )
}
