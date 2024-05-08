import { Roles } from './Roles'

export interface User {
    id: number
    login: string
    firstName: string
    lastName: string
    email: string
    password: string
    roles: Roles[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
