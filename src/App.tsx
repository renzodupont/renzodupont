import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResumeSenior from './pages/ResumeSenior'
import ResumeLeader from './pages/ResumeLeader'
import ResumeSalesforce from './pages/ResumeSalesforce'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AppRoutes() {
  useSmoothScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resume" element={<ResumeSenior />} />
      <Route path="/resume-leader" element={<ResumeLeader />} />
      <Route path="/resume-salesforce" element={<ResumeSalesforce />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
