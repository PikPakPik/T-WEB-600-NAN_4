import Footer from '@/common/Layout/Footer'
import TopBar from '@/common/Layout/TopBar'
import AboutPage from '@/pages/about'
import CategoryPage from '@/pages/category'
import Homepage from '@/pages/home/index'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ProductPage from '@/pages/Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from '@/common/Layout/Footer'
import { Box } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth'
import ResponsiveDrawer from './common/Layout/panel/Layout'
import { useAuth } from './common/hooks/useAuth'
import HomePanel from './pages/panel'
import ProductsTable from './pages/panel/products'
import CategoriesPanel from './pages/panel/category'
import UsersPanel from './pages/panel/users'

function ProtectedRoute({ children }: any) {
    const auth = useAuth()
    return auth.isAuthenticated && auth.isAdmin ? children : <Navigate to="/login" replace />
}

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
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <TopBar />
                                    <Homepage />
                                    <Footer />
                                </>
                            }
                        />
                        <Route
                            path="/about"
                            element={
                                <>
                                    <TopBar />
                                    <AboutPage />
                                    <Footer />
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    <TopBar />
                                    <LoginPage />
                                    <Footer />
                                </>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <>
                                    <TopBar />
                                    <RegisterPage />
                                    <Footer />
                                </>
                            }
                        />
                        <Route path="/category">
                            <Route
                                path=""
                                element={
                                    <>
                                        <TopBar />
                                        <CategoryPage />
                                        <Footer />
                                    </>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <>
                                        <TopBar />
                                        <CategoryPage />
                                        <Footer />
                                    </>
                                }
                            />
                        </Route>
                        <Route
                            path="*"
                            element={
                                <>
                                    <TopBar />
                                    <Homepage />
                                    <Footer />
                                </>
                            }
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <ResponsiveDrawer />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="/admin">
                                <Route path="" element={<HomePanel />} />
                                <Route path="products" element={<ProductsTable />} />
                                <Route path="categories" element={<CategoriesPanel />} />
                                <Route path="users" element={<UsersPanel />} />
                                <Route path="*" element={<HomePanel />} />
                            </Route>
                        </Route>
                        <Route path="/product">
                            <Route path="" element={<ProductPage />} />
                            <Route path=":id" element={<ProductPage />} />
                        </Route>
                        <Route path="*" element={<Homepage />} />
                    </Routes>
                </AuthProvider>
            </Box>
        </BrowserRouter>
    )
}

export default App
