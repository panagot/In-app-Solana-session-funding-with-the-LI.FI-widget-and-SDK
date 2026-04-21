import { useCallback, useMemo, useRef, type KeyboardEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-3xl space-y-4 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-4 sm:px-5 sm:py-5">
        <div className="space-y-2">
          <p className="text-base font-semibold leading-snug text-slate-900">
            Fund Solana for this visit—without sending people to a bridge tab.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Your surface needs SOL or USDC on Solana; their spending balance often sits on Base, Ethereum, or another
            chain. Embed LI.FI in your UI so they top up and land back on the same screen.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            { n: '1', t: 'Need on Solana', d: 'Fees, gate USDC, or checkout—your rules.' },
            { n: '2', t: 'Fund in your app', d: 'Short step with LI.FI quotes and routes.' },
            { n: '3', t: 'Continue', d: 'Same session; balances meet your checks.' },
          ].map((step) => (
            <li
              key={step.n}
              className="flex gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-mono text-sm font-bold text-white"
                aria-hidden
              >
                {step.n}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900">{step.t}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-600">{step.d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-relaxed text-slate-500">
          Routing and execution use{' '}
          <a
            href="https://docs.li.fi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
          >
            LI.FI
          </a>
          . You stay in control of what you embed; users always sign in their own wallet. Open the real widget on{' '}
          <Link
            to="/terminal?intent=fundSolana"
            state={{ fromFundDemo: true }}
            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
          >
            Terminal
          </Link>
          .
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Home sections"
        aria-orientation="horizontal"
        className="flex flex-wrap gap-2 border-b border-slate-200/90 pb-3"
        onKeyDown={onTabListKeyDown}
      >
        <button
          ref={sessionTabRef}
          type="button"
          role="tab"
          id="home-tab-session"
          aria-selected={tab === 'session'}
          aria-controls="home-panel-session"
          tabIndex={tab === 'session' ? 0 : -1}
          className={`st-focus min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === 'session'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
          onClick={() => setTab('session')}
        >
          Fund session
        </button>
        <button
          ref={lifiTabRef}
          type="button"
          role="tab"
          id="home-tab-lifi"
          aria-selected={tab === 'lifi'}
          aria-controls="home-panel-lifi"
          tabIndex={tab === 'lifi' ? 0 : -1}
          className={`st-focus min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === 'lifi'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
          onClick={() => setTab('lifi')}
        >
          LI.FI
        </button>
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
