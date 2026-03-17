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
      <div className="absolute inset-0 bg-charcoal/85" />
      <div className="relative z-10 container-wide text-center px-4">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-shadow-lg">
          Ready to Transform Your Leadership?
        </h2>
        <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Let our team craft your perfect executive retreat. Luxury wellness, strategic GCC insights,
          and unforgettable experiences — all in one transformative journey.
        </p>
        <Link
          to="/plan-my-retreat"
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all hover:bg-brand-hover hover:scale-105 shadow-lg"
        >
          Plan My Retreat
        </Link>
      </div>
    </section>
  )
}
