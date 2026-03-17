import { Outlet } from 'react-router-dom'
import ContactButton from '../components/ContactButton'

export default function WizardLayout() {
  return (
    <>
      <Outlet />
      <ContactButton />
    </>
  )
}
