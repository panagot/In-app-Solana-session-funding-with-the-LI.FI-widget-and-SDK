import type { ReactNode } from 'react'

type PageHeaderProps = {
  kicker?: string
  title: string
  description: ReactNode
  actions?: ReactNode
}

export function PageHeader({ kicker, title, description, actions }: PageHeaderProps) {
  return (
    <header className="animate-fade-up border-b border-slate-200/90 pb-8">
      {kicker ? (
        <p className="st-kicker mb-4">
          <span
            className="h-1.5 w-1.5 rounded-full bg-slate-800 ring-2 ring-slate-800/10"
            aria-hidden
          />
          {kicker}
        </p>
      ) : null}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2rem] md:leading-tight">
            {title}
          </h1>
          <div className="text-base leading-relaxed text-slate-600 md:text-[1.05rem]">{description}</div>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  )
}
