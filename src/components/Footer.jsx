import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pb-24 sm:pb-20 md:pb-0">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-white">
                Master<span className="text-accent">1</span>Tech
              </span>
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Exclusive executive retreats that bridge Fortune 1000 C-suite leaders with high-potential
              emerging markets for Global Capability Centers.
            </p>
            <div className="mt-4 sm:mt-6 flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-accent" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-accent" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-accent" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white">Destinations</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              {destinations.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <Link to="/destinations" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/destinations" className="text-xs sm:text-sm text-accent transition-colors hover:text-accent-light">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white">Retreat Styles</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <li>
                <Link to="/retreat-styles?style=executive-retreats" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent">
                  Executive Retreats
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=leadership-immersion" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent">
                  Leadership Immersion
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=wellness-strategy" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent">
                  Wellness & Strategy
                </Link>
              </li>
              <li>
                <Link to="/retreat-styles?style=gcc-discovery" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent">
                  GCC Discovery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white">Email Us</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <li>
                <a href="mailto:info@master1tech.com" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent break-all">
                  info@master1tech.com
                </a>
              </li>
              <li>
                <a href="mailto:retreats@master1tech.com" className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-accent break-all">
                  retreats@master1tech.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white">Headquarters</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <li><span className="text-xs sm:text-sm text-gray-400">Asbury Park, NJ</span></li>
              <li><span className="text-xs sm:text-sm text-gray-400">United States</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-wide py-4 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} Master1Tech LLC. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <span className="text-xs sm:text-sm text-gray-500 transition-colors hover:text-gray-300 cursor-pointer">Privacy Policy</span>
              <span className="text-xs sm:text-sm text-gray-500 transition-colors hover:text-gray-300 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
