import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { retreatPackages, retreatStyleCategories } from '../data/retreatPackages'
import { destinations } from '../data/destinations'

function PackageCard({ pkg }) {
  const dest = destinations.find((d) => d.name === pkg.destination)
  const tripLink = dest ? `/destinations/${dest.id}/${pkg.id}` : '/destinations'

  return (
    <Link to={tripLink} className="group">
      <article className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/8 hover:border-accent/40 transition-all duration-500 h-full flex flex-col shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            alt={pkg.title}
            loading="lazy"
            className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-105"
            src={pkg.image}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded-full text-[10px] font-semibold border border-white/10">
              {pkg.destination}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <span className="text-accent/70 font-semibold text-[11px] tracking-wider">{pkg.duration}</span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-accent transition-colors">
            {pkg.title}
          </h3>
          <p className="text-[11px] text-white/40 mb-auto">{pkg.cities}</p>
          <div className="flex items-end justify-between pt-4 mt-4 border-t border-white/10">
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">{pkg.priceNote}</p>
              <p className="font-heading text-xl sm:text-2xl font-semibold text-accent">{pkg.price}</p>
            </div>
            <span className="inline-flex items-center text-white/40 font-semibold text-[11px] tracking-wider uppercase group-hover:text-accent transition-colors">
              View details &#8594;
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
    <section className="py-12 sm:py-16 bg-charcoal overflow-hidden">
      <div className="container-wide mb-6 sm:mb-8 flex items-end justify-between">
        <div>
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Not Your Style?</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Other Experiences
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <span className="text-sm">{'\u2039'}</span>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <span className="text-sm">{'\u203A'}</span>
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
            return (
              <Link
                key={style.id}
                to={`/retreat-styles?style=${style.id}`}
                className="group shrink-0 snap-start"
              >
                <div className="relative w-56 sm:w-64 md:w-72 aspect-4/5 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/8 hover:border-accent/40 transition-all shadow-[0_16px_55px_rgba(0,0,0,0.45)]">
                  <img
                    alt={style.name}
                    loading="lazy"
                    className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-110"
                    src={style.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-0.5">
                      {style.name}
                    </h3>
                    <p className="text-white/40 text-[11px] mb-3">{style.subtitle}</p>
                    <span className="inline-flex items-center text-white/40 font-semibold text-[11px] tracking-wider uppercase group-hover:text-accent transition-colors">
                      Explore &#8594;
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
  let filteredPackages = retreatPackages.filter((p) => p.style === styleId)

  // Ensure Khoj Allana appears in Beaches (wellness-style) and stays first.
  if (styleId === 'wellness-strategy') {
    const khojAllana = retreatPackages.find((p) => p.id === 'khoj-allana-beach')
    if (khojAllana && !filteredPackages.some((p) => p.id === khojAllana.id)) {
      filteredPackages = [khojAllana, ...filteredPackages]
    } else if (khojAllana) {
      filteredPackages = [
        khojAllana,
        ...filteredPackages.filter((p) => p.id !== khojAllana.id),
      ]
    }
  }

  const allPackages = filteredPackages.length > 0 ? filteredPackages : retreatPackages

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          alt={currentStyle.name}
          className="object-cover absolute h-full w-full inset-0"
          src={currentStyle.image}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-transparent to-charcoal/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <nav className="flex items-center justify-center gap-2 text-[11px] text-white/40 tracking-wider uppercase mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link to="/retreat-styles" className="hover:text-white transition-colors">Retreat Styles</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/70">{currentStyle.name}</span>
            </nav>
            <div className="inline-flex max-w-xl w-full">
              <div className="liquid-glass w-full rounded-3xl bg-white/8 backdrop-blur-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.65)] px-6 sm:px-8 py-6 sm:py-7 text-left">
                <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
                  Retreat Style
                </p>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3">
                  {currentStyle.name}
                </h1>
                <p className="text-sm sm:text-base text-white/70 font-medium leading-relaxed">
                  {currentStyle.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="mb-6 sm:mb-8">
            <p className="text-[11px] text-white/30 tracking-wider uppercase">
              {allPackages.length} retreat{allPackages.length !== 1 ? 's' : ''} &middot; {currentStyle.name}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
