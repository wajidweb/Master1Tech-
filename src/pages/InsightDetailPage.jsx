import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { insights } from '../data/insights'

export default function InsightDetailPage() {
  const { id } = useParams()

  const insight = useMemo(() => insights.find((x) => x.id === id), [id])

  if (!insight) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-white mb-4">Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero — full-bleed, cinematic */}
      <section className="relative min-h-[62vh] md:min-h-[72vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            alt=""
            className="object-cover object-center absolute h-full w-full inset-0"
            src={insight.heroImage}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/35 to-transparent" />
        </div>

        <div className="relative z-10 w-full p-4 sm:p-6 md:p-10 pb-10 md:pb-14">
          <div className="container-wide max-w-5xl">
            <nav className="flex items-center gap-2 text-[11px] text-white/45 tracking-wider uppercase mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/25">/</span>
              <span className="text-white/70">Insights</span>
            </nav>
            <p className="text-accent text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">{insight.eyebrow}</p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-white leading-[1.08] max-w-4xl">
              {insight.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Intro — accent line + centered copy + offset panel (theme: dark luxury) */}
      <section className="relative bg-charcoal pt-12 sm:pt-16 pb-4 overflow-hidden">
        <div className="absolute right-0 top-0 w-[min(42%,420px)] h-[280px] md:h-[360px] rounded-bl-[48px] bg-surface/80 border border-white/5 pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="h-px w-16 sm:w-24 bg-accent/70 mx-auto mb-8" />
            {insight.intro.map((p, idx) => (
              <p key={idx} className="text-white/65 text-sm sm:text-base leading-[1.75] mb-6 last:mb-0 font-light">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating image / text rows — KHOJ-style rhythm, dark theme */}
      <section className="bg-charcoal pb-6 sm:pb-10">
        <div className="container-wide space-y-16 sm:space-y-20 md:space-y-24">
          {insight.blocks.map((block, i) => {
            const imageFirst = i % 2 === 0
            return (
              <div
                key={block.title}
                className={`relative flex flex-col gap-8 md:gap-12 lg:gap-16 md:items-center ${
                  imageFirst ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="relative w-full md:w-[46%] lg:w-[42%] shrink-0">
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.5)] bg-surface">
                    <img
                      alt=""
                      loading="lazy"
                      className="object-cover absolute h-full w-full inset-0"
                      src={block.image}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 relative md:py-2">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-[2rem] font-medium text-white mb-5 leading-snug">
                    {block.title}
                  </h2>
                  <div className="space-y-4">
                    {block.paragraphs.map((para, j) => (
                      <p key={j} className="text-white/60 text-sm sm:text-base leading-[1.8] font-light">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <Link
                      to="/plan-my-retreat"
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-white/40 hover:text-accent transition-colors"
                    >
                      Plan retreat
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Gallery */}
      {insight.gallery?.length > 0 && (
        <section className="section-padding bg-surface border-t border-white/5">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">Gallery</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-white">Moments from the journey</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {insight.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-charcoal group"
                >
                  <img alt="" loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-105" src={src} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-charcoal border-t border-white/5">
        <div className="container-wide max-w-3xl mx-auto text-center px-4">
          <p className="text-white/45 text-sm mb-6 font-light leading-relaxed">
            Ready to shape a retreat around these outcomes? Our team will align facilities, briefings, and discovery sessions to your mandate.
          </p>
          <Link
            to="/plan-my-retreat"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-charcoal hover:bg-accent-light px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
          >
            Plan my retreat
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
