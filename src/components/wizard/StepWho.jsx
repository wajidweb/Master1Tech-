import { Users, User, Briefcase } from 'lucide-react'

const groupSizes = [
  { value: '6', label: '6 Executives', description: 'Intimate leadership circle' },
  { value: '8', label: '8 Executives', description: 'Recommended group size', recommended: true },
  { value: '10', label: '10 Executives', description: 'Extended leadership team' },
  { value: '12', label: '12 Executives', description: 'Full executive retreat' },
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
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">STEP 3</p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
          How large is your group?
        </h1>
        <p className="text-slate text-sm sm:text-base">
          Tell us about the executives joining the retreat
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Group Size</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {groupSizes.map((g) => (
            <button
              key={g.value}
              onClick={() => onUpdate({ ...selected, size: g.value })}
              className={`p-4 rounded-xl border-2 transition-all text-center relative ${
                size === g.value
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
            >
              {g.recommended && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <span className="text-xl sm:text-2xl font-bold text-charcoal block">{g.value}</span>
              <span className="text-xs text-slate block mt-1">{g.description}</span>
            </button>
          ))}
        </div>

        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">Group Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {groupTypes.map((g) => {
            const Icon = g.icon
            return (
              <button
                key={g.value}
                onClick={() => onUpdate({ ...selected, type: g.value })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  type === g.value
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-200 hover:border-accent/50'
                }`}
              >
                <Icon className={`h-6 w-6 mb-2 ${type === g.value ? 'text-accent' : 'text-slate'}`} />
                <span className="text-sm font-semibold text-charcoal block">{g.label}</span>
                <span className="text-xs text-slate block mt-1">{g.description}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
