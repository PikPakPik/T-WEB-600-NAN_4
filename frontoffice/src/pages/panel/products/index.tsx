import { Product } from '@/common/types/Product'
import DataTable from '@/modules/panel/components/DataTable'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
const ProductsPanel = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.API_URL}/products`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setProducts(data)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <Box component="main">
                {loading ? (
                    <Box>Loading...</Box>
                ) : (
                    <DataTable data={products.items} name={'Products'} />
                )}
            </Box>
        </>
    )
}

export default ProductsPanel
