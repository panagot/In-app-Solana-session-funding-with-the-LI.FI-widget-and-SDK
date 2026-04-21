import { Link } from 'react-router-dom'
import { SIM_KEYS, SIMULATION_PROFILES, type SimKey } from './simulationProfiles'

type Props = {
  activeSim: SimKey
  onSimChange: (k: SimKey) => void
  playing: boolean
  visibleStepCount: number
  onReplay: () => void
}

export function FundSessionExecutionPreview({ activeSim, onSimChange, playing, visibleStepCount, onReplay }: Props) {
  const profile = SIMULATION_PROFILES[activeSim]
  const total = profile.steps.length
  const displayed = playing ? Math.min(visibleStepCount, total) : total
  const stepsShown = profile.steps.slice(0, displayed)
  const settled = !playing && visibleStepCount >= total
  const inProgress = playing && visibleStepCount < total

  return (
    <section
      id="execution-previews"
      className="mt-5 scroll-mt-28 space-y-5 sm:mt-6 lg:scroll-mt-8"
      aria-labelledby="exec-preview-title"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="exec-preview-title" className="text-base font-semibold text-slate-900">
            Execution previews <span className="text-slate-500">(preview)</span>
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Each tab shows a successful settlement as <strong className="font-medium text-slate-800">illustration only</strong>
            . Log lines, receipt, and balances are not on-chain. Replay streams the steps the way you could surface them
            beside a gate; use Terminal for live LI.FI quotes and signing.
          </p>
        </div>
        <button
          type="button"
          className="st-focus min-h-[44px] shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-40"
          onClick={onReplay}
          disabled={playing}
        >
          Replay flow
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Funding simulation"
        className="flex flex-wrap gap-2 rounded-xl border border-slate-200/90 bg-slate-100/80 p-1.5"
      >
        {SIM_KEYS.map((k) => {
          const p = SIMULATION_PROFILES[k]
          const on = k === activeSim
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={on}
              className={`st-focus min-h-[44px] rounded-lg px-3 py-2 text-sm font-semibold transition ${
                on
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/90 ring-inset'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
              }`}
              onClick={() => onSimChange(k)}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <p className="text-sm text-slate-600" aria-live="polite">
        Viewing:{' '}
        <span className="font-semibold text-slate-900">{profile.label}</span>
        <span className="text-slate-500"> · </span>
        <span className="text-slate-700">{profile.badge}</span>
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,280px)]">
        <div className="preview-panel overflow-hidden">
          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {profile.routeChip}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{profile.headline}</h3>
                <p className="mt-1 text-sm text-slate-600">{profile.sub}</p>
              </div>
              <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-700">
                {profile.badge}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 font-mono text-[11px] leading-relaxed text-slate-600">
              <div className="border-b border-slate-200/90 px-3 py-2 text-[10px] uppercase tracking-wider text-slate-500">
                li.fi · execution log
              </div>
              <ul className="max-h-[240px] space-y-2 overflow-x-auto overflow-y-auto px-3 py-3 sm:max-h-none">
                {stepsShown.map((s, i) => (
                  <li key={i} className="flex gap-2 border-l-2 border-slate-300 pl-2">
                    <span className="shrink-0 text-slate-500">{s.t}</span>
                    <span className="text-slate-800">{s.line}</span>
                  </li>
                ))}
                {inProgress ? (
                  <li className="flex gap-2 border-l-2 border-amber-400 pl-2 text-amber-900">
                    <span className="shrink-0">…</span>
                    <span>Streaming settlement steps…</span>
                  </li>
                ) : null}
                {settled || (playing && visibleStepCount >= total) ? (
                  <li className="flex gap-2 border-l-2 border-emerald-500 pl-2 text-emerald-900">
                    <span className="shrink-0 text-emerald-700">ok</span>
                    <span>Settlement complete. User can return to your app or stream.</span>
                  </li>
                ) : null}
              </ul>
            </div>

            <p className="text-xs text-slate-500">{profile.footnote}</p>

            <Link
              to={profile.intentPath}
              state={{ fromFundDemo: true }}
              className="st-btn-primary inline-flex min-h-[44px] items-center justify-center text-sm"
            >
              Open this preset in terminal
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="preview-panel">
            <div className="p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Receipt</div>
              <ul className="mt-3 space-y-1.5 font-mono text-[10px] text-slate-700">
                {profile.receiptLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="preview-panel border-emerald-200/80">
            <div className="p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                Balances after
              </div>
              <ul className="mt-3 space-y-2">
                {profile.balancesAfter.map((b) => (
                  <li
                    key={b.label}
                    className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 font-mono text-[11px] ${
                      b.ok
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                        : b.warn
                          ? 'border-red-200 bg-red-50 text-red-950'
                          : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <span>{b.label}</span>
                    <span className="tabular-nums font-semibold">{b.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
