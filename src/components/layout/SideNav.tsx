import { NavLink } from 'react-router-dom'
import {
  Home,
  Terminal as TerminalIcon,
  Network,
  GitBranch,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react'

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
  /** Same-origin static page (not a React Router path); use full navigation */
  native?: boolean
}

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { to: '/', label: 'Home', icon: Home, end: true },
      { to: '/terminal', label: 'Terminal', icon: TerminalIcon },
      { to: '/liquidity-map', label: 'Liquidity map', icon: Network },
      { to: '/flows', label: 'User flows', icon: GitBranch },
    ],
  },
  {
    title: 'Trust',
    items: [{ to: '/support', label: 'Risk & support', icon: ShieldAlert }],
  },
]

const linkBase =
  'group relative flex min-h-[2.5rem] items-center gap-2.5 overflow-hidden rounded-xl px-2.5 py-2 text-sm transition-all duration-200'

export function SideNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  return (
    <nav
      className="flex flex-1 flex-col gap-7 overflow-y-auto p-3 pb-6 sm:p-4"
      aria-label="Site"
    >
      {groups.map((group) => (
        <div key={group.title}>
          <div
            className={`mb-2 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 ${
              collapsed ? 'lg:sr-only' : ''
            }`}
          >
            {group.title}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon
              const inner = (isActive: boolean) => (
                <>
                  {isActive ? (
                    <span
                      className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-sky-500 to-cyan-500"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm'
                        : 'text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  {collapsed ? null : (
                    <span className="truncate text-[13px] font-medium leading-snug">
                      {item.label}
                    </span>
                  )}
                </>
              )

              return (
                <li key={item.to}>
                  {item.native ? (
                    <a
                      href={item.to}
                      onClick={onNavigate}
                      className={`${linkBase} text-slate-600 hover:bg-slate-50 hover:text-slate-900`}
                    >
                      {inner(false)}
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
                            ? 'bg-slate-100/80 font-semibold text-slate-900'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`
                      }
                    >
                      {({ isActive }) => inner(isActive)}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
