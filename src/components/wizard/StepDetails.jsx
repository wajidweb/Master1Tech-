export default function StepDetails({ selected = {}, onUpdate }) {
  const { name = '', email = '', company = '', role = '', notes = '' } = selected

  const update = (field, value) => {
    onUpdate({ ...selected, [field]: value })
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-white/10 bg-surface focus:border-accent focus:outline-none transition-colors text-sm text-white placeholder:text-white/20 font-semibold'

  return (
    <div>
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Step 4</p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
          Tell us about your team
        </h1>
        <p className="text-white/40 text-sm font-semibold">
          We'll craft a personalized proposal within 48 hours
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-5">
        <div>
          <label htmlFor="name" className="block text-[11px] font-semibold text-white/50 mb-2 tracking-wider uppercase">Full Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="John Smith"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[11px] font-semibold text-white/50 mb-2 tracking-wider uppercase">Business Email *</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john@company.com"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-[11px] font-semibold text-white/50 mb-2 tracking-wider uppercase">Company *</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Acme Corp"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-[11px] font-semibold text-white/50 mb-2 tracking-wider uppercase">Your Role *</label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => update('role', e.target.value)}
              placeholder="CTO"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-[11px] font-semibold text-white/50 mb-2 tracking-wider uppercase">Special Requirements</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Dietary requirements, accessibility needs, goals..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="bg-surface rounded-xl border border-white/5 p-4 text-center">
          <p className="text-[11px] text-white/25 leading-relaxed">
            By submitting, you agree to receive a personalized retreat proposal from Master1Tech.
            We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  )
}
