import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function DestinationCard({ destination, selectable = false, selected = false, onSelect }) {
  const { id, name, flag, tagline, cities, packages, image } = destination

  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(id)}
        className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:ring-2 hover:ring-accent hover:ring-offset-2 ${
          selected ? 'ring-2 ring-accent ring-offset-2' : ''
        }`}
      >
        <img
          alt={name}
          loading="lazy"
          className="object-cover absolute h-full w-full inset-0 transition-transform duration-300 group-hover:scale-105"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {selected && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-accent text-charcoal rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <span className="text-xl sm:text-2xl mb-0.5 sm:mb-1 block">{flag}</span>
          <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white">{name}</h3>
        </div>
      </button>
    )
  }

  return (
    <Link to="/destinations" className="group block">
      <div className="relative h-80 sm:h-[22.5rem] md:h-[25rem] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
        <img
          alt={name}
          loading="lazy"
          className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
          <p className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 sm:mb-1 text-shadow-sm">
            {tagline}
          </p>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 text-shadow-md">
            {name}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 text-shadow-sm">
            {cities}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs sm:text-sm text-shadow-sm">
              {packages} Retreat{packages !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-shadow-sm">
              Explore
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
