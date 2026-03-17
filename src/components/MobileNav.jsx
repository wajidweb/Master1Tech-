import { Link, useLocation } from 'react-router-dom'
import { Home, Globe, Compass } from 'lucide-react'

export default function MobileNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/destinations', icon: Globe, label: 'Explore' },
    { to: '/plan-my-retreat', icon: Compass, label: 'Plan', isCta: true },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-charcoal/95 backdrop-blur-xl md:hidden safe-area-bottom">
      <div className="flex h-14 sm:h-16 items-center justify-around px-2 sm:px-4">
        {links.map(({ to, icon: Icon, label, isCta }) =>
          isCta ? (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 rounded-full border border-accent/40 px-4 py-1.5 text-accent transition-all active:scale-95"
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-medium tracking-wider uppercase">{label}</span>
            </Link>
          ) : (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 relative transition-colors ${
                isActive(to) ? 'text-accent' : 'text-white/40'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-medium tracking-wider uppercase">{label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  )
}
