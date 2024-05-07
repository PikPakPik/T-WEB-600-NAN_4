import { createContext, useContext } from 'react'

interface product {
    id: number
    name: string
    description: string
    photo: string
    active: boolean
    stock: number
}

interface CartProducts {
    product: product
    quantity: number
    buyPrice: number
}

export interface CartContent {
    cart: CartProducts[]
    setCart: (cart: CartProducts[]) => void
}

export const MyGlobalCartContext = createContext<CartContent>({} as CartContent)

export const useGlobalCartContext = () => useContext(MyGlobalCartContext)
