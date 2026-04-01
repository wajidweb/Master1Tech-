import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowRight } from 'lucide-react'

const retreatTypes = [
  { value: 'Executive Retreat' },
  { value: 'Leadership Immersion' },
  { value: 'Wellness & Strategy' },
  { value: 'GCC Discovery' },
]

const destinationOptions = [
  { value: 'Pakistan' },
  { value: 'Indonesia' },
  { value: 'Philippines' },
  { value: 'Vietnam' },
  { value: 'Thailand' },
  { value: 'Sri Lanka' },
  { value: 'Kenya' },
  { value: 'Mexico' },
]

const groupSizes = ['4', '6', '8', '10', '12', '15', '20']

const destinationRoutes = {
  'Pakistan': 'pakistan',
  'Indonesia': 'indonesia',
  'Philippines': 'philippines',
  'Vietnam': 'vietnam',
  'Thailand': 'thailand',
  'Sri Lanka': 'sri-lanka',
  'Kenya': 'kenya',
  'Mexico': 'mexico',
}

function Dropdown({ options, selected, onSelect, label, activeId, id, onToggle }) {
  const ref = useRef(null)
  const isOpen = activeId === id

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : id)}
        className={`w-full flex items-center gap-3 px-4 py-3 sm:py-3.5 rounded-xl transition-all duration-200 text-left ${
          isOpen
            ? 'bg-white/10 border-accent/30 ring-1 ring-accent/20'
            : 'bg-white/3 hover:bg-white/7 border-white/6'
        } border`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-white/30 tracking-wider uppercase font-medium mb-0.5">{label}</p>
          <p className={`text-sm font-light truncate ${selected ? 'text-white' : 'text-white/45'}`}>
            {selected || `Select ${label}`}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-180 text-accent' : 'text-white/20'
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-[100] overflow-hidden animate-in">
          <div className="py-1.5 max-h-[240px] overflow-y-auto">
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt
              const isSelected = selected === val
              return (
                <button
                  key={val}
                  className={`w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-3 transition-colors ${
                    isSelected
                      ? 'bg-accent/10 text-accent'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => { onSelect(val); onToggle(null) }}
                >
                  <span className="font-light">{val}</span>
                  {isSelected && <span className="ml-auto text-accent text-xs">✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const [retreatType, setRetreatType] = useState('')
  const [destination, setDestination] = useState('')
  const [groupSize, setGroupSize] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const containerRef = useRef(null)

  const handleFindRetreat = () => {
    if (destination && destinationRoutes[destination]) {
      navigate(`/destinations/${destinationRoutes[destination]}`)
    } else {
      navigate('/destinations')
    }
  }

  const handleClickOutside = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setActiveDropdown(null)
    }
  }, [])

  useEffect(() => {
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [activeDropdown, handleClickOutside])

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Luxury executive retreat destination"
          className="object-cover object-center absolute h-full w-full inset-0 scale-[1.02]"
          src="/khoj/Beach-hero.jpg"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/40 via-charcoal/20 to-charcoal/70" />
      </div>

      <div className="relative z-10 container-wide text-center text-white px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-6 sm:mb-8">
            Executive Retreats &middot; GCC Advisory
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.02] mb-5 sm:mb-7 max-w-2xl mx-auto">
            Beyond <span className="text-accent italic">Travel.</span>
            <br />
            Into <span className="text-white">Opportunity.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/75 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Curated retreats where leaders explore new markets, build powerful <br /> networks, and return with a sharper vision.
          </p>

          <div
            ref={containerRef}
            className="liquid-glass rounded-2xl p-3.5 sm:p-4 md:p-5 max-w-3xl mx-auto border border-white/15 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="relative z-[60] grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
              <Dropdown
                id="retreat"
                options={retreatTypes}
                selected={retreatType}
                onSelect={setRetreatType}
                label="Retreat Style"

                activeId={activeDropdown}
                onToggle={setActiveDropdown}
              />
              <Dropdown
                id="destination"
                options={destinationOptions}
                selected={destination}
                onSelect={setDestination}
                label="Destination"

                activeId={activeDropdown}
                onToggle={setActiveDropdown}
              />
              <Dropdown
                id="group"
                options={groupSizes}
                selected={groupSize}
                onSelect={setGroupSize}
                label="Group Size"

                activeId={activeDropdown}
                onToggle={setActiveDropdown}
              />
            </div>
            <div className="relative z-0">
              <button
                onClick={handleFindRetreat}
                className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-all duration-300 rounded-xl bg-accent text-charcoal hover:bg-accent-light h-11 sm:h-12 px-7 sm:px-9 text-[12px] sm:text-[13px] tracking-[0.08em] uppercase w-full md:w-auto md:min-w-[240px] cursor-pointer"
              >
                Find My Retreat
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  )
}
