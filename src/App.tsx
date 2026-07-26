import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Resume from './pages/Resume'
import ResumeEngineer from './pages/ResumeEngineer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AppRoutes() {
  useSmoothScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resume" element={<Resume />} />
      {/* Software-engineering variant of the same history — see ResumeShared */}
      <Route path="/resume-engineer" element={<ResumeEngineer />} />
      {/* Legacy per-audience resume variants — consolidated into a single /resume */}
      <Route path="/resume-leader" element={<Navigate to="/resume" replace />} />
      <Route path="/resume-salesforce" element={<Navigate to="/resume" replace />} />
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
