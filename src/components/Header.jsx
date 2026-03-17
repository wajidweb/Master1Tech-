import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    { to: '/#about', label: 'About Us' },
    { to: '/#contact', label: 'Contact' },
  ]

  const headerBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  const textColor = scrolled || !isHome ? 'text-charcoal' : 'text-white'
  const logoText = scrolled || !isHome ? 'text-charcoal' : 'text-white'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="container-wide">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className={`font-heading text-xl sm:text-2xl font-bold ${logoText} transition-colors`}>
              Master<span className="text-accent">1</span>Tech
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${textColor} hover:text-accent`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/plan-my-retreat"
              className="items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 rounded-full bg-brand text-white hover:bg-brand-hover h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base hidden sm:inline-flex"
            >
              Plan My Retreat
            </Link>
            <button
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className={`h-6 w-6 ${textColor}`} />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className={`block h-0.5 w-6 transition-all ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
                  <span className={`block h-0.5 w-6 transition-all ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
                  <span className={`block h-0.5 w-6 transition-all ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-cream-dark">
          <div className="container-wide py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium text-charcoal hover:text-accent py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/plan-my-retreat"
              className="block text-center rounded-full bg-brand text-white hover:bg-brand-hover py-3 px-6 text-sm font-medium"
            >
              Plan My Retreat
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
