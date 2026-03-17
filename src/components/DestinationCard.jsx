import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function DestinationCard({ destination, selectable = false, selected = false, onSelect }) {
  const { id, name, flag, tagline, image } = destination

  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(id)}
        className={`group relative aspect-4/3 rounded-xl overflow-hidden transition-all border-2 ${
          selected ? 'border-accent ring-1 ring-accent/30' : 'border-white/5 hover:border-accent/30'
        }`}
      >
        <img
          alt={name}
          loading="lazy"
          className="object-cover absolute h-full w-full inset-0 transition-transform duration-300 group-hover:scale-105"
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        {selected && (
          <div className="absolute top-2 right-2 z-10 bg-accent text-charcoal rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <span className="text-xl mb-0.5 block">{flag}</span>
          <h3 className="font-heading text-base sm:text-lg font-semibold text-white">{name}</h3>
        </div>
      </button>
    )
  }

  return (
    <Link to={`/destinations/${id}`} className="group block">
      <div className="relative h-80 sm:h-90 md:h-100 rounded-xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-white/5">
        <img
          alt={name}
          loading="lazy"
          className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110"
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="text-accent/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-1">{tagline}</p>
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-3">
            {name}
          </h3>
          <span className="flex items-center gap-1.5 text-white/30 text-[12px] tracking-wider uppercase font-semibold opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
