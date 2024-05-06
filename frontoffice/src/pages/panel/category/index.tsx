import { Category } from '@/common/types/Category'
import DataTable from '@/modules/panel/components/DataTable'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
const CategoriesPanel = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.API_URL}/categories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setCategories(data.items)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <Box component="main">
                {loading ? (
                    <Box>Loading...</Box>
                ) : (
                    <DataTable data={categories} name={'Categories'} />
                )}
            </Box>
        </>
    )
}

export default CategoriesPanel
