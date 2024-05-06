import { createContext, useContext } from 'react'
import { OrderProduct } from '@/common/types/OrderProduct'

export interface CartContent {
    cart: OrderProduct[]
    setCart: (c: OrderProduct) => void
}
export const MyGlobalCartContext = createContext<CartContent>({
    cart: [],
    setCart: () => {},
})

export const useGlobalCartContext = () => useContext(MyGlobalCartContext)
