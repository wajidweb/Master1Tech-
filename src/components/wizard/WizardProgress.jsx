const stepNames = ['Where', 'When', 'Who', 'Style', 'Details']

export default function WizardProgress({ currentStep }) {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {stepNames.map((name, i) => (
        <div
          key={name}
          className={`h-1 sm:h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < currentStep ? 'bg-accent' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export { stepNames }
