import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LiFiWidget } from '@lifi/widget'
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  RefreshCcw,
  Sparkles,
  Wallet,
  Waves,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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

const intents: {
  id: QuickIntentId
  title: string
  body: string
  step: string
  icon: LucideIcon
}[] = [
  {
    id: 'fundSolana',
    step: '01',
    icon: Wallet,
    title: 'Fund Solana',
    body: 'Base USDC → Solana USDC. Typical treasury on-ramp from an L2.',
  },
  {
    id: 'exitSolana',
    step: '02',
    icon: ArrowLeftRight,
    title: 'Route to Arbitrum',
    body: 'Solana USDC → Arbitrum USDC. Exit liquidity to EVM L2.',
  },
  {
    id: 'solSwap',
    step: '03',
    icon: Waves,
    title: 'Solana swap',
    body: 'Same-chain USDC → wSOL via LI.FI (Jupiter and connected liquidity).',
  },
  {
    id: 'bridgePreview',
    step: '04',
    icon: ArrowRight,
    title: 'ETH → SOL preview',
    body: 'Cross-chain from Ethereum USDC toward native SOL representation.',
  },
]

export function LiFiTerminal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle')
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

  const copyShareableUrl = useCallback(() => {
    void (async () => {
      const url = window.location.href
      try {
        await navigator.clipboard.writeText(url)
        setCopyState('ok')
        window.setTimeout(() => setCopyState('idle'), 2500)
      } catch {
        setCopyState('fail')
        window.setTimeout(() => setCopyState('idle'), 3500)
      }
    })()
  }, [])

  return (
    <div className="grid min-w-0 gap-6 overflow-x-auto lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-7 lg:overflow-x-visible">
      <aside className="h-fit lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
          <div className="space-y-5 p-5 sm:p-6">
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {intent ? `Active preset: ${intent}.` : 'No preset in URL; widget defaults.'}
            </p>
            <div>
              <h2 className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-700">
                <Sparkles className="h-3 w-3 text-sky-500" strokeWidth={2.6} />
                Quick intents
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                One tap pre-fills the LI.FI widget and updates the URL (for example{' '}
                <code className="st-code">?intent=fundSolana</code>). Always review amounts, fees, and route steps
                before signing.
              </p>
              {intent ? (
                <div className="mt-3.5 overflow-hidden rounded-xl border border-sky-200/70 bg-gradient-to-br from-sky-50/80 to-cyan-50/40 px-3 py-2.5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-700">
                    Active URL preset
                  </p>
                  <p className="mt-1 font-mono text-xs font-bold text-slate-900">{intent}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-600">{INTENT_SUMMARY[intent]}</p>
                </div>
              ) : (
                <p className="mt-3.5 text-[11.5px] leading-relaxed text-slate-500">
                  No <code className="st-code">?intent=</code> in the URL, so the widget starts from its defaults.
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-slate-600">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold uppercase tracking-wider text-slate-500">Integrator</span>
              <span className="truncate text-slate-800">{INTEGRATOR}</span>
            </div>
            <ul className="space-y-2">
              {intents.map((item) => {
                const active = intent === item.id
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => applyIntent(item.id)}
                      className={`st-focus group relative w-full overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                        active
                          ? 'border-sky-300/80 bg-gradient-to-br from-sky-50/80 to-white shadow-sm ring-1 ring-sky-300/30'
                          : 'border-slate-200 bg-white hover:-translate-y-px hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-sky-500 to-cyan-500"
                        />
                      ) : null}
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                            active
                              ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm'
                              : 'bg-slate-100/80 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className={`font-mono text-[10px] font-bold tracking-wider ${
                                active ? 'text-sky-600' : 'text-slate-400'
                              }`}
                            >
                              {item.step}
                            </span>
                            <span className="text-[13px] font-bold text-slate-900">{item.title}</span>
                          </div>
                          <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-600">
                            {item.body}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="space-y-2">
              <button
                type="button"
                onClick={copyShareableUrl}
                aria-label="Copy full URL of this terminal page, including intent query if set"
                className="st-focus inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                {copyState === 'ok' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.6} />
                    Link copied
                  </>
                ) : copyState === 'fail' ? (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Copy blocked (try manually)
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Copy shareable terminal link
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={clearIntent}
                className="st-focus inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <RefreshCcw className="h-3 w-3" strokeWidth={2.4} />
                Reset to widget defaults
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-h-[560px] w-full min-w-0">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 bg-gradient-to-r from-slate-50/70 to-white px-3.5 py-2.5 sm:px-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
                  Live widget
                </p>
                <p className="text-[11.5px] text-slate-600">LI.FI UI below: connect and route in place.</p>
              </div>
            </div>
            <a
              href="https://explorer.li.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="st-focus inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
            >
              LI.FI Explorer
              <ExternalLink className="h-3 w-3" strokeWidth={2.4} />
            </a>
          </div>
          <div className="border-b border-slate-200/70 bg-slate-50/80 px-3.5 py-2.5 text-xs leading-relaxed text-slate-600 sm:px-4">
            <strong className="text-slate-800">Non-custodial.</strong> LI.FI finds routes and liquidity; you approve
            each transaction in your own wallet. Nothing moves without your signature. Check every amount, fee, and
            hop in the widget before you confirm.{' '}
            <a
              href="https://docs.li.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
            >
              LI.FI documentation
            </a>
          </div>
          <div className="min-h-[520px] w-full p-1 sm:p-2">
            <LiFiWidget key={intent ?? 'default'} integrator={INTEGRATOR} config={config} />
          </div>
        </div>
      </div>
    </div>
  )
}
