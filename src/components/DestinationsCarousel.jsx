import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'

export default function DestinationsCarousel() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' })
    setTimeout(checkScroll, 400)
  }

  return (
    <section className="section-padding bg-charcoal">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Our Markets</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Explore by Destination
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              disabled={!canScrollLeft}
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? 'border-white/20 text-white/60 hover:bg-white/5 hover:text-white'
                  : 'border-white/5 text-white/15 cursor-not-allowed'
              }`}
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              disabled={!canScrollRight}
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? 'border-white/20 text-white/60 hover:bg-white/5 hover:text-white'
                  : 'border-white/5 text-white/15 cursor-not-allowed'
              }`}
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((d) => (
              <div key={d.id} className="shrink-0 w-64 sm:w-72 md:w-[320px]">
                <DestinationCard destination={d} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 tracking-wider mt-4 sm:hidden">
          &larr; Swipe to explore &rarr;
        </p>
      </div>
    </section>
  )
}
