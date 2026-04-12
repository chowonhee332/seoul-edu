import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import HomeLoggedInPage from './pages/HomeLoggedInPage'
import LoginPage from './pages/LoginPage'
import StatusPage from './pages/StatusPage'
import AsReceptionPage from './pages/AsReceptionPage'
import AsHistoryPage from './pages/AsHistoryPage'
import VideoGuidePage from './pages/VideoGuidePage'

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-loggedin" element={<HomeLoggedInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/as-reception" element={<AsReceptionPage />} />
        <Route path="/as-history" element={<AsHistoryPage />} />
        <Route path="/video-guide" element={<VideoGuidePage />} />
      </Routes>
    </AnimatePresence>
  )
}
