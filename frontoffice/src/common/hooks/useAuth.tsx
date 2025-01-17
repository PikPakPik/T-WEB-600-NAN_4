import { AuthContext } from '@/auth'
import { useContext } from 'react'

export const useAuth = () => useContext(AuthContext)
