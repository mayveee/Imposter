import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Upload from './pages/Upload'
import Calendar from './pages/Calendar'
import TopNav from './components/TopNav'
import CalendarTest from "./pages/CalendarTest";
import { OverlayProvider } from 'overlay-kit'

export default function App() {
  return (
    <>
      <OverlayProvider>
        <TopNav/>
        <div
          style={{
            marginTop: "50px",     
            height: "calc(100vh - 50px)", 
            overflowY: "auto",            
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendarTest" element={<CalendarTest />} />
          </Routes>
        </div>
      </OverlayProvider>
    </>
    
  )
}