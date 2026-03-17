import { destinations } from '../../data/destinations'
import DestinationCard from '../DestinationCard'

export default function StepWhere({ selected = [], onUpdate }) {
  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter((d) => d !== id)
      : [...selected, id]
    onUpdate(next)
  }

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-accent font-semibold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">STEP 1</p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-1 sm:mb-2">
          Where would you like to retreat?
        </h1>
        <p className="text-slate text-sm sm:text-base">
          Select one or more destinations for your executive retreat
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            selectable
            selected={selected.includes(d.id)}
            onSelect={toggle}
          />
        ))}
      </div>
    </div>
  )
}
