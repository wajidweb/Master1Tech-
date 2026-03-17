import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2070&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-charcoal/90" />
      <div className="relative z-10 container-wide text-center px-4">
        <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Your Journey Begins</p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
          Ready to Transform Your Leadership?
        </h2>
        <p className="text-white/40 text-sm sm:text-base mb-8 sm:mb-10 max-w-lg mx-auto font-semibold leading-relaxed">
          Luxury wellness, strategic GCC insights, and unforgettable
          experiences — all in one journey.
        </p>
        <Link
          to="/plan-my-retreat"
          className="inline-flex items-center justify-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-charcoal px-8 sm:px-10 py-3.5 sm:py-4 text-[13px] sm:text-sm tracking-widest uppercase font-semibold transition-all duration-300"
        >
          Plan My Retreat
        </Link>
      </div>
    </section>
  )
}
