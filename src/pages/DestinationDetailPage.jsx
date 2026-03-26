import { useParams, Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { destinations } from '../data/destinations'
import { retreatPackages } from '../data/retreatPackages'

export default function DestinationDetailPage() {
  const { id } = useParams()
  const dest = destinations.find((d) => d.id === id)

  if (!dest) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-white mb-4">Destination Not Found</h1>
          <Link to="/destinations" className="text-accent hover:underline">Back to Destinations</Link>
        </div>
      </div>
    )
  }

  const resorts = dest.resorts || []
  const destPackages = retreatPackages.filter((p) => p.destination === dest.name)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt={dest.name}
            className="object-cover object-center absolute h-full w-full inset-0"
            src={dest.heroImage}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-linear-to-b from-charcoal/50 via-transparent to-charcoal" />
        </div>
        <div className="relative z-10 container-wide text-center text-white px-4">
          <nav className="flex items-center justify-center gap-2 text-[11px] text-white/40 tracking-wider uppercase mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{dest.name}</span>
          </nav>
          <span className="text-4xl mb-3 block">{dest.flag}</span>
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">{dest.tagline}</p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            {dest.name}
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto font-semibold">
            {dest.description}
          </p>
        </div>
      </section>

      {/* Resorts / Places */}
      {resorts.length > 0 && (
        <section className="section-padding bg-charcoal">
          <div className="container-wide">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Available Retreats</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Resorts & Experiences in {dest.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {resorts.map((resort) => (
                <Link
                  to={`/destinations/${id}/${resort.id}`}
                  key={resort.id}
                  className="group relative bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      alt={resort.name}
                      loading="lazy"
                      className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110"
                      src={resort.image}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/30" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] tracking-[0.2em] uppercase font-semibold bg-black/50 backdrop-blur-md text-accent px-2.5 py-1 rounded-full border border-accent/20">
                        {resort.type}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-white/70 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[10px] font-semibold">{resort.location}</span>
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-1.5 group-hover:text-accent transition-colors leading-tight" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                        {resort.name}
                      </h3>
                      <p className="text-white/60 text-[11px] leading-relaxed line-clamp-2 mb-3">{resort.tagline}</p>
                      <span className="inline-flex items-center gap-1.5 text-accent text-[11px] tracking-wider uppercase font-semibold group-hover:gap-2.5 transition-all duration-300">
                        Explore
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No resorts fallback */}
      {resorts.length === 0 && (
        <section className="section-padding bg-charcoal">
          <div className="container-wide text-center">
            <p className="text-white/40 text-sm mb-6">Retreat details for {dest.name} coming soon.</p>
          </div>
        </section>
      )}

      {/* Retreat Packages for this destination */}
      {destPackages.length > 0 && (
        <section className="section-padding bg-surface border-t border-white/5">
          <div className="container-wide">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Packages</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Retreat Packages in {dest.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {destPackages.map((pkg) => (
                <Link to={`/destinations/${id}/${pkg.id}`} key={pkg.id} className="group">
                  <article className="bg-charcoal rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img
                        alt={pkg.title}
                        loading="lazy"
                        className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-105"
                        src={pkg.image}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5 text-white/70">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-[11px] text-white/30 mb-auto">{pkg.cities}</p>
                      <div className="flex items-end justify-between pt-4 mt-4 border-t border-white/5">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">{pkg.priceNote}</p>
                          <p className="font-heading text-xl sm:text-2xl font-semibold text-accent">{pkg.price}</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-white/30 font-semibold text-[11px] tracking-wider uppercase group-hover:text-accent group-hover:gap-2.5 transition-all">
                          Details
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-surface border-t border-white/5">
        <div className="container-wide text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
            Plan Your {dest.name} Retreat
          </h2>
          <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto font-semibold">
            Our advisors will match you with the perfect resort and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/plan-my-retreat"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
            >
              Start Planning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
            >
              All Destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
