import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { to: '/destinations', label: 'Destinations' },
    { to: '/retreat-styles', label: 'Retreat Styles' },
    { to: '/plan-my-retreat', label: 'Plan a Retreat' },
  ]

  const headerBg = scrolled
    ? 'bg-charcoal/95 backdrop-blur-xl border-b border-white/5'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <nav className="container-wide">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-heading text-2xl sm:text-3xl font-semibold tracking-wide text-white transition-colors">
              Master<span className="text-accent">1</span>Tech
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/plan-my-retreat"
              className="items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal h-10 sm:h-11 px-5 sm:px-7 text-[13px] tracking-wider uppercase hidden sm:inline-flex"
            >
              Plan My Retreat
            </Link>
            <button
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="block h-px w-6 bg-white/70" />
                  <span className="block h-px w-4 bg-white/70 ml-auto" />
                  <span className="block h-px w-6 bg-white/70" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-charcoal/98 backdrop-blur-xl border-t border-white/5">
          <div className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-[13px] tracking-widest uppercase text-white/60 hover:text-accent py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/plan-my-retreat"
              className="block text-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal py-3 px-6 text-[13px] tracking-wider uppercase font-semibold transition-all"
            >
              Plan My Retreat
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
