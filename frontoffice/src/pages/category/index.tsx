import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import categories from '@/common/fakeData/categories.json'
import { Category } from '@/common/types/Category'

const CategoryPage = () => {
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
    const { id } = useParams()
    useEffect(() => {
        const foundCategory = id && categories.find((category) => category.id === Number(id))
        if (foundCategory) {
            setCurrentCategory(foundCategory)
        }
    }, [id])
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '50vh',
                }}
            >
                <img
                    alt="header_com"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    src={currentCategory ? currentCategory.image : ''}
                />

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'center',
                        paddingTop: '20vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '4rem' },
                            color: '#136207 ',
                            fontWeight: '700',
                        }}
                    >
                        {currentCategory && currentCategory.name}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default CategoryPage
