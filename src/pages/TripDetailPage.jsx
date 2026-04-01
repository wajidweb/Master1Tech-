import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { retreatPackages } from '../data/retreatPackages'

export default function TripDetailPage() {
  const { id, tripId } = useParams()
  const dest = destinations.find((d) => d.id === id)
  const [openDay, setOpenDay] = useState(0)
  const [lightbox, setLightbox] = useState(-1)

  useEffect(() => {
    if (lightbox >= 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const galleryLen = dest?.gallery?.length || 0

  const handleKey = useCallback((e) => {
    if (lightbox < 0 || galleryLen === 0) return
    if (e.key === 'Escape') setLightbox(-1)
    if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % galleryLen)
    if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + galleryLen) % galleryLen)
  }, [lightbox, galleryLen])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!dest) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-white mb-4">Not Found</h1>
          <Link to="/destinations" className="text-accent hover:underline">Back to Destinations</Link>
        </div>
      </div>
    )
  }

  const resorts = dest.resorts || []
  const resort = resorts.find((r) => r.id === tripId)
  const pkg = retreatPackages.find((p) => p.id === tripId)
  const destPackages = retreatPackages.filter((p) => p.destination === dest.name)

  // Determine what we're showing
  const title = resort?.name || pkg?.title || 'Retreat Details'
  const subtitle = resort?.tagline || pkg?.cities || dest.tagline
  const description = resort?.description || pkg?.description || dest.description
  const heroImage = resort?.image || pkg?.image || dest.heroImage
  const location = resort?.location || pkg?.cities || dest.cities
  const duration = pkg?.duration || destPackages[0]?.duration || '5–6 Days'
  const price = pkg?.price || (destPackages.length > 0 ? destPackages[0].price : null)
  const priceNote = pkg?.priceNote || 'per person'
  const type = resort?.type || pkg?.style?.replace(/-/g, ' ')?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Executive Retreat'
  const highlights = resort?.highlights || ['Luxury Retreats', 'GCC Advisory', 'Tech Park Tours', 'Wellness Programs']

  // Gallery images from destination data
  // Use resort/package specific gallery, fallback to destination gallery
  const galleryImages = resort?.gallery || pkg?.gallery || dest.gallery || []

  const youMightAlsoLikeCards = [
    {
      id: 'facilities',
      eyebrow: 'Facilities',
      title: 'Facilities Built for Executive Retreats',
      images: ['/khoj/Beach-hero.jpg', '/khoj/Khoj 9.jpg', '/khoj/Khoj4.jpeg'],
      to: '/insights/facilities',
    },
    {
      id: 'why-pakistan',
      eyebrow: 'Why Pakistan',
      title: 'Why Pakistan Should Be Your Next Destination',
      images: [
        '/IT/devsinc.jpg',
        '/IT/it.jpg',
        '/IT/nicislamabad.jpg',
        '/IT/NICL%20Investor%20Banner_1.jpg',
        '/IT/nicpeshawar.png',
      ],
      to: '/insights/why-pakistan',
    },
    {
      id: 'talent',
      eyebrow: 'Talent Discovery',
      title: 'Our Goal: Global Leaders Discover Talent in Pakistan',
      images: [
        '/talent/hiring.jpg',
        '/talent/meeting.jpg',
        '/talent/meeting2.jpg',
        '/IT/it.jpg',
        '/IT/nicislamabad.jpg',
      ],
      to: '/insights/talent',
    },
  ]

  if (!resort && !pkg) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-white mb-4">Trip Not Found</h1>
          <Link to={`/destinations/${id}`} className="text-accent hover:underline">Back to {dest.name}</Link>
        </div>
      </div>
    )
  }

  const retreatVibes = [
    { label: 'Executive Wellness', icon: '✦' },
    { label: 'Leadership Growth', icon: '◆' },
    { label: 'Cultural Immersion', icon: '❖' },
  ]

  const perfectFor = ['C-Suite Leaders', 'Executive Teams', 'Strategic Offsites']

  const itinerary = resort
    ? [
        {
          day: 'Day 1',
          title: `Arrival at ${resort.name}`,
          location: resort.location,
          description: `Welcome to ${resort.name}. Check into your luxury suite, enjoy a welcome reception, and settle into the resort. Evening briefing and gourmet dinner.`,
          highlights: ['Welcome reception', 'Resort orientation', 'Opening dinner'],
          activities: [
            'Airport pickup & private transfer to resort',
            'Check-in & welcome drink at the lounge',
            'Evening welcome reception with team',
            'Gourmet opening dinner',
          ],
          meals: 'Dinner',
        },
        {
          day: 'Day 2–3',
          title: 'Executive Retreat Sessions',
          location: resort.location,
          description: `Focused leadership workshops and wellness activities at ${resort.name}. Combine strategic planning with spa treatments and cultural excursions.`,
          highlights: resort.highlights.slice(0, 3),
          activities: [
            'Morning mindfulness & yoga session',
            'Leadership strategy workshop',
            'Spa & wellness treatments',
            'Cultural excursion to local heritage site',
          ],
          meals: 'Breakfast, Lunch & Dinner',
        },
        {
          day: 'Day 4–5',
          title: 'GCC Discovery & Adventure',
          location: resort.location,
          description: `Explore the region's tech ecosystem with guided visits, meet local talent, and enjoy adventure activities unique to ${dest.name}.`,
          highlights: resort.highlights.slice(1, 4),
          activities: [
            'Guided tech park & innovation hub visit',
            'Briefing on local talent ecosystem',
            'Networking lunch with local leaders',
            'Adventure activity (hiking, water sports, or safari)',
          ],
          meals: 'Breakfast, Lunch & Dinner',
        },
        {
          day: 'Day 6',
          title: 'Farewell & Departure',
          location: resort.location,
          description: 'Final morning wellness session, closing ceremony, and GCC feasibility report handover. Transfers to the airport.',
          highlights: ['Closing ceremony', 'GCC report delivery', 'Airport transfer'],
          activities: [
            'Sunrise wellness session',
            'Closing ceremony & keynote recap',
            'GCC feasibility report handover',
            'Farewell brunch & airport transfer',
          ],
          meals: 'Breakfast',
        },
      ]
    : [
        {
          day: 'Day 1',
          title: `Arrival in ${dest.name}`,
          location: location?.split('•')[0]?.split(',')[0]?.trim() || dest.name,
          description: `Welcome to ${dest.name}. Check into your luxury resort, attend the welcome reception, and receive your retreat briefing.`,
          highlights: ['Welcome reception', 'Resort orientation', 'Opening dinner'],
          activities: [
            'Airport pickup & luxury transfer',
            'Resort check-in & welcome refreshments',
            'Welcome reception & team introductions',
            'Gourmet opening dinner',
          ],
          meals: 'Dinner',
        },
        {
          day: 'Day 2–3',
          title: 'Executive Retreat & Wellness',
          location: location?.split('•')[1]?.split(',')[1]?.trim() || dest.name,
          description: `Immerse yourself in focused leadership sessions, wellness activities, and cultural experiences unique to ${dest.name}.`,
          highlights: ['Leadership workshops', 'Spa & wellness', 'Cultural experiences'],
          activities: [
            'Morning yoga & meditation session',
            'Leadership development workshop',
            'Guided cultural heritage tour',
            'Spa & wellness treatments',
          ],
          meals: 'Breakfast, Lunch & Dinner',
        },
        {
          day: 'Day 4–5',
          title: 'GCC Discovery & Adventure',
          location: location?.split('•')[2]?.split(',')[2]?.trim() || dest.name,
          description: `Visit technology parks, meet local talent, and explore the region's business potential with guided tours and briefings.`,
          highlights: ['Tech park tour', 'Talent briefing', 'Adventure activity'],
          activities: [
            'Technology park & innovation hub visit',
            'Local talent ecosystem briefing',
            'Networking lunch with industry leaders',
            'Outdoor adventure excursion',
          ],
          meals: 'Breakfast, Lunch & Dinner',
        },
        {
          day: `Day ${duration?.match(/\d+/)?.[0] || 6}`,
          title: 'Farewell & Departure',
          location: location?.split('•')[0]?.split(',')[0]?.trim() || dest.name,
          description: 'Final morning session, closing ceremony, GCC feasibility report handover, and transfers to the airport.',
          highlights: ['Closing ceremony', 'GCC report delivery', 'Airport transfer'],
          activities: [
            'Morning wellness session',
            'Closing ceremony & insights recap',
            'GCC feasibility report delivery',
            'Farewell brunch & airport transfer',
          ],
          meals: 'Breakfast',
        },
      ]

  return (
    <>
      {/* Hero — simple, cinematic overlay */}
      <section className={`relative overflow-hidden flex items-end ${
        resort?.id === 'khoj-allana' || resort?.id === 'khoj-shigar' ? 'min-h-svh' : 'min-h-[55vh] md:min-h-[65vh]'
      }`}>
        <div className="absolute inset-0">
          {resort?.id === 'khoj-allana' ? (
            <video
              className="object-cover object-center absolute h-full w-full inset-0"
              src="/videos/khoj-allana-vlog.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroImage}
            />
          ) : resort?.id === 'khoj-shigar' ? (
            <video
              className="object-cover object-center absolute h-full w-full inset-0"
              src="/videos/khoj-shigar-vlog.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroImage}
            />
          ) : (
            <img
              alt={title}
              className="object-cover object-center absolute h-full w-full inset-0"
              src={heroImage}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>

        <div className="relative w-full z-10 p-4 sm:p-6 md:p-8 pb-6 md:pb-10">
          <div className="container-wide max-w-5xl">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main content — two-column layout */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

            {/* Left column */}
            <div className="lg:col-span-7 xl:col-span-8">

              {/* About This Trip */}
              <div className="rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-6 md:mb-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-3 md:mb-4">About This Trip</h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-5 md:mb-6">
                  {description}
                </p>
              </div>

              {/* Day-by-Day Itinerary + mood gallery strip */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4 md:mb-6">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-1">Day by Day Itinerary</h2>
                    <p className="text-white/45 text-xs sm:text-sm max-w-md">
                      Follow the flow from arrival to departure, with a visual sense of each moment.
                    </p>
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="hidden md:flex items-center gap-2 text-[11px] text-white/40">
                      <span className="uppercase tracking-[0.2em]">Trip Highlights</span>
                    </div>
                  )}
                </div>

                {/* small horizontal gallery moved into each day below */}
                <div className="space-y-3">
                  {itinerary.map((day, i) => (
                    <div
                      key={i}
                      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 will-change-transform ${
                        openDay === i
                          ? 'border-accent/35 bg-white/[0.06] shadow-[0_26px_110px_rgba(0,0,0,0.75)]'
                          : 'border-white/10 bg-white/[0.03] shadow-[0_18px_70px_rgba(0,0,0,0.55)] hover:border-accent/30 hover:bg-white/[0.05]'
                      }`}
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <button
                        onClick={() => setOpenDay(openDay === i ? -1 : i)}
                        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-500 group-hover:translate-y-[-1px]"
                      >
                        <div className="shrink-0 w-14 sm:w-16 h-14 sm:h-16 rounded-2xl border border-white/15 bg-linear-to-br from-white/10 via-white/[0.03] to-black/20 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center relative overflow-hidden">
                          <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-accent/20 blur-2xl" />
                          <span className="relative text-accent text-[10px] sm:text-[11px] font-medium uppercase tracking-wider leading-tight text-center">
                            {day.day}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base sm:text-lg font-medium text-white mb-1">
                            {day.title}
                          </h3>
                          <p className="text-white/50 text-xs sm:text-sm">
                            {day.location} &middot; {day.meals}
                          </p>
                        </div>
                        <span
                          className={`ml-2 text-xs font-medium tracking-wide transition-all duration-300 mt-1 ${
                            openDay === i ? 'text-accent' : 'text-white/45 group-hover:text-white/70'
                          }`}
                        >
                          {openDay === i ? 'Hide' : 'View'}
                        </span>
                      </button>

                      {openDay === i && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 animate-accordion">
                          <div className="ml-[4.25rem] sm:ml-[5rem] border-l border-accent/15 pl-4 sm:pl-5 relative">
                            <div className="absolute -left-[1px] top-0 bottom-0 w-px bg-linear-to-b from-accent/40 via-accent/15 to-transparent" />
                            <p className="text-white/60 text-sm leading-relaxed mb-5">{day.description}</p>

                            {/* Inline gallery for this day */}
                            {galleryImages.length > 0 && (
                              <div className="mb-5">
                                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                  {galleryImages
                                    .slice(i * 2, i * 2 + 2)
                                    .map((img, idx) => {
                                      const globalIndex = i * 2 + idx
                                      return (
                                        <button
                                          type="button"
                                          key={globalIndex}
                                          onClick={() => setLightbox(globalIndex)}
                                          className="relative w-36 sm:w-44 h-24 sm:h-28 rounded-2xl overflow-hidden border border-white/12 hover:border-accent/45 transition-all duration-500 flex-shrink-0 shadow-[0_14px_55px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_75px_rgba(0,0,0,0.8)] hover:-translate-y-0.5"
                                        >
                                          <img
                                            alt={img.label}
                                            loading="lazy"
                                            className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 hover:scale-110"
                                            src={img.src}
                                          />
                                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
                                          <div className="absolute bottom-1.5 left-2 right-2">
                                            <p className="text-[10px] text-white/80 font-medium truncate">
                                              {img.label}
                                            </p>
                                          </div>
                                        </button>
                                      )
                                    })}
                                </div>
                              </div>
                            )}

                            {/* Activities */}
                            {day.activities?.length > 0 && (
                              <div className="mb-5">
                                <h4 className="font-medium text-white text-xs sm:text-sm mb-3">
                                  Activities
                                </h4>
                                <div className="space-y-2">
                                  {day.activities.map((activity, idx) => (
                                    <div key={idx} className="animate-activity flex items-center gap-3 bg-white/[0.03] rounded-lg px-3.5 py-2.5 border border-white/5" style={{ animationDelay: `${idx * 80}ms` }}>
                                      <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-medium">
                                        {idx + 1}
                                      </span>
                                      <span className="text-white/60 text-sm">{activity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* The Journey — unified card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden mb-6 md:mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.65)]">
                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">The Journey Awaits</p>
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-5">
                    {resort
                      ? `Imagine ${resort.location}: Where Strategy Meets Serenity`
                      : `Discover ${dest.name}: Where Leaders Find Clarity`
                    }
                  </h2>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {resort
                      ? `From the moment you arrive at ${resort.name}, every detail is designed to immerse you in a world where luxury meets purpose. Nestled in ${resort.location}, this isn't just a getaway — it's a transformative experience that blends executive-level strategy sessions with the kind of deep relaxation that only comes from truly extraordinary surroundings.`
                      : `${dest.name} offers a rare blend of natural beauty, cultural richness, and strategic opportunity. From the moment you step off the plane, you'll be immersed in an experience crafted specifically for leaders who want more than just a retreat — they want clarity, connection, and a roadmap for growth.`
                    }
                  </p>
                </div>

                {/* Inline image */}
                {galleryImages[1] && (
                  <div className="relative aspect-[21/9] mx-5 sm:mx-6 md:mx-8 rounded-xl overflow-hidden">
                    <img
                      alt={galleryImages[1].label}
                      loading="lazy"
                      className="object-cover absolute h-full w-full inset-0"
                      src={galleryImages[1].src}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <p className="text-white/70 text-xs sm:text-sm font-semibold">{galleryImages[1].label}</p>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 md:p-8 space-y-5">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-3">
                      {resort ? 'Beyond the Boardroom' : 'A Journey of Discovery'}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                      {resort
                        ? `Your days will flow between focused leadership workshops and experiences you simply can't have anywhere else. Imagine morning strategy sessions overlooking ${resort.location.includes('Sea') || resort.location.includes('Beach') || resort.location.includes('Coast') ? 'the ocean' : 'breathtaking mountain landscapes'}, followed by afternoons spent exploring the local culture, indulging in world-class spa treatments, or embarking on adventures that push your team beyond their comfort zone.`
                        : `Each day in ${dest.name} brings something new. Whether you're exploring ${dest.cities?.split(',')[0]?.trim()}'s vibrant culture, diving deep into technology ecosystem briefings, or unwinding at a luxury resort, you'll find that every experience is woven together with intention — designed to spark new thinking and build stronger bonds within your team.`
                      }
                    </p>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {resort
                        ? `The evenings are where the magic happens. Intimate dinners under the stars, deep conversations with industry leaders, and the kind of unstructured moments that often lead to the biggest breakthroughs. At ${resort.name}, we've seen teams arrive as colleagues and leave as a genuinely aligned leadership unit.`
                        : `But it's the unexpected moments that stay with you longest — a sunrise that shifts your perspective, a conversation with a local entrepreneur that sparks a new idea, or a quiet evening where your team finally has the space to think big without the noise of daily operations.`
                      }
                    </p>
                  </div>

                  {/* Pull quote */}
                  <div className="relative rounded-xl bg-accent/5 border border-accent/15 px-5 sm:px-6 py-4 sm:py-5">
                    <span className="text-accent text-4xl font-heading leading-none absolute -top-4 left-4">"</span>
                    <blockquote className="text-white/80 text-sm sm:text-base leading-relaxed italic pt-3">
                      {resort
                        ? `${resort.name} isn't just a place to stay — it's where you reconnect with what matters. The combination of ${resort.type.toLowerCase()} surroundings and thoughtfully designed retreat sessions creates an environment where real transformation happens.`
                        : `${dest.name} surprised us at every turn. The retreat wasn't just productive — it was genuinely life-changing. We came for the strategy sessions and left with a completely new perspective on leadership and growth.`
                      }
                    </blockquote>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-3">
                      The GCC Advantage
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                      {resort
                        ? `Every retreat at ${resort.name} includes a dedicated GCC discovery component. On your final days, you'll visit local technology parks, meet emerging talent, and receive a comprehensive feasibility report — turning your retreat into a strategic asset. You'll return home not just refreshed, but equipped with actionable insights on building your global capability centre in ${dest.name}.`
                        : `What sets our ${dest.name} retreats apart is the seamless integration of GCC advisory into every experience. While you're recharging, you're also exploring one of the world's most promising talent markets. Tech park visits, government incentive briefings, and talent ecosystem tours are woven into your itinerary — so you return home with both renewed energy and a concrete roadmap for global expansion.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-4 md:mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 h-[280px] sm:h-[340px] md:h-[400px]">
                    <div onClick={() => setLightbox(0)} className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer">
                      <img alt={galleryImages[0]?.label} loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110" src={galleryImages[0]?.src} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs sm:text-sm font-semibold truncate">{galleryImages[0]?.label}</p>
                      </div>
                      <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
                    </div>
                    {galleryImages.slice(1, 3).map((img, i) => (
                      <div key={i} onClick={() => setLightbox(i + 1)} className="relative rounded-xl overflow-hidden group cursor-pointer">
                        <img alt={img.label} loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110" src={img.src} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-[10px] sm:text-xs font-semibold truncate">{img.label}</p>
                        </div>
                        <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                  {galleryImages.length > 3 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3 h-[90px] sm:h-[110px] md:h-[130px]">
                      {galleryImages.slice(3, 6).map((img, i) => (
                        <div key={i} onClick={() => setLightbox(i + 3)} className="relative rounded-xl overflow-hidden group cursor-pointer">
                          <img alt={img.label} loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-110" src={img.src} />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-[10px] sm:text-xs font-semibold truncate">{img.label}</p>
                          </div>
                          <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right column — sticky sidebar */}
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-5">

                {/* Pricing Card */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.7)]">
                  <div className="bg-linear-to-r from-accent to-accent-light p-5 sm:p-6 text-charcoal">
                    <p className="text-charcoal/60 text-sm mb-1">Starting from</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl sm:text-4xl font-bold">
                        {price || 'Custom'}
                      </span>
                      {price && <span className="text-charcoal/60 text-sm font-semibold">/ {priceNote}</span>}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-3">
                    <Link
                      to="/plan-my-retreat"
                      className="flex items-center justify-center gap-2 w-full rounded-full bg-accent text-charcoal hover:bg-accent-light h-12 sm:h-14 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all duration-300"
                    >
                      Enquire Now
                    </Link>
                    <Link
                      to="/plan-my-retreat"
                      className="flex items-center justify-center gap-2 w-full rounded-full border-2 border-white/10 text-white/70 hover:border-white/30 hover:text-white h-12 sm:h-14 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all duration-300"
                    >
                      Customize This Retreat
                    </Link>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <h3 className="font-heading text-lg font-semibold text-white mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Location</p>
                        <p className="text-white/70 text-sm font-semibold">{location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Duration</p>
                        <p className="text-white/70 text-sm font-semibold">{duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Group Size</p>
                        <p className="text-white/70 text-sm font-semibold">4–20 executives</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Accommodation</p>
                        <p className="text-white/70 text-sm font-semibold">5-Star Luxury Resort</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Includes</p>
                        <p className="text-white/70 text-sm font-semibold">Transfers, Meals & Activities</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <blockquote className="text-white/60 text-sm leading-relaxed mb-4 italic">
                    "An extraordinary blend of luxury, strategy, and cultural discovery. Our team returned transformed and with a clear roadmap for growth."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                      C
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-semibold">Corporate Client</p>
                      <p className="text-white/30 text-xs">Executive Retreat</p>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-accent/10 rounded-2xl p-5 sm:p-6 border border-accent/20 text-center">
                  <p className="text-white/70 text-sm mb-3 font-semibold">
                    Our retreat advisors are here to help you plan the perfect experience.
                  </p>
                  <Link
                    to="/plan-my-retreat"
                    className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Get in Touch →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* You Might Also Like */}
      <section className="section-padding bg-surface border-t border-white/5">
          <div className="container-wide">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Explore More</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                You Might Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {youMightAlsoLikeCards.map((c) => (
                <Link to={c.to} key={c.id} className="group">
                  <article className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] hover:border-accent/40 transition-all duration-300 h-full flex flex-col shadow-[0_16px_70px_rgba(0,0,0,0.65)]">
                    <div className="relative aspect-video overflow-hidden">
                      <img alt={c.title} loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-700 group-hover:scale-105" src={c.images[0]} />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold bg-accent/15 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full border border-accent/20">
                          {c.eyebrow}
                        </span>
                      </div>

                      <div className={`absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 ${c.images.length > 3 ? 'justify-start' : ''}`}>
                        {c.images.map((src) => (
                          <div
                            key={src}
                            className={`relative rounded-lg overflow-hidden border border-white/10 bg-black/20 shrink-0 ${
                              c.images.length > 3 ? 'w-11 h-8 sm:w-12 sm:h-9' : 'w-14 h-10'
                            }`}
                          >
                            <img alt="" className="object-cover absolute h-full w-full inset-0" src={src} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                        {c.title}
                      </h3>
                      <div className="mt-auto" />

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                        <span className="inline-flex items-center text-white/40 font-semibold text-[11px] tracking-wider uppercase group-hover:text-accent transition-colors">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-surface border-t border-white/5">
        <div className="container-wide text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
            Ready to Book This Retreat?
          </h2>
          <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto font-semibold">
            Our advisors will tailor every detail to your team's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/plan-my-retreat"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-charcoal hover:bg-accent-light px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
            >
              Start Planning
            </Link>
            <Link
              to={`/destinations/${id}`}
              className="inline-flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 px-8 py-3.5 text-[13px] tracking-widest uppercase font-semibold transition-all duration-300"
            >
              Back to {dest.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox >= 0 && galleryImages[lightbox] && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(-1)}
        >
          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full mx-4 sm:mx-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].label}
              className="w-full h-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 text-center py-3 sm:py-4">
              <p className="text-white font-semibold text-sm sm:text-base mb-1">{galleryImages[lightbox].label}</p>
              <p className="text-white/40 text-xs">{lightbox + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
