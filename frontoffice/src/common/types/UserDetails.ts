import { User } from '@/common/types/User'

export interface UserDetails {
    id: number
    user: User
    login: string
    address: string
    state: string
    city: string
    zip: string
    country: string
    phone: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
