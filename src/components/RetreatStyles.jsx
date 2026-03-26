import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const styles = [
  {
    title: 'Beaches',
    tagline: 'Coastal Rejuvenation',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    link: '/retreat-styles?style=wellness-strategy',
  },
  {
    title: 'Mountain Retreats',
    tagline: 'Elevated Leadership',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    link: '/retreat-styles?style=leadership-immersion',
    badge: 'Signature',
  },
]

export default function RetreatStyles() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Choose Your Path</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
            Two Ways to <span className="text-accent">Transform</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {styles.map((style) => (
            <Link key={style.title} to={style.link} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-square sm:aspect-4/3 md:aspect-16/10">
                <img
                  alt={style.title}
                  loading="lazy"
                  className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-105"
                  src={style.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                {style.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-semibold bg-accent/20 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full border border-accent/20">
                      {style.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 z-10">
                  <p className="text-accent/70 text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">{style.tagline}</p>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">
                    {style.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-white/50 text-[13px] tracking-wider uppercase font-semibold group-hover:text-accent group-hover:gap-3 transition-all duration-300">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
