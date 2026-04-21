import type { ReactNode } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FundSessionExecutionPreview } from './fundSession/FundSessionExecutionPreview'
import { SIMULATION_PROFILES, type SimKey } from './fundSession/simulationProfiles'

const pathPresets: {
  simKey: SimKey
  intent: string
  name: string
  badge: string
  desc: ReactNode
}[] = [
  {
    simKey: 'fast',
    intent: '/terminal?intent=fundSolana',
    name: 'Fast',
    badge: 'Fewer hops',
    desc: 'Optimize for time-to-land on Solana. Best when the user is mid-session and impatient.',
  },
  {
    simKey: 'cheap',
    intent: '/terminal?intent=bridgePreview',
    name: 'Cheap',
    badge: 'Save fees',
    desc: (
      <>
        Opens a preset from <strong className="text-slate-800">Ethereum</strong> toward Solana —
        compare quotes against your Base balance in the widget.
      </>
    ),
  },
  {
    simKey: 'balanced',
    intent: '/terminal?intent=fundSolana',
    name: 'Balanced',
    badge: 'Default',
    desc: 'Good default for most audiences — LI.FI picks a strong overall route.',
  },
]

/** In-app “Fund session” sample (Neon Drift) — former standalone demo.html. */
export function FundSessionDemo() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const fundRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const patternDetailsRef = useRef<HTMLDetailsElement>(null)
  const titleId = useId()
  const descId = useId()

  const [activeSim, setActiveSim] = useState<SimKey>('fast')
  const [execPlaying, setExecPlaying] = useState(false)
  const [execStep, setExecStep] = useState(() => SIMULATION_PROFILES.fast.steps.length)

  const [gateUnlocked, setGateUnlocked] = useState(false)
  const [hudSim, setHudSim] = useState<SimKey>('fast')
  const prefersReducedMotion = usePrefersReducedMotion()

  const close = useCallback(() => setOpen(false), [])

  const openPatternDetails = useCallback(() => {
    const el = patternDetailsRef.current
    if (!el) return
    el.open = true
    queueMicrotask(() => {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' })
    })
  }, [prefersReducedMotion])

  const profile = SIMULATION_PROFILES[activeSim]
  const stepTotal = profile.steps.length

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    queueMicrotask(() => closeRef.current?.focus())

    const node = dialogRef.current
    if (!node) return

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

    const getFocusable = () =>
      [...node.querySelectorAll<HTMLElement>(focusableSelector)].filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
      )

    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    const onDialogKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const list = getFocusable()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onDocKey)
    node.addEventListener('keydown', onDialogKey)
    return () => {
      document.removeEventListener('keydown', onDocKey)
      node.removeEventListener('keydown', onDialogKey)
      previouslyFocused?.focus?.()
    }
  }, [open, close])

  useEffect(() => {
    if (!execPlaying || execStep >= stepTotal) return
    if (prefersReducedMotion) {
      const id = requestAnimationFrame(() => setExecStep(stepTotal))
      return () => cancelAnimationFrame(id)
    }
    const id = window.setTimeout(() => setExecStep((s) => s + 1), 760)
    return () => window.clearTimeout(id)
  }, [execPlaying, execStep, stepTotal, prefersReducedMotion])

  useEffect(() => {
    if (!execPlaying || execStep < stepTotal) return
    const id = requestAnimationFrame(() => {
      setExecPlaying(false)
      setGateUnlocked(true)
      setHudSim(activeSim)
    })
    return () => cancelAnimationFrame(id)
  }, [execPlaying, execStep, stepTotal, activeSim])

  const handleSimChange = useCallback((k: SimKey) => {
    setActiveSim(k)
    setExecPlaying(false)
    setExecStep(SIMULATION_PROFILES[k].steps.length)
  }, [])

  const handleReplay = useCallback(() => {
    setExecStep(0)
    setExecPlaying(true)
  }, [])

  const applySimulateFromModal = useCallback(
    (k: SimKey) => {
      const p = SIMULATION_PROFILES[k]
      setActiveSim(k)
      setExecPlaying(false)
      setExecStep(p.steps.length)
      setGateUnlocked(true)
      setHudSim(k)
      setOpen(false)
      queueMicrotask(() => {
        fundRef.current?.focus()
        document.getElementById('execution-previews')?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    },
    [prefersReducedMotion],
  )

  const hud = SIMULATION_PROFILES[gateUnlocked ? hudSim : 'fast']
  const solChip = gateUnlocked
    ? hud.balancesAfter.find((b) => b.label === 'SOL')
    : { value: '0.008', ok: false as const }
  const usdcChip = gateUnlocked
    ? hud.balancesAfter.find((b) => b.label === 'Solana USDC')
    : { value: '2.40', ok: false as const }
  const baseChip = gateUnlocked
    ? hud.balancesAfter.find((b) => b.label === 'Base USDC')
    : { value: '420', ok: false as const }

  return (
    <div className="mx-auto max-w-4xl min-w-0 overflow-x-auto pb-8">
      <div className="min-w-0 overflow-hidden rounded-[20px] border border-slate-200/90 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/[0.04]">
        <div className="flex flex-col gap-2 border-b border-slate-200/80 bg-slate-50/95 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <span className="text-xs leading-snug text-slate-600">
            <strong className="text-slate-900">Interactive demo</strong>
            {' · '}
            Preview balances (not real funds) · pattern for games, media & web
          </span>
          <span className="flex flex-wrap items-center gap-3">
            <Link
              to="/terminal?intent=fundSolana"
              state={{ fromFundDemo: true }}
              className="inline-flex min-h-[44px] items-center text-xs font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 transition hover:decoration-slate-500"
            >
              Open terminal →
            </Link>
            <button
              type="button"
              className="st-focus rounded-md text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-900 hover:decoration-slate-500"
              onClick={openPatternDetails}
            >
              Learn more
            </button>
          </span>
        </div>

        <div className="border-b border-slate-200/90 bg-slate-50/90 px-4 py-3 sm:px-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Sample experience</p>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-slate-800 ring-2 ring-slate-800/12" aria-hidden />
              <span className="text-xl font-bold tracking-tight text-slate-900">Neon Drift</span>
              {gateUnlocked ? (
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Funded
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-slate-200 bg-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">
                Preview
              </span>
              <div
                className="flex flex-wrap gap-2 font-mono text-[10px] text-slate-600"
                aria-label="Preview wallet balances for this demo (illustration only)"
              >
                <span
                  className={`rounded-lg border px-2 py-1 ${
                    gateUnlocked && solChip?.ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  SOL {solChip?.value ?? '0.008'}
                </span>
                <span
                  className={`rounded-lg border px-2 py-1 ${
                    gateUnlocked && usdcChip?.ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  USDC {usdcChip?.value ?? '2.40'}
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-600">
                  Base USDC {baseChip?.value ?? '420'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex min-h-[220px] items-center justify-center border-slate-200/90 bg-gradient-to-b from-slate-50 to-white md:aspect-[16/10] md:border-r">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #64748b 3px)',
              }}
              aria-hidden
            />
            <div className="relative z-[1] px-6 py-7 text-center sm:py-8">
              <h2 className="mb-1.5 text-sm font-bold uppercase tracking-[0.08em] text-slate-500">Your surface</h2>
              <p className="mx-auto mb-3 max-w-[300px] text-sm leading-snug text-slate-600">
                {gateUnlocked
                  ? 'Requirements met. Users can continue — fees and gate USDC are covered on Solana.'
                  : 'Continue is disabled until Solana balances meet your rule: ~0.02 SOL for fees plus 10 USDC for the gate.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  disabled={!gateUnlocked}
                  className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    gateUnlocked
                      ? 'st-focus animate-gate-unlock bg-gradient-to-b from-[#0077ed] to-[#0058b0] text-white shadow-[0_4px_14px_rgba(0,113,227,0.35)] ring-2 ring-emerald-300/45 ring-offset-2 ring-offset-white hover:brightness-105'
                      : 'cursor-not-allowed bg-slate-200 text-slate-500 opacity-80'
                  }`}
                >
                  Continue {gateUnlocked ? '— go' : '— locked'}
                </button>
                <button
                  ref={fundRef}
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  className="st-focus min-h-[44px] rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Fund session…
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-slate-50/80 p-4 sm:p-5">
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Session rule
              </h3>
              <div className="mt-2 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                <strong className="block text-sm text-slate-900">On-chain gate</strong>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Pay 10 USDC on <span className="font-medium text-slate-900">Solana</span> + keep a small SOL buffer
                  for fees.
                </p>
              </div>
            </div>
            {gateUnlocked ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs leading-relaxed text-emerald-950">
                <strong className="text-emerald-800">Session funded.</strong> Balances in the header reflect a successful{' '}
                <span className="font-mono text-emerald-900">{SIMULATION_PROFILES[hudSim].label}</span> path. Use{' '}
                <strong className="text-emerald-900">Replay flow</strong> in execution previews to compare routes.
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-relaxed text-red-950">
                <strong className="text-red-800">Why it’s blocked:</strong> spending balance is on{' '}
                <strong>Base</strong>, while this surface checks <strong>Solana USDC</strong>. Run a simulation to
                completion below, or open <strong>Fund session</strong> to route with LI.FI.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200/90 bg-slate-50/70 px-4 py-3.5 sm:px-5 sm:py-4">
          <p className="mb-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
            Quotes, routes, and execution use{' '}
            <a
              href="https://docs.li.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
            >
              LI.FI
            </a>
            . This card uses preview numbers; the terminal runs the real widget with your wallet.
          </p>
          <p className="text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed">
            <span className="font-semibold text-slate-800">&quot;Session-native funding&quot; with LI.FI:</span> your
            experience needs SOL or USDC on Solana (fees, a paywall, a purchase), but their spending money lives on
            another chain (Base, Ethereum, and so on). You embed LI.FI, show a short &quot;fund this visit&quot; step at
            the right moment, and LI.FI handles quotes, the route, and the move. They land back on the same screen with
            enough on Solana to meet your rules.
          </p>
        </div>
      </div>

      <FundSessionExecutionPreview
        activeSim={activeSim}
        onSimChange={handleSimChange}
        playing={execPlaying}
        visibleStepCount={execStep}
        onReplay={handleReplay}
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-4">
        <p className="text-center text-sm text-slate-600">
          <strong className="text-slate-900">Fund session…</strong> on the Neon Drift card opens the modal (simulate vs
          real terminal). The three <strong className="text-slate-900">execution previews</strong> are directly above
          this note — use <strong className="text-slate-900">Replay flow</strong> to compare routing profiles.
        </p>
        <details
          ref={patternDetailsRef}
          id="fund-session-pattern"
          className="rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-2 text-sm text-slate-600 open:pb-3 [&>summary]:cursor-pointer [&>summary]:list-none [&>summary]:select-none [&>summary::-webkit-details-marker]:hidden [&>summary]:font-medium [&>summary]:text-slate-900"
        >
          <summary className="st-focus rounded-md py-1 outline-none">
            About this fund-session pattern (games, media, web & more)
          </summary>
          <p className="mt-2 border-t border-slate-200/80 pt-3 text-[0.95rem] leading-relaxed">
            <span className="font-semibold text-slate-900">Fund session</span> is a reusable pattern: keep people inside
            your product while LI.FI tops up the right chain—whether you ship a game, a live or on-demand video surface,
            a membership site, a creator hub, or any flow where Solana is the destination but liquidity starts elsewhere.
            The Neon Drift sample is fictional; the LI.FI tab and terminal use the real widget.
          </p>
        </details>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center font-mono text-[11px] leading-relaxed text-slate-500">
        Use the <strong className="text-slate-700">LI.FI</strong> tab above for live index stats and the ecosystem
        chart. <code className="st-code">?tab=lifi</code> deep-links there.
      </p>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/35 p-5 backdrop-blur-sm"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative w-full max-w-[480px] overflow-y-auto rounded-[20px] border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/[0.04]"
          >
            <button
              ref={closeRef}
              type="button"
              className="st-focus absolute right-3 top-3 z-[1] flex h-9 w-9 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-lg leading-none text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-800"
              aria-label="Close"
              onClick={close}
            >
              ×
            </button>
            <div className="border-b border-slate-200/90 px-5 pb-4 pt-5">
              <h2 id={titleId} className="text-lg font-semibold text-slate-900">
                Fund this session
              </h2>
              <p id={descId} className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Bring value to <strong className="text-slate-900">Solana</strong> without sending people to an exchange
                tab. Simulate a successful settlement here, or open the real LI.FI widget—same pattern you would embed
                beside a level, a paywall, a clip checkout, or any gated step. In the terminal you will see live quotes,
                fees, and route steps before signing.
              </p>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              {pathPresets.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {p.badge}
                    </span>
                  </div>
                  <p className="m-0 text-xs leading-relaxed text-slate-600">{p.desc}</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="st-focus flex-1 min-h-[44px] rounded-full border border-slate-300 bg-white py-2.5 text-center text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                      onClick={() => applySimulateFromModal(p.simKey)}
                    >
                      Simulate success
                    </button>
                    <button
                      type="button"
                      className="st-focus flex-1 min-h-[44px] rounded-full bg-gradient-to-b from-[#0077ed] to-[#0058b0] py-2.5 text-center text-xs font-semibold text-white transition hover:brightness-105"
                      onClick={() => {
                        setOpen(false)
                        navigate(p.intent, { state: { fromFundDemo: true } })
                      }}
                    >
                      Open in terminal
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 px-5 pb-5">
              <Link
                to="/terminal?intent=fundSolana"
                state={{ fromFundDemo: true }}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-center text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Open terminal (default preset)
              </Link>
              <button
                type="button"
                className="min-h-[44px] rounded-full py-2.5 text-sm font-medium text-slate-500 transition hover:text-slate-800"
                onClick={() => {
                  close()
                  queueMicrotask(() => fundRef.current?.focus())
                }}
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
