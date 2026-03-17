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
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Step 1</p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
          Where would you like to retreat?
        </h1>
        <p className="text-white/40 text-sm font-semibold">
          Select one or more destinations
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
