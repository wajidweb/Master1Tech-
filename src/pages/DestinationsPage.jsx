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
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-transparent to-charcoal" />
        </div>
        <div className="relative z-10 container-wide text-center text-white px-4">
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
            8 Emerging Markets
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4">
            Our Destinations
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto font-semibold">
            Luxury resort experiences paired with high-potential GCC markets.
          </p>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {destinations.map((d) => (
              <Link
                to={`/destinations/${d.id}`}
                key={d.id}
                className="group relative aspect-4/3 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-white/5 hover:border-white/10 block"
              >
                <img
                  alt={d.name}
                  loading="lazy"
                  className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110"
                  src={d.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
                  <span className="text-2xl mb-1 block">{d.flag}</span>
                  <p className="text-accent/50 text-[10px] font-semibold tracking-[0.2em] uppercase mb-0.5">
                    {d.tagline}
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white">
                    {d.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface border-t border-white/5">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3">
            Can't Decide?
          </h2>
          <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto font-semibold">
            Our retreat advisors will match your goals with the perfect destination.
          </p>
          <Link
            to="/plan-my-retreat"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
