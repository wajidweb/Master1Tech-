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
    const amount = direction === 'left' ? -340 : 340
    el.scrollBy({ left: amount, behavior: 'smooth' })
    setTimeout(checkScroll, 400)
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
              Explore by Destination
            </h2>
            <p className="text-slate text-sm sm:text-base">
              Discover high-potential emerging markets for your next executive retreat
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              disabled={!canScrollLeft}
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border-2 transition-all ${
                canScrollLeft
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              disabled={!canScrollRight}
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border-2 transition-all ${
                canScrollRight
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
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
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((d) => (
              <div key={d.id} className="shrink-0 w-64 sm:w-72 md:w-[320px]">
                <DestinationCard destination={d} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-slate mt-3 sm:mt-4 sm:hidden">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  )
}
