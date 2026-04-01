import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { testimonials } from '../data/testimonials'

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
  const items = useMemo(() => testimonials || [], [])
  const [active, setActive] = useState(0)
  const t = items[active] || items[0]

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3">
            Testimonials
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.28]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)',
                  backgroundSize: '44px 44px',
                }}
              />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-accent/10 blur-3xl rounded-full" />
            </div>

            <div className="relative px-5 sm:px-10 py-10 sm:py-14 text-center">
              <div className="text-7xl sm:text-8xl font-heading text-white/10 leading-none select-none mb-3">
                “
              </div>
              <p className="text-white/80 text-lg sm:text-2xl md:text-3xl font-medium leading-snug max-w-4xl mx-auto">
                {t?.text}
              </p>

              <div className="mt-6 sm:mt-8">
                <p className="text-white/80 font-semibold text-sm sm:text-base">{t?.name}</p>
                <p className="text-white/40 text-xs sm:text-sm font-semibold">{t?.title}</p>
              </div>

              <div className="mt-4 flex justify-center">
                <StarRating rating={t?.rating || 5} />
              </div>

              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2.5">
                {items.slice(0, 8).map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-200 ring-1 ${
                      i === active
                        ? 'ring-accent/60 opacity-100 scale-[1.02]'
                        : 'ring-white/10 opacity-45 hover:opacity-80'
                    }`}
                    style={{ width: 44, height: 44 }}
                    aria-label={`Show testimonial from ${x.name}`}
                    aria-pressed={i === active}
                  >
                    <img
                      alt={x.name}
                      loading="lazy"
                      className="object-cover absolute h-full w-full inset-0"
                      src={x.image}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
