// import { isAuthenticated } from "@/auth";
import Homepage from '@/pages/home/index'
import AboutPage from '@/pages/about'
import TopBar from '@/common/Layout/TopBar'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from '@/common/Layout/Footer'
import { Box } from '@mui/material'

// function ProtectedRoute({ children }: any) {
// 	return isAuthenticated() ? children : <Navigate to='/sign-in' replace />;
// }

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100vh',
                    backgroundColor: '#EEF4ED',
                }}
            >
                <TopBar />
                <Box sx={{ flex: '1' }}>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Homepage />} />
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    )
}

export default App
