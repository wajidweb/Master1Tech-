import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import ContactButton from '../components/ContactButton'

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <ContactButton />
    </>
  )
}
