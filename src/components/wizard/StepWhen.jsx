const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const seasons = [
  { label: 'Q1 (Jan-Mar)', value: 'q1', months: ['January', 'February', 'March'] },
  { label: 'Q2 (Apr-Jun)', value: 'q2', months: ['April', 'May', 'June'] },
  { label: 'Q3 (Jul-Sep)', value: 'q3', months: ['July', 'August', 'September'] },
  { label: 'Q4 (Oct-Dec)', value: 'q4', months: ['October', 'November', 'December'] },
]

export default function StepWhen({ selected = '', onUpdate }) {
  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">STEP 2</p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
          When would you like to go?
        </h1>
        <p className="text-slate text-sm sm:text-base">
          Select your preferred month or quarter for the retreat
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">By Quarter</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {seasons.map((s) => (
            <button
              key={s.value}
              onClick={() => onUpdate(s.value)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                selected === s.value
                  ? 'border-accent bg-accent/10 text-charcoal'
                  : 'border-gray-200 hover:border-accent/50 text-slate'
              }`}
            >
              <span className="text-sm sm:text-base font-medium block">{s.label}</span>
            </button>
          ))}
        </div>

        <h3 className="font-heading text-lg font-semibold text-charcoal mb-3">By Month</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => onUpdate(m)}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                selected === m
                  ? 'border-accent bg-accent/10 text-charcoal font-semibold'
                  : 'border-gray-200 hover:border-accent/50 text-slate'
              }`}
            >
              <span className="text-sm">{m}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
