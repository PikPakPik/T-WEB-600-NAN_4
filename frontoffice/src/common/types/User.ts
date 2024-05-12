import { Roles } from './Roles'
import { UserDetails } from './UserDetails'

export interface User {
    id: number
    login: string
    firstName: string
    lastName: string
    email: string
    password: string
    roles: Roles[]
    details: UserDetails[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
