import { NavLink } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  end?: boolean
  /** Same-origin static page (not a React Router path) — use full navigation */
  native?: boolean
}

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { to: '/', label: 'Home', end: true },
      { to: '/terminal', label: 'Execution terminal' },
      { to: '/liquidity-map', label: 'Liquidity map' },
      { to: '/flows', label: 'User flows' },
      { to: '/developers', label: 'Integration' },
    ],
  },
  {
    title: 'Trust',
    items: [{ to: '/support', label: 'Risk & support' }],
  },
]

const linkBase =
  'group relative flex min-h-[2.75rem] items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-sm transition duration-200'

export function SideNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col gap-8 overflow-y-auto p-3 pb-6 sm:p-4" aria-label="Site">
      {groups.map((group) => (
        <div key={group.title}>
          <div
            className={`mb-2.5 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 ${
              collapsed ? 'lg:sr-only' : ''
            }`}
          >
            {group.title}
          </div>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.to}>
                {item.native ? (
                  <a
                    href={item.to}
                    onClick={onNavigate}
                    className={`${linkBase} text-slate-600 hover:bg-slate-100 hover:text-slate-900`}
                  >
                    {collapsed ? (
                      <span className="mx-auto font-mono text-[11px] font-bold uppercase tracking-tight text-slate-500">
                        Demo
                      </span>
                    ) : (
                      <span className="truncate text-[13px] font-medium leading-snug">{item.label}</span>
                    )}
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    end={Boolean(item.end)}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `${linkBase} ${
                        isActive
                          ? 'bg-slate-100 font-semibold text-slate-900 shadow-[inset_3px_0_0_0_#0f172a]'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    {collapsed ? (
                      <span className="mx-auto font-mono text-[11px] font-bold uppercase tracking-tight text-slate-500">
                        {item.label.replace(/\s+/g, '').slice(0, 3).toUpperCase()}
                      </span>
                    ) : (
                      <span className="truncate text-[13px] font-medium leading-snug">{item.label}</span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
