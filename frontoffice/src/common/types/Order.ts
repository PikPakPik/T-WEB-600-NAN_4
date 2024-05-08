import { User } from '@/common/types/User'
import { OrderProduct } from '@/common/types/OrderProduct'

export interface Order {
    id: number
    owner: User
    status: string
    totalPrice: number
    products: OrderProduct[]
    createdAt: string
    updatedAt: string
    deletedAt: string
}
