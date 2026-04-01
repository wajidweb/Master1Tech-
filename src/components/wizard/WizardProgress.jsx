const stepNames = [ 'When', 'Who', 'Style', 'Details']

export default function WizardProgress({ currentStep }) {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {stepNames.map((name, i) => (
        <div
          key={name}
          className={`h-0.5 sm:h-1 flex-1 rounded-full transition-all duration-500 ${
            i < currentStep ? 'bg-accent' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

export { stepNames }
