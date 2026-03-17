import { Star } from 'lucide-react'
import { testimonials, stats } from '../data/testimonials'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-3 w-3 text-accent" fill="currentColor" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3">
            Trusted by Fortune 1000 Leaders
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto font-semibold">
            Visionary executives who transformed their perspective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-light rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto sm:min-h-[200px]">
                  <img
                    alt={`${t.name} retreat`}
                    loading="lazy"
                    className="object-cover absolute h-full w-full inset-0"
                    src={t.image}
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="bg-accent/20 backdrop-blur-sm text-accent px-2 py-0.5 rounded-full text-[10px] font-semibold border border-accent/20">
                      {t.type}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <StarRating rating={t.rating} />
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-none">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <p className="font-semibold text-white text-xs sm:text-sm">{t.name}</p>
                    <p className="text-white/30 text-[10px] sm:text-xs">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-6 sm:gap-10 text-center">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 sm:gap-10">
              <div>
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-accent">{s.value}</p>
                <p className="text-white/30 text-[11px] tracking-wider uppercase mt-1">{s.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="h-10 w-px bg-white/10 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
