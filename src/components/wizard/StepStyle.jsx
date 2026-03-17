import { Sun, Mountain, Compass, Brain, HeartPulse, Presentation } from 'lucide-react'

const retreatStyles = [
  {
    value: 'beach-wellness',
    label: 'Beach & Wellness',
    icon: Sun,
    description: 'Oceanfront luxury, spa rejuvenation, and gourmet dining.',
  },
  {
    value: 'mountain-leadership',
    label: 'Mountain Leadership',
    icon: Mountain,
    description: 'High-altitude vision building and cultural immersion.',
  },
  {
    value: 'combined',
    label: 'Combined Experience',
    icon: Compass,
    description: 'Coastal wellness followed by mountain leadership.',
  },
]

const focusAreas = [
  { value: 'team-building', label: 'Team Building', icon: HeartPulse },
  { value: 'strategy', label: 'Strategic Planning', icon: Brain },
  { value: 'gcc-discovery', label: 'GCC Discovery', icon: Presentation },
]

export default function StepStyle({ selected = {}, onUpdate }) {
  const { style = '', focuses = [] } = selected

  const toggleFocus = (value) => {
    const next = focuses.includes(value)
      ? focuses.filter((f) => f !== value)
      : [...focuses, value]
    onUpdate({ ...selected, focuses: next })
  }

  return (
    <div>
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Step 4</p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
          What's your retreat style?
        </h1>
        <p className="text-white/40 text-sm font-semibold">
          Choose your experience type and focus areas
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">Retreat Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {retreatStyles.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.value}
                onClick={() => onUpdate({ ...selected, style: s.value })}
                className={`p-5 rounded-xl border transition-all text-left ${
                  style === s.value
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/30'
                }`}
              >
                <Icon className={`h-6 w-6 mb-3 ${style === s.value ? 'text-accent' : 'text-white/30'}`} />
                <span className="text-sm font-semibold text-white block">{s.label}</span>
                <span className="text-[11px] text-white/30 block mt-1 leading-relaxed">{s.description}</span>
              </button>
            )
          })}
        </div>

        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">Focus Areas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {focusAreas.map((f) => {
            const Icon = f.icon
            const isSelected = focuses.includes(f.value)
            return (
              <button
                key={f.value}
                onClick={() => toggleFocus(f.value)}
                className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/30'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isSelected ? 'text-accent' : 'text-white/30'}`} />
                <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-white/50'}`}>{f.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
