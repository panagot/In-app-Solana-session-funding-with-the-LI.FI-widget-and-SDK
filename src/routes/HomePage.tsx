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
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-3xl rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3.5 sm:px-5 sm:py-4">
        <p className="text-sm leading-relaxed text-slate-800">
          Let people stay inside your app while you move funds onto Solana for this visit.
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
          className={`st-focus rounded-full px-4 py-2 text-sm font-semibold transition ${
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
          className={`st-focus rounded-full px-4 py-2 text-sm font-semibold transition ${
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
