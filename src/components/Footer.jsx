import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5 pb-24 sm:pb-20 md:pb-0">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-heading text-3xl font-semibold tracking-wide text-white">
                Master<span className="text-accent">1</span>Tech
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-white/40 leading-relaxed">
              Exclusive executive retreats bridging Fortune 1000 leaders with
              high-potential emerging markets.
            </p>
            <div className="mt-6 flex gap-5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-accent" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-accent" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-accent" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-4">Destinations</h3>
            <ul className="space-y-2.5">
              {destinations.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <Link to={`/destinations/${d.id}`} className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/destinations" className="text-xs sm:text-sm text-accent/70 transition-colors hover:text-accent">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-4">Retreat Styles</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/retreat-styles?style=executive-retreats" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent">
                  Executive Retreats
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=leadership-immersion" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent">
                  Leadership Immersion
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=wellness-strategy" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent">
                  Wellness & Strategy
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=gcc-discovery" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent">
                  GCC Discovery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-4">Email</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@master1tech.com" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent break-all">
                  info@master1tech.com
                </a>
              </li>
              <li>
                <a href="mailto:retreats@master1tech.com" className="text-xs sm:text-sm text-white/40 transition-colors hover:text-accent break-all">
                  retreats@master1tech.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-4">HQ</h3>
            <ul className="space-y-2.5">
              <li><span className="text-xs sm:text-sm text-white/40">Asbury Park, NJ</span></li>
              <li><span className="text-xs sm:text-sm text-white/40">United States</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide py-4 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
            <p className="text-[11px] text-white/25 text-center sm:text-left tracking-wide">
              &copy; {new Date().getFullYear()} Master1Tech LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-[11px] text-white/25 transition-colors hover:text-white/50 cursor-pointer tracking-wide">Privacy</span>
              <span className="text-[11px] text-white/25 transition-colors hover:text-white/50 cursor-pointer tracking-wide">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
