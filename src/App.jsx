import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import WizardLayout from './layouts/WizardLayout'
import HomePage from './pages/HomePage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import RetreatStylesPage from './pages/RetreatStylesPage'
import PlanRetreatPage from './pages/PlanRetreatPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="/retreat-styles" element={<RetreatStylesPage />} />
      </Route>
      <Route element={<WizardLayout />}>
        <Route path="/plan-my-retreat" element={<PlanRetreatPage />} />
      </Route>
    </Routes>
  )
}
