import Hero from '../components/Hero'
import RetreatStyles from '../components/RetreatStyles'
import DestinationsCarousel from '../components/DestinationsCarousel'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

export default function HomePage() {
  return (
    <>
      <Hero />
      <RetreatStyles />
      <DestinationsCarousel />
      <Testimonials />
      <CallToAction />
    </>
  )
}
