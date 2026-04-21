import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LiFiWidget } from '@lifi/widget'
import type { QuickIntentId } from './widgetBaseConfig'
import {
  getBaseWidgetConfig,
  getPresetForIntent,
  parseQuickIntentParam,
} from './widgetBaseConfig'
import { INTEGRATOR } from './constants'

const INTENT_SUMMARY: Record<QuickIntentId, string> = {
  fundSolana: 'Base USDC → Solana USDC',
  exitSolana: 'Solana USDC → Arbitrum USDC',
  solSwap: 'Solana USDC → wSOL',
  bridgePreview: 'Ethereum → Solana (preview)',
}

const intents: { id: QuickIntentId; title: string; body: string; step: string }[] = [
  {
    id: 'fundSolana',
    step: '01',
    title: 'Fund Solana',
    body: 'Base USDC → Solana USDC. Typical treasury on-ramp from an L2.',
  },
  {
    id: 'exitSolana',
    step: '02',
    title: 'Route to Arbitrum',
    body: 'Solana USDC → Arbitrum USDC. Exit liquidity to EVM L2.',
  },
  {
    id: 'solSwap',
    step: '03',
    title: 'Solana swap',
    body: 'Same-chain USDC → wSOL via LI.FI (Jupiter and connected liquidity).',
  },
  {
    id: 'bridgePreview',
    step: '04',
    title: 'ETH → SOL preview',
    body: 'Cross-chain from Ethereum USDC toward native SOL representation.',
  },
]

export function LiFiTerminal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const intent = parseQuickIntentParam(searchParams.get('intent'))

  const config = useMemo(() => {
    const base = getBaseWidgetConfig()
    const preset = intent ? getPresetForIntent(intent) : {}
    return { ...base, ...preset }
  }, [intent])

  const applyIntent = useCallback(
    (id: QuickIntentId) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('intent', id)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const clearIntent = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('intent')
        return next
      },
      { replace: true },
    )
  }, [setSearchParams])

  return (
    <div className="grid min-w-0 gap-6 overflow-x-auto lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-8 lg:overflow-x-visible">
      <aside className="st-card h-fit lg:sticky lg:top-24">
        <div className="st-card-inner space-y-5 p-5 sm:p-6">
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {intent ? `Active preset: ${intent}.` : 'No preset in URL; widget defaults.'}
          </p>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Quick intents
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              One tap pre-fills the LI.FI widget and updates the URL (for example{' '}
              <code className="st-code">?intent=fundSolana</code>
              ). Always review amounts, fees, and route steps before signing.
            </p>
            {intent ? (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active URL preset</p>
                <p className="mt-1 font-mono text-xs font-semibold text-slate-900">{intent}</p>
                <p className="mt-0.5 text-xs text-slate-600">{INTENT_SUMMARY[intent]}</p>
              </div>
            ) : (
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                No <code className="st-code">?intent=</code> in the URL — the widget starts from its defaults.
              </p>
            )}
          </div>
          <ul className="space-y-2.5">
            {intents.map((item) => {
              const active = intent === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => applyIntent(item.id)}
                    className={`st-focus group min-h-[44px] w-full rounded-xl border px-3.5 py-3.5 text-left transition duration-200 ${
                      active
                        ? 'border-slate-300 bg-white shadow-sm ring-1 ring-slate-900/[0.06]'
                        : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold ${
                          active
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-200/80 text-slate-600 group-hover:text-slate-900'
                        }`}
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                          {item.body}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={clearIntent}
            className="st-focus min-h-[44px] w-full rounded-xl border border-dashed border-slate-300 py-2.5 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
          >
            Reset to widget defaults
          </button>
        </div>
      </aside>
      <div className="min-h-[560px] w-full min-w-0">
        <div className="st-card overflow-hidden">
          <div className="st-card-inner flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-3 py-2.5 sm:px-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Live widget</p>
              <p className="text-xs text-slate-600">LI.FI UI below — connect and route in place.</p>
            </div>
          </div>
          <div className="st-card-inner border-b border-slate-100 bg-slate-50/90 px-3 py-3 text-xs leading-relaxed text-slate-600 sm:px-4">
            <strong className="text-slate-800">Non-custodial.</strong> LI.FI finds routes and liquidity; you approve
            each transaction in your own wallet—nothing moves without your signature. Check every amount, fee, and hop
            in the widget before you confirm.{' '}
            <a
              href="https://docs.li.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
            >
              LI.FI documentation
            </a>
          </div>
          <div className="st-card-inner min-h-[520px] w-full p-1 sm:p-2">
            <LiFiWidget key={intent ?? 'default'} integrator={INTEGRATOR} config={config} />
          </div>
        </div>
      </div>
    </div>
  )
}
