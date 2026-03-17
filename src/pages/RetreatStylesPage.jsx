import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles, Users, Heart, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import { retreatPackages, retreatStyleCategories } from '../data/retreatPackages'

const iconMap = { Sparkles, Users, Heart, Briefcase }

function PackageCard({ pkg }) {
  return (
    <Link to="/plan-my-retreat" className="group">
      <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            alt={pkg.title}
            loading="lazy"
            className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-105"
            src={pkg.image}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-sm text-charcoal px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg">
              {pkg.destination}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <span className="text-accent font-semibold text-xs sm:text-sm">{pkg.duration}</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <p className="text-[10px] sm:text-xs text-slate mb-1">{pkg.cities}</p>
          <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-charcoal mb-2 group-hover:text-brand transition-colors">
            {pkg.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate line-clamp-2 mb-3 sm:mb-4 flex-1">
            {pkg.description}
          </p>
          <div className="flex items-end justify-between pt-3 sm:pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] sm:text-xs text-slate">{pkg.priceNote}</p>
              <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-brand">{pkg.price}</p>
            </div>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-brand font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
              View Details
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function OtherStylesCarousel({ currentStyleId }) {
  const scrollRef = useRef(null)
  const otherStyles = retreatStyleCategories.filter((s) => s.id !== currentStyleId)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <section className="py-12 sm:py-16 bg-cream overflow-hidden">
      <div className="container-wide mb-6 sm:mb-8 flex items-end justify-between">
        <div>
          <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">NOT YOUR STYLE?</p>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-charcoal">
            Discover Other Retreat Experiences
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal/5 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal/5 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="container-wide">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {otherStyles.map((style) => {
            const Icon = iconMap[style.icon] || Sparkles
            return (
              <Link
                key={style.id}
                to={`/retreat-styles?style=${style.id}`}
                className="group shrink-0 snap-start"
              >
                <div className="relative w-56 sm:w-64 md:w-72 aspect-4/5 rounded-2xl overflow-hidden">
                  <img
                    alt={style.name}
                    loading="lazy"
                    className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-110"
                    src={style.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-2.5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-white mb-1 text-shadow-sm">
                      {style.name}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{style.subtitle}</p>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-accent font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function RetreatStylesPage() {
  const [searchParams] = useSearchParams()
  const styleId = searchParams.get('style') || 'executive-retreats'

  const currentStyle = retreatStyleCategories.find((s) => s.id === styleId) || retreatStyleCategories[0]
  const Icon = iconMap[currentStyle.icon] || Sparkles
  const filteredPackages = retreatPackages.filter((p) => p.style === styleId)
  const allPackages = filteredPackages.length > 0 ? filteredPackages : retreatPackages

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          alt={currentStyle.name}
          className="object-cover absolute h-full w-full inset-0"
          src={currentStyle.image}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">{currentStyle.name}</span>
            </nav>
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
              <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-shadow-lg">
              {currentStyle.name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto text-shadow-sm">
              {currentStyle.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-slate">
              {allPackages.length} retreat{allPackages.length !== 1 ? 's' : ''} found for {currentStyle.name}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {allPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <OtherStylesCarousel currentStyleId={styleId} />
    </>
  )
}
