import { Users, User, Briefcase } from 'lucide-react'

const groupSizes = [
  { value: '6', label: '6 Executives', description: 'Intimate circle' },
  { value: '8', label: '8 Executives', description: 'Recommended', recommended: true },
  { value: '10', label: '10 Executives', description: 'Extended team' },
  { value: '12', label: '12 Executives', description: 'Full retreat' },
]

const groupTypes = [
  { value: 'c-suite', label: 'C-Suite Only', icon: Briefcase, description: 'CEO, CTO, CIO, CHRO' },
  { value: 'mixed', label: 'Mixed Leadership', icon: Users, description: 'C-Suite + VPs/Directors' },
  { value: 'single-dept', label: 'Single Department', icon: User, description: 'Tech, HR, or Ops leaders' },
]

export default function StepWho({ selected = {}, onUpdate }) {
  const { size = '', type = '' } = selected

  return (
    <div>
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Step 3</p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
          How large is your group?
        </h1>
        <p className="text-white/40 text-sm font-semibold">
          Tell us about the executives joining
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">Group Size</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {groupSizes.map((g) => (
            <button
              key={g.value}
              onClick={() => onUpdate({ ...selected, size: g.value })}
              className={`p-4 rounded-xl border transition-all text-center relative ${
                size === g.value
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 hover:border-accent/30'
              }`}
            >
              {g.recommended && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                  Popular
                </span>
              )}
              <span className={`text-xl font-heading font-semibold block ${size === g.value ? 'text-accent' : 'text-white'}`}>
                {g.value}
              </span>
              <span className="text-[10px] text-white/30 block mt-1">{g.description}</span>
            </button>
          ))}
        </div>

        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">Group Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {groupTypes.map((g) => {
            const Icon = g.icon
            return (
              <button
                key={g.value}
                onClick={() => onUpdate({ ...selected, type: g.value })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  type === g.value
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/30'
                }`}
              >
                <Icon className={`h-5 w-5 mb-2 ${type === g.value ? 'text-accent' : 'text-white/30'}`} />
                <span className="text-sm font-semibold text-white block">{g.label}</span>
                <span className="text-[10px] text-white/30 block mt-0.5">{g.description}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
