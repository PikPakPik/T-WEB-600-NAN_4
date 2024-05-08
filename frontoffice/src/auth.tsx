import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Roles } from './common/types/Roles'
import { User } from './common/types/User'
import Loader from './modules/loader/Loader'

type Props = {
    children: ReactNode
}

type IAuthContext = {
    isAuthenticated: boolean
    isAdmin?: boolean
    user: User | null
    setUser: (user: User | null) => void
    setAuthenticated: (value: boolean, token?: string | null) => void // Modify the setAuthenticated function to accept a token
    handleLogin: (newToken: string) => void // Function to handle login
    handleLogout: () => void // Function to handle logout
}

const initialValue: IAuthContext = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    setUser: () => null, // Default function, will be overridden
    setAuthenticated: () => {}, // Default function, will be overridden
    handleLogin: () => {}, // Default function, will be overridden
    handleLogout: () => {}, // Default function, will be overridden
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
    
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser] = useState<User | null>(initialValue.user)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const initAuth = async () => {
            // Utilisation de la constante pour le TOKEN_KEY et la méthode getItem pour récupérer le token
            const storedToken = window.localStorage.getItem('token')
            if (storedToken) {
                try {
                    // Utilisation de la constante pour API_URL et la méthode fetch pour récupérer les données
                    const response = await fetch(`${process.env.API_URL}/users`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    })

                    if (response.ok) {
                        const data = await response.json()
                        setAuthenticated(true)
                        const user: User = {
                            ...data,
                            roles: data.roles.map(
                                (role: string) => Roles[role as keyof typeof Roles]
                            ),
                        }
                        setUser(user)
                        setIsAdmin(
                            user.roles.includes(Roles.ROLE_ADMIN) ||
                                user.roles.includes(Roles.ROLE_SUPER_ADMIN)
                        )
                    } else {
                        console.error(`Server responded with status: ${response.status}`)
                        if (response.status === 401) {
                            window.localStorage.removeItem('token')
                            window.location.href = '/login'
                        }
                    }
                } catch (err) {
                    window.localStorage.removeItem('token')
                    window.location.href = '/login'
                    console.error(err)
                }
            }
            setLoading(false)
        }

        initAuth()
    }, [])

    const handleLogout = () => {
        setAuthenticated(false)
        setUser(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleLogin = (newToken: string) => {
        setAuthenticated(true)
        localStorage.setItem('token', newToken)
        navigate('/dashboard') // Redirect to dashboard or any other route after login
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isAdmin,
                user,
                setUser,
                setAuthenticated,
                handleLogin,
                handleLogout,
            }}
        >
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
