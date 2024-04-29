// import { Category } from "@/common/types/Category";

export interface Product {
    id: number
    name: string
    category_id: number
    price: number
    description: string
    image: string
    category: string
    stock: number
    onSale: boolean
    discount?: number
}

// export interface Product {
//     id: number
//     name: string
//     price: number
//     description: string
//     image: string
//     category: Category
//     stock: number
//     onSale: boolean
//     discount: number
//     discountPrice: number
//     active: boolean
//     createdAt: Date
//     updatedAt: Date
//     deletedAt: Date
// }
