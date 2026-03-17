import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const retreatTypes = ['Executive Retreat', 'Leadership Immersion', 'Wellness & Strategy', 'GCC Discovery']
const destinationOptions = ['Pakistan', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Sri Lanka', 'Kenya', 'Mexico']
const groupSizes = ['6', '8', '10', '12']

function Dropdown({ options, selected, onSelect, label }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg sm:rounded-xl backdrop-blur-sm text-accent font-bold underline underline-offset-4 decoration-accent/50 transition-all duration-200 cursor-pointer text-xs sm:text-sm md:text-base"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected || label}</span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/80 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-2 min-w-[160px] z-50">
          {options.map((opt) => (
            <li key={opt}>
              <button
                className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-accent/10 hover:text-accent transition-colors"
                onClick={() => { onSelect(opt); setOpen(false) }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  )
}

export default function Hero() {
  const [retreatType, setRetreatType] = useState('')
  const [destination, setDestination] = useState('')
  const [groupSize, setGroupSize] = useState('')

  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Luxury executive retreat destination"
          className="object-cover object-center absolute h-full w-full inset-0"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2070&q=80"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 container-wide text-center text-white px-4 sm:px-6 -mt-16 sm:mt-0 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 text-shadow-lg">
            Your Gateway to{' '}
            <span className="text-accent">Extraordinary Executive Retreats</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl mx-auto font-medium px-2 text-shadow-sm">
            Exclusive leadership experiences across 8 emerging markets — luxury wellness,
            team-building, and GCC discovery at world-class resorts.
          </p>

          <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 max-w-3xl mx-auto relative">
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl hidden sm:block" />
            <div className="relative z-10 font-sans text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-8 font-medium leading-relaxed tracking-wide">
              Plan a{' '}
              <Dropdown options={retreatTypes} selected={retreatType} onSelect={setRetreatType} label="Retreat Type" />
              {' '}to{' '}
              <Dropdown options={destinationOptions} selected={destination} onSelect={setDestination} label="Destination" />
              {' '}for{' '}
              <Dropdown options={groupSizes} selected={groupSize} onSelect={setGroupSize} label="8" />
              {' '}Executive{groupSize !== '1' ? 's' : ''}.
            </div>
            <div className="relative z-10">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 rounded-full bg-brand text-white hover:bg-brand-hover h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Find My Retreat
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  )
}
