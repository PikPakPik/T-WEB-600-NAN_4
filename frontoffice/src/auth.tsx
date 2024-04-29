import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}

type IAuthContext = {
    isAuthenticated: boolean
    token: string | null
    setAuthenticated: (value: boolean, token?: string | null) => void // Modify the setAuthenticated function to accept a token
    handleLogin: (newToken: string) => void // Function to handle login
    handleLogout: () => void // Function to handle logout
}

const initialValue: IAuthContext = {
    isAuthenticated: false,
    token: null,
    setAuthenticated: (value: boolean, token?: string | null) => {}, // Default function, will be overridden
    handleLogin: (newToken: string) => {}, // Default function, will be overridden
    handleLogout: () => {}, // Default function, will be overridden
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState<string | null>(null) // Initialize token state
    const navigate = useNavigate()

    const handleLogout = () => {
        setAuthenticated(false)
        setToken(null) // Reset token on logout
        navigate('/login')
    }

    const handleLogin = (newToken: string) => {
        setAuthenticated(true)
        setToken(newToken) // Set the token after successful login
        navigate('/dashboard') // Redirect to dashboard or any other route after login
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, setAuthenticated, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
