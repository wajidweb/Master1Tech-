import { Link, useLocation } from 'react-router-dom'
import { Home, Globe, Heart, Camera } from 'lucide-react'

export default function MobileNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/destinations', icon: Globe, label: 'Explore' },
    { to: '/plan-my-retreat', icon: Camera, label: 'Plan Retreat', isCta: true },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-cream-dark bg-white/95 backdrop-blur-md md:hidden safe-area-bottom">
      <div className="flex h-14 sm:h-16 items-center justify-around px-2 sm:px-4">
        {links.map(({ to, icon: Icon, label, isCta }) =>
          isCta ? (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 rounded-full bg-brand px-3 sm:px-4 py-1.5 sm:py-2 text-white transition-transform active:scale-95"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-[10px] sm:text-xs font-medium">{label}</span>
            </Link>
          ) : (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 sm:px-3 py-1.5 sm:py-2 relative transition-colors ${
                isActive(to) ? 'text-brand' : 'text-slate'
              }`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-[10px] sm:text-xs font-medium">{label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  )
}
