import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import WizardLayout from './layouts/WizardLayout'
import HomePage from './pages/HomePage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import RetreatStylesPage from './pages/RetreatStylesPage'
import TripDetailPage from './pages/TripDetailPage'
import PlanRetreatPage from './pages/PlanRetreatPage'
import InsightDetailPage from './pages/InsightDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="/destinations/:id/:tripId" element={<TripDetailPage />} />
        <Route path="/retreat-styles" element={<RetreatStylesPage />} />
        <Route path="/insights/:id" element={<InsightDetailPage />} />
      </Route>
      <Route element={<WizardLayout />}>
        <Route path="/plan-my-retreat" element={<PlanRetreatPage />} />
      </Route>
    </Routes>
  )
}
