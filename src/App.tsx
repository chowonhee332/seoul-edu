import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import GNB from './components/GNB'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import HomeLoggedInPage from './pages/HomeLoggedInPage'
import LoginPage from './pages/LoginPage'
import StatusPage from './pages/StatusPage'
import AsReceptionPage from './pages/AsReceptionPage'
import AsHistoryPage from './pages/AsHistoryPage'
import VideoGuidePage from './pages/VideoGuidePage'
import DownloadCenterPage from './pages/DownloadCenterPage'
import FaqPage from './pages/FaqPage'
import NoticePage from './pages/NoticePage'
import ServiceCenterPage from './pages/ServiceCenterPage'
import ContentDetailPage from './pages/ContentDetailPage'
import WorkHistoryPage from './pages/WorkHistoryPage'


export default function App() {
  const location = useLocation();

  return (
    <>
    <ScrollToTop />
    <GNB variant="light" />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-loggedin" element={<HomeLoggedInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/as-reception" element={<AsReceptionPage />} />
        <Route path="/as-history" element={<AsHistoryPage />} />
        <Route path="/video-guide" element={<VideoGuidePage />} />
        <Route path="/download-center" element={<DownloadCenterPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/service-center" element={<ServiceCenterPage />} />
        <Route path="/content-detail" element={<ContentDetailPage />} />
        <Route path="/work-history" element={<WorkHistoryPage />} />
      </Routes>
    </AnimatePresence>
    </>
  )
}
