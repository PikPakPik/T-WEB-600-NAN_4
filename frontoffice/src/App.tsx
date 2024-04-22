// import { isAuthenticated } from "@/auth";
import Homepage from '@/pages/home/index'
import AboutPage from '@/pages/about'
import TopBar from '@/common/Layout/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from '@/common/Layout/Footer'

// function ProtectedRoute({ children }: any) {
// 	return isAuthenticated() ? children : <Navigate to='/sign-in' replace />;
// }

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
