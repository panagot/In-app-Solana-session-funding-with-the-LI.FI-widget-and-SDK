import type { ReactNode } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  Sparkles,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
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
        Opens a preset from <strong className="text-slate-800">Ethereum</strong> toward Solana, then compare quotes
        against your Base balance in the widget.
      </>
    ),
  },
  {
    simKey: 'balanced',
    intent: '/terminal?intent=fundSolana',
    name: 'Balanced',
    badge: 'Default',
    desc: 'Good default for most audiences. LI.FI picks a strong overall route.',
  },
]

/** In-app "Fund session" sample (Neon Drift); former standalone demo.html. */
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
    <div className="w-full min-w-0 overflow-x-auto pb-8">
      <div className="relative min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-12px_rgba(15,23,42,0.12),0_2px_4px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.03]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/30 via-cyan-200/20 to-transparent blur-3xl"
        />
        {/* Top meta bar */}
        <div className="relative flex flex-col gap-2 border-b border-slate-200/70 bg-gradient-to-r from-slate-50/95 to-slate-50/80 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span className="flex items-center gap-2 text-[11.5px] leading-snug text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-700">
              <Sparkles className="h-2.5 w-2.5 text-sky-500" strokeWidth={2.6} />
              Interactive demo
            </span>
            <span className="hidden text-slate-400 sm:inline">·</span>
            <span className="hidden sm:inline">
              Preview balances (not real funds) · pattern for games, media &amp; web
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-3">
            <Link
              to="/terminal?intent=fundSolana"
              state={{ fromFundDemo: true }}
              className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-sky-700 transition hover:text-sky-900"
            >
              Open terminal
              <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
            </Link>
            <button
              type="button"
              className="st-focus rounded-md text-xs font-semibold text-slate-600 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-900 hover:decoration-slate-500"
              onClick={openPatternDetails}
            >
              Learn more
            </button>
          </span>
        </div>

        {/* Surface header (Neon Drift) */}
        <div className="relative border-b border-slate-200/70 bg-gradient-to-br from-white to-slate-50/60 px-4 py-3.5 sm:px-5">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Sample experience · fictional surface
          </p>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 shadow-sm ring-1 ring-white/60">
                <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2.6} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">Neon Drift</span>
              {gateUnlocked ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.6} />
                  Funded
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-600">
                  <Lock className="h-2.5 w-2.5" strokeWidth={2.6} />
                  Locked
                </span>
              )}
            </div>
            <div
              className="flex flex-wrap items-center gap-2"
              aria-label="Preview wallet balances for this demo (illustration only)"
            >
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                <Wallet className="h-2.5 w-2.5" strokeWidth={2.6} />
                Preview
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-600">
                <span
                  className={`rounded-lg border px-2 py-1 transition ${
                    gateUnlocked && solChip?.ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  SOL {solChip?.value ?? '0.008'}
                </span>
                <span
                  className={`rounded-lg border px-2 py-1 transition ${
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

        <div className="relative grid min-w-0 md:grid-cols-[1.1fr_0.9fr]">
          {/* Surface preview area */}
          <div className="relative flex min-h-[260px] items-center justify-center border-slate-200/70 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 md:aspect-[16/10] md:border-r">
            {/* Neon grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent 0, transparent 38px, rgba(56, 189, 248, 0.18) 39px, transparent 40px), repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(56, 189, 248, 0.12) 39px, transparent 40px)',
                maskImage: 'radial-gradient(ellipse 80% 70% at 50% 60%, black 30%, transparent 75%)',
              }}
              aria-hidden
            />
            {/* Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-gradient-to-t from-fuchsia-500/30 via-sky-500/15 to-transparent blur-3xl"
            />
            <div className="relative z-[1] px-6 py-7 text-center sm:py-8">
              <h2 className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-sky-300/80">
                Your surface
              </h2>
              <p className="mx-auto mb-4 max-w-[340px] text-[13.5px] leading-relaxed text-slate-200">
                {gateUnlocked
                  ? 'Solana side looks good for this demo: enough SOL for fees and enough USDC for the paywall.'
                  : 'Continue stays off until this surface sees enough on Solana: about 0.02 SOL for fees and 10 USDC for the example paywall (your real app would set its own numbers).'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  disabled={!gateUnlocked}
                  aria-label={
                    gateUnlocked
                      ? 'Continue: Solana gate requirements met'
                      : 'Continue: locked until about 0.02 SOL plus 10 USDC on Solana for this demo gate'
                  }
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    gateUnlocked
                      ? 'st-focus animate-gate-unlock bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_24px_rgba(16,185,129,0.5)] ring-2 ring-emerald-300/50 ring-offset-2 ring-offset-slate-900 hover:shadow-[0_0_32px_rgba(16,185,129,0.65)]'
                      : 'cursor-not-allowed bg-slate-700/70 text-slate-400 ring-1 ring-slate-600/50'
                  }`}
                >
                  {gateUnlocked ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
                      Continue
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" strokeWidth={2.4} />
                      Continue (locked)
                    </>
                  )}
                </button>
                <button
                  ref={fundRef}
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  className="st-focus inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-md transition hover:border-white/25 hover:bg-white/15"
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Fund session…
                </button>
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div className="flex flex-col gap-4 bg-slate-50/60 p-4 sm:p-5">
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                What this demo checks
              </h3>
              <div className="mt-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <strong className="block text-sm text-slate-900">Example paywall on Solana</strong>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Your product logic might require <span className="font-medium text-slate-900">10 USDC</span> on
                  Solana plus a little <span className="font-medium text-slate-900">SOL</span> for fees, same idea as a
                  game gate, clip purchase, or membership check.
                </p>
              </div>
            </div>
            {gateUnlocked ? (
              <div className="flex gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs leading-relaxed text-emerald-950">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} />
                <span>
                  <strong className="text-emerald-800">Session funded.</strong> Balances reflect a successful{' '}
                  <span className="font-mono text-emerald-900">{SIMULATION_PROFILES[hudSim].label}</span> path. Use{' '}
                  <strong className="text-emerald-900">Replay flow</strong> in execution previews to compare routes.
                </span>
              </div>
            ) : (
              <div className="flex gap-2.5 rounded-xl border border-dashed border-red-200 bg-red-50/80 px-3.5 py-3 text-xs leading-relaxed text-red-950">
                <Lock className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.4} />
                <span>
                  <strong className="text-red-800">Why Continue is off:</strong> in this story the user still has spend
                  money on <strong>Base</strong>, but this screen only looks at <strong>Solana</strong>. Run a
                  simulation below to see the happy path, or use <strong>Fund session…</strong> then{' '}
                  <strong>Open in terminal</strong> for the real LI.FI widget.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer pattern explainer */}
        <div className="relative border-t border-slate-200/70 bg-gradient-to-b from-slate-50/60 to-white px-4 py-3.5 sm:px-5 sm:py-4">
          <p className="mb-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
            Quotes, routes, and execution use{' '}
            <a
              href="https://docs.li.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-700 underline decoration-sky-300/60 underline-offset-2 hover:decoration-sky-500"
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

      <div className="mt-8 w-full max-w-3xl space-y-4">
        <p className="text-sm text-slate-600 sm:text-balance">
          <strong className="text-slate-900">Fund session…</strong> on the Neon Drift card opens this modal (preview vs
          real terminal). The three <strong className="text-slate-900">execution previews</strong> are above. Use{' '}
          <strong className="text-slate-900">Replay flow</strong> to compare how different routes could feel in your UI.
        </p>
        <details
          ref={patternDetailsRef}
          id="fund-session-pattern"
          className="group rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-600 backdrop-blur-sm open:pb-3.5 [&>summary]:cursor-pointer [&>summary]:list-none [&>summary]:select-none [&>summary::-webkit-details-marker]:hidden"
        >
          <summary className="st-focus flex items-center justify-between gap-2 rounded-md py-1 outline-none">
            <span className="font-medium text-slate-900">
              About the fund-session pattern (games, media, web, and more)
            </span>
            <ChevronDown
              className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180"
              strokeWidth={2.2}
            />
          </summary>
          <p className="mt-2 border-t border-slate-200/80 pt-3 text-[0.95rem] leading-relaxed">
            <span className="font-semibold text-slate-900">Fund session</span> is a reusable pattern: keep people inside
            your product while LI.FI moves funds to the chain your rules care about: games, live or on-demand video,
            memberships, creator tools, or any flow where Solana is the destination but spending money starts elsewhere.
            Neon Drift is fictional; the LI.FI tab and terminal use the real widget.
          </p>
        </details>
      </div>

      <p className="mt-8 max-w-xl font-mono text-[11px] leading-relaxed text-slate-500 sm:text-balance">
        Use the <strong className="text-slate-700">LI.FI</strong> tab above for live index stats and the ecosystem
        chart. <code className="st-code">?tab=lifi</code> deep-links there.
      </p>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-5 backdrop-blur-md animate-fade-in"
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
            className="relative w-full max-w-[480px] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white shadow-[0_32px_80px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/[0.04]"
          >
            <button
              ref={closeRef}
              type="button"
              className="st-focus absolute right-3 top-3 z-[1] inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
              aria-label="Close"
              onClick={close}
            >
              <X className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <div className="border-b border-slate-200/80 bg-gradient-to-br from-sky-50/40 to-white px-5 pb-4 pt-5">
              <span className="st-kicker-brand">
                <Sparkles className="h-3 w-3" strokeWidth={2.4} />
                Fund this visit
              </span>
              <h2 id={titleId} className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                Fund this session
              </h2>
              <p id={descId} className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Move value to <strong className="text-slate-900">Solana</strong> without sending people to an external
                bridge tab. Simulate a happy path here, or open the real LI.FI widget. The same pattern you would embed
                next to a level, paywall, clip checkout, or other gated step.
              </p>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              {pathPresets.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-white p-4 transition hover:border-slate-300/80 hover:shadow-sm"
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
                      className="st-focus flex-1 inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2 text-center text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                      onClick={() => applySimulateFromModal(p.simKey)}
                    >
                      Simulate success
                    </button>
                    <button
                      type="button"
                      className="st-btn-primary flex-1 min-h-[40px] !py-2 !text-xs"
                      onClick={() => {
                        setOpen(false)
                        navigate(p.intent, { state: { fromFundDemo: true } })
                      }}
                    >
                      Open in terminal
                      <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-200/70 bg-slate-50/60 px-5 py-4">
              <Link
                to="/terminal?intent=fundSolana"
                state={{ fromFundDemo: true }}
                onClick={() => setOpen(false)}
                className="flex min-h-[40px] items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Open terminal (default preset)
              </Link>
              <button
                type="button"
                className="min-h-[36px] rounded-full py-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
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
