import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { destinations } from '../data/destinations'

export default function DestinationsPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Luxury retreat destinations"
            className="object-cover object-center absolute h-full w-full inset-0"
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=2070&q=80"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        </div>
        <div className="relative z-10 container-wide text-center text-white px-4">
          <p className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-shadow-sm">
            8 Emerging Markets
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-shadow-lg">
            Explore Our Retreat Destinations
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto text-shadow-sm">
            Each destination combines luxury resort experiences with high-potential
            Global Capability Center markets.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {destinations.map((d) => (
              <div
                key={d.id}
                className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
              >
                <img
                  alt={d.name}
                  loading="lazy"
                  className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110"
                  src={d.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                    {d.packages} Retreat{d.packages !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-10">
                  <span className="text-2xl sm:text-3xl mb-1 block">{d.flag}</span>
                  <p className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 text-shadow-sm">
                    {d.tagline}
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1 text-shadow-md">
                    {d.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2 text-shadow-sm">
                    {d.cities}
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3">
                    {d.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-shadow-sm">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-3 sm:mb-4">
            Can't Decide? Let Us Help.
          </h2>
          <p className="text-slate text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our retreat advisors will match your team's goals with the perfect destination,
            resort, and GCC opportunity.
          </p>
          <Link
            to="/plan-my-retreat"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all hover:bg-brand-hover hover:scale-105 shadow-lg"
          >
            Start Planning
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
