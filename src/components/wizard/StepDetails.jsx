export default function StepDetails({ selected = {}, onUpdate }) {
  const { name = '', email = '', company = '', role = '', notes = '' } = selected

  const update = (field, value) => {
    onUpdate({ ...selected, [field]: value })
  }

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">STEP 5</p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
          Tell us about your team
        </h1>
        <p className="text-slate text-sm sm:text-base">
          We'll craft a personalized retreat proposal within 48 hours
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">Full Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-sm text-charcoal placeholder:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">Business Email *</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-sm text-charcoal placeholder:text-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-1.5">Company *</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Acme Corp"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-sm text-charcoal placeholder:text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-charcoal mb-1.5">Your Role *</label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => update('role', e.target.value)}
              placeholder="CTO"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-sm text-charcoal placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">Special Requirements (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Any dietary requirements, accessibility needs, specific goals for the retreat..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-colors text-sm text-charcoal placeholder:text-gray-400 resize-none"
          />
        </div>

        <div className="bg-cream rounded-xl p-4 text-center">
          <p className="text-xs text-slate">
            By submitting, you agree to receive a personalized retreat proposal from Master1Tech.
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>
  )
}
