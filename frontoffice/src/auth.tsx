import { jwtDecode } from 'jwt-decode'

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
        const { exp } = jwtDecode(token)
        if (!exp) return false
        if (Date.now() >= exp * 1000) {
            localStorage.removeItem('token')
            return false
        }
        return true
    } catch (error) {
        console.error('Token decoding error:', error)
        return false
    }
}
