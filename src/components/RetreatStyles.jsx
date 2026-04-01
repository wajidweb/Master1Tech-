import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const resorts = [
  {
    title: 'Khoj Allana',
    tagline: 'Executive coastal luxury near Karachi',
    image: '/khoj/Beach-hero.jpg',
    link: '/destinations/pakistan/khoj-allana',
  },
  {
    title: 'Khoj Shigar Valley',
    tagline: 'Leadership beneath the Karakoram peaks',
    image: '/khoj/shigar/khojshigarhero.jpeg',
    link: '/destinations/pakistan/khoj-shigar',
  },
]

export default function RetreatStyles() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Pakistan Experiences</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
            Explore <span className="text-accent">Pakistan Like never before</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {resorts.map((resort) => (
            <Link key={resort.title} to={resort.link} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-square sm:aspect-4/3 md:aspect-16/10">
                <img
                  alt={resort.title}
                  loading="lazy"
                  className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-105"
                  src={resort.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 z-10">
                  <p className="text-accent/70 text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">{resort.tagline}</p>
                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">
                    {resort.title}
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
