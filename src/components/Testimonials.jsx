import { Star } from 'lucide-react'
import { testimonials, stats } from '../data/testimonials'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" fill="currentColor" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-3 sm:mb-4">
            Trusted by Fortune 1000 Leaders
          </h2>
          <p className="text-slate text-sm sm:text-base max-w-2xl mx-auto px-4">
            Join visionary executives who have transformed their leadership perspective
            while discovering world-class GCC opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto sm:min-h-[200px]">
                  <img
                    alt={`${t.name} retreat to ${t.destination}`}
                    loading="lazy"
                    className="object-cover absolute h-full w-full inset-0"
                    src={t.image}
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="bg-accent text-charcoal px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                      {t.type}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <StarRating rating={t.rating} />
                    <p className="text-charcoal text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <p className="font-semibold text-charcoal text-xs sm:text-sm">{t.name}</p>
                    <p className="text-slate text-[10px] sm:text-xs">
                      {t.title} → {t.destination}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-4 sm:gap-8 text-center">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4 sm:gap-8">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-brand">{s.value}</p>
                <p className="text-slate text-xs sm:text-sm">{s.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="h-12 w-px bg-gray-300 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
