import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Clock,
  Calendar,
  Users,
  Star,
  ChevronDown,
  Sparkles,
  Utensils,
  Plane,
  Building,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
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

  // Other packages/resorts from same destination for "You Might Also Like" (max 3 total)
  const relatedItems = [
    ...resorts.filter((r) => r.id !== tripId).map((r) => ({ ...r, _type: 'resort' })),
    ...destPackages.filter((p) => p.id !== tripId).map((p) => ({ ...p, _type: 'package' })),
  ].slice(0, 3)

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
      {/* Hero — bottom-aligned */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            alt={title}
            className="object-cover object-center absolute h-full w-full inset-0"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/30 to-black/30" />
        </div>

        <div className="relative w-full z-10 p-4 sm:p-6 md:p-8 pb-6 md:pb-10">
          <div className="container-wide">
            <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/50 tracking-wider uppercase mb-3 md:mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span className="text-white/20">/</span>
              <Link to={`/destinations/${id}`} className="hover:text-white transition-colors">{dest.name}</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/70 truncate max-w-[120px] sm:max-w-none">{title}</span>
            </nav>

            <p className="text-accent font-semibold mb-1.5 md:mb-2 text-xs sm:text-sm" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              {subtitle}
            </p>

            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-3 md:mb-4 max-w-4xl leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {location}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" fill="currentColor" />
                5.0 rating
              </span>
            </div>
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
              <div className="bg-surface rounded-2xl p-5 sm:p-6 md:p-8 border border-white/5 mb-6 md:mb-8">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-3 md:mb-4">About This Trip</h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 md:mb-6">
                  {description}
                </p>

                {/* Retreat Vibes */}
                <div className="mb-5 md:mb-6">
                  <h3 className="font-heading font-semibold text-white mb-2 md:mb-3 text-sm sm:text-base">Retreat Vibes</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {retreatVibes.map((v) => (
                      <span key={v.label} className="inline-flex items-center gap-1.5 rounded-full font-medium text-xs sm:text-sm px-3 py-1 bg-accent/10 border border-accent/20 text-accent">
                        <span className="text-xs">{v.icon}</span>{v.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perfect For */}
                <div className="mb-5 md:mb-6">
                  <h3 className="font-heading font-semibold text-white mb-2 md:mb-3 text-sm sm:text-base">Perfect For</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {perfectFor.map((p) => (
                      <span key={p} className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-white/5 text-white/70 px-3 py-1 rounded-full border border-white/10">
                        <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-heading font-semibold text-white mb-2 md:mb-3 text-sm sm:text-base">Highlights</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-surface-light text-white/60 px-3 py-1 rounded-full border border-white/5">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent" fill="currentColor" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="mb-6 md:mb-8">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-4 md:mb-6">Day by Day Itinerary</h2>
                <div className="space-y-3">
                  {itinerary.map((day, i) => (
                    <div key={i} className="bg-surface rounded-xl border border-white/5 overflow-hidden">
                      <button
                        onClick={() => setOpenDay(openDay === i ? -1 : i)}
                        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="shrink-0 w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-accent/10 border border-accent/20 flex flex-col items-center justify-center">
                          <span className="text-accent text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider leading-tight text-center">
                            {day.day}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-1">
                            {day.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-white/40 text-xs sm:text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />{day.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Utensils className="h-3 w-3" />{day.meals}
                            </span>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 shrink-0 text-white/30 transition-transform duration-200 mt-1 ${openDay === i ? 'rotate-180 text-accent' : ''}`} />
                      </button>

                      {openDay === i && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 animate-accordion">
                          <div className="ml-[4.25rem] sm:ml-[5rem] border-l border-accent/10 pl-4 sm:pl-5">
                            <p className="text-white/50 text-sm leading-relaxed mb-5">{day.description}</p>

                            {/* Activities */}
                            {day.activities?.length > 0 && (
                              <div className="mb-5">
                                <h4 className="font-semibold text-white text-xs sm:text-sm mb-3 flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-accent" />Activities
                                </h4>
                                <div className="space-y-2">
                                  {day.activities.map((activity, idx) => (
                                    <div key={idx} className="animate-activity flex items-center gap-3 bg-white/[0.03] rounded-lg px-3.5 py-2.5 border border-white/5" style={{ animationDelay: `${idx * 80}ms` }}>
                                      <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
                                        {idx + 1}
                                      </span>
                                      <span className="text-white/60 text-sm">{activity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Highlights */}
                            <div>
                              <h4 className="font-semibold text-white text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <Sparkles className="h-3.5 w-3.5 text-accent" />Highlights
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {day.highlights.map((h) => (
                                  <span key={h} className="text-[11px] sm:text-xs bg-white/5 text-white/50 px-2.5 py-1 rounded-full border border-white/5">
                                    {h}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* The Journey — unified card */}
              <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden mb-6 md:mb-8">
                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-2">The Journey Awaits</p>
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-5">
                    {resort
                      ? `Imagine ${resort.location}: Where Strategy Meets Serenity`
                      : `Discover ${dest.name}: Where Leaders Find Clarity`
                    }
                  </h2>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
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
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                      {resort
                        ? `Your days will flow between focused leadership workshops and experiences you simply can't have anywhere else. Imagine morning strategy sessions overlooking ${resort.location.includes('Sea') || resort.location.includes('Beach') || resort.location.includes('Coast') ? 'the ocean' : 'breathtaking mountain landscapes'}, followed by afternoons spent exploring the local culture, indulging in world-class spa treatments, or embarking on adventures that push your team beyond their comfort zone.`
                        : `Each day in ${dest.name} brings something new. Whether you're exploring ${dest.cities?.split(',')[0]?.trim()}'s vibrant culture, diving deep into technology ecosystem briefings, or unwinding at a luxury resort, you'll find that every experience is woven together with intention — designed to spark new thinking and build stronger bonds within your team.`
                      }
                    </p>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                      {resort
                        ? `The evenings are where the magic happens. Intimate dinners under the stars, deep conversations with industry leaders, and the kind of unstructured moments that often lead to the biggest breakthroughs. At ${resort.name}, we've seen teams arrive as colleagues and leave as a genuinely aligned leadership unit.`
                        : `But it's the unexpected moments that stay with you longest — a sunrise that shifts your perspective, a conversation with a local entrepreneur that sparks a new idea, or a quiet evening where your team finally has the space to think big without the noise of daily operations.`
                      }
                    </p>
                  </div>

                  {/* Pull quote */}
                  <div className="relative rounded-xl bg-accent/5 border border-accent/15 px-5 sm:px-6 py-4 sm:py-5">
                    <span className="text-accent text-4xl font-heading leading-none absolute -top-4 left-4">"</span>
                    <blockquote className="text-white/70 text-sm sm:text-base leading-relaxed italic pt-3">
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
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-accent" />Gallery
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
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <div className="bg-linear-to-r from-accent to-accent-light p-5 sm:p-6 text-charcoal">
                    <p className="text-charcoal/60 text-sm mb-1">Starting from</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl sm:text-4xl font-bold">
                        {price || 'Custom'}
                      </span>
                      {price && <span className="text-charcoal/60 text-sm font-semibold">/ {priceNote}</span>}
                    </div>
                  </div>
                  <div className="bg-surface p-5 sm:p-6 space-y-3">
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
                <div className="bg-surface rounded-2xl p-5 sm:p-6 border border-white/5">
                  <h3 className="font-heading text-lg font-semibold text-white mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Location</p>
                        <p className="text-white/70 text-sm font-semibold">{location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Duration</p>
                        <p className="text-white/70 text-sm font-semibold">{duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Group Size</p>
                        <p className="text-white/70 text-sm font-semibold">4–20 executives</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Building className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Accommodation</p>
                        <p className="text-white/70 text-sm font-semibold">5-Star Luxury Resort</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Plane className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Includes</p>
                        <p className="text-white/70 text-sm font-semibold">Transfers, Meals & Activities</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-surface rounded-2xl p-5 sm:p-6 border border-white/5">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-white/50 text-sm leading-relaxed mb-4 italic">
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
                    className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* You Might Also Like */}
      {relatedItems.length > 0 && (
        <section className="section-padding bg-surface border-t border-white/5">
          <div className="container-wide">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Explore More</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                You Might Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {relatedItems.map((item) => (
                <Link to={`/destinations/${id}/${item.id}`} key={item.id} className="group">
                  <article className="bg-charcoal rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img alt={item.name || item.title} loading="lazy" className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-105" src={item.image} />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                      {item._type === 'resort' && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold bg-accent/20 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full border border-accent/20">
                            {item.type}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5 text-white/70">
                        {item._type === 'resort'
                          ? <><MapPin className="h-3 w-3" /><span className="text-[11px] font-semibold">{item.location}</span></>
                          : <><Clock className="h-3 w-3" /><span className="text-[11px] font-semibold">{item.duration}</span></>
                        }
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-accent transition-colors line-clamp-1">
                        {item.name || item.title}
                      </h3>
                      <p className="text-[11px] text-white/30 mb-auto">{item.tagline || item.cities}</p>
                      <div className="flex items-end justify-between pt-4 mt-4 border-t border-white/5">
                        {item._type === 'package' ? (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider">{item.priceNote}</p>
                            <p className="font-heading text-xl font-semibold text-accent">{item.price}</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-white/40 text-xs">
                            <MapPin className="h-3 w-3" />{item.location}
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-white/30 font-semibold text-[11px] tracking-wider uppercase group-hover:text-accent group-hover:gap-2.5 transition-all">
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <ArrowRight className="h-4 w-4" />
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
          {/* Close */}
          <button
            onClick={() => setLightbox(-1)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length) }}
            className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length) }}
            className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

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
