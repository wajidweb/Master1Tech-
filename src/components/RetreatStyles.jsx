import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'

const styles = [
  {
    title: 'Beach Retreats',
    subtitle: 'Luxury wellness meets GCC discovery',
    description: 'Khoj Allana on the Arabian Sea, Bali\'s sacred temples, Boracay\'s white sands — 5-6 day immersions blending deep wellness with strategic GCC education.',
    tags: ['Khoj Allana', 'Bali', 'Phuket', 'Cancun'],
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    link: '/destinations?type=beach',
  },
  {
    title: 'Mountain Retreats',
    subtitle: 'Leadership in the heights',
    description: 'Khoj Skardu Shigar in the Karakoram, ancient forts, river valleys — leadership immersion with ancient wisdom, tech park tours, and breathtaking peaks.',
    tags: ['Skardu Shigar', 'Shigar Fort', 'STZA Parks'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    link: '/destinations?type=mountain',
    badge: 'Signature Experience',
  },
]

export default function RetreatStyles() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-3 sm:mb-4">
            Choose Your Retreat Experience
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate max-w-2xl mx-auto px-4">
            Whether you seek coastal rejuvenation or mountain inspiration, we craft transformative
            leadership journeys that match your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {styles.map((style) => (
            <Link key={style.title} to={style.link} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-square sm:aspect-[4/3] md:aspect-[16/10] transition-all duration-500 group-hover:shadow-2xl">
                <img
                  alt={style.title}
                  loading="lazy"
                  className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-105"
                  src={style.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {style.badge && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-accent text-charcoal px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg whitespace-nowrap">
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="currentColor" />
                      {style.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
                  <p className="text-accent text-xs sm:text-sm font-semibold mb-1 sm:mb-2 uppercase tracking-wider text-shadow-sm">
                    {style.subtitle}
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 text-shadow-md">
                    {style.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 max-w-md line-clamp-2 sm:line-clamp-none text-shadow-sm">
                    {style.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {style.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-white text-sm sm:text-base font-semibold group-hover:gap-3 transition-all text-shadow-sm">
                    Explore Retreats
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
