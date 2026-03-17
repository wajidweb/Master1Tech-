import { Sun, Mountain, Compass, Brain, HeartPulse, Presentation } from 'lucide-react'

const retreatStyles = [
  {
    value: 'beach-wellness',
    label: 'Beach & Wellness',
    icon: Sun,
    description: 'Oceanfront luxury, spa rejuvenation, yoga, meditation, and gourmet dining.',
  },
  {
    value: 'mountain-leadership',
    label: 'Mountain Leadership',
    icon: Mountain,
    description: 'High-altitude vision building, cultural immersion, ancient sites, and adventure.',
  },
  {
    value: 'combined',
    label: 'Combined Experience',
    icon: Compass,
    description: 'The best of both worlds — coastal wellness followed by mountain leadership.',
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
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">STEP 4</p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
          What's your retreat style?
        </h1>
        <p className="text-slate text-sm sm:text-base">
          Choose the experience type and focus areas for your retreat
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Retreat Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {retreatStyles.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.value}
                onClick={() => onUpdate({ ...selected, style: s.value })}
                className={`p-5 rounded-xl border-2 transition-all text-left ${
                  style === s.value
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                }`}
              >
                <Icon className={`h-8 w-8 mb-3 ${style === s.value ? 'text-accent' : 'text-slate'}`} />
                <span className="text-sm font-semibold text-charcoal block">{s.label}</span>
                <span className="text-xs text-slate block mt-1 leading-relaxed">{s.description}</span>
              </button>
            )
          })}
        </div>

        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Focus Areas (select all that apply)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {focusAreas.map((f) => {
            const Icon = f.icon
            const isSelected = focuses.includes(f.value)
            return (
              <button
                key={f.value}
                onClick={() => toggleFocus(f.value)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isSelected ? 'text-accent' : 'text-slate'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-charcoal' : 'text-slate'}`}>{f.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
