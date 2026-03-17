const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const seasons = [
  { label: 'Q1 (Jan-Mar)', value: 'q1' },
  { label: 'Q2 (Apr-Jun)', value: 'q2' },
  { label: 'Q3 (Jul-Sep)', value: 'q3' },
  { label: 'Q4 (Oct-Dec)', value: 'q4' },
]

export default function StepWhen({ selected = '', onUpdate }) {
  return (
    <div>
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Step 2</p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
          When would you like to go?
        </h1>
        <p className="text-white/40 text-sm font-semibold">
          Select your preferred month or quarter
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">By Quarter</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {seasons.map((s) => (
            <button
              key={s.value}
              onClick={() => onUpdate(s.value)}
              className={`p-4 rounded-xl border transition-all text-center ${
                selected === s.value
                  ? 'border-accent bg-accent/10 text-white'
                  : 'border-white/10 hover:border-accent/30 text-white/50'
              }`}
            >
              <span className="text-sm font-semibold block">{s.label}</span>
            </button>
          ))}
        </div>

        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">By Month</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => onUpdate(m)}
              className={`p-3 rounded-xl border transition-all text-center ${
                selected === m
                  ? 'border-accent bg-accent/10 text-white font-semibold'
                  : 'border-white/10 hover:border-accent/30 text-white/50'
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
