import type { ReactNode } from 'react'

type PageHeaderProps = {
  kicker?: string
  title: string
  description: ReactNode
  actions?: ReactNode
  /** Use brand-styled (sky/cyan) kicker instead of neutral */
  brandKicker?: boolean
}

export function PageHeader({
  kicker,
  title,
  description,
  actions,
  brandKicker,
}: PageHeaderProps) {
  return (
    <header className="animate-fade-up relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-12 h-40 w-[28rem] rounded-full bg-gradient-to-br from-sky-200/35 via-cyan-200/25 to-transparent blur-3xl"
      />
      <div className="relative pb-7">
        {kicker ? (
          <p className={brandKicker ? 'st-kicker-brand mb-4' : 'st-kicker mb-4'}>
            <span
              className={
                brandKicker
                  ? 'h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 ring-2 ring-sky-300/40'
                  : 'h-1.5 w-1.5 rounded-full bg-slate-800 ring-2 ring-slate-800/10'
              }
              aria-hidden
            />
            {kicker}
          </p>
        ) : null}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 md:text-[2.15rem] md:leading-[1.1]">
              {title}
            </h1>
            <div className="text-base leading-relaxed text-slate-600 md:text-[1.05rem]">
              {description}
            </div>
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/90 to-transparent" />
    </header>
  )
}
