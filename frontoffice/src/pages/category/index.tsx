import { Box, Slider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '@/common/types/Category'
import { Product } from '@/common/types/Product'

const CategoryPage = (props: Category) => {
    const [products, setProducts] = useState<Product[]>([])
    const { id } = useParams()
    const [priceRange, setPriceRange] = useState<number[]>([0, 37])
    const [isPoductsLoading, setIsPoductsLoading] = useState<boolean>(false)

    const handleChange = (event: Event, newPriceRange: number | number[]) => {
        setPriceRange(newPriceRange as number[])
    }
    const priceRangetext = (value: number)=>{
        return `${value}€`
    }
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/categories/${id}/products`)
            const data = await response.json()
            if (response.ok) {
                setProducts(data)
            } else {
                console.error(data.message)
            }
        } catch (error) {}
    }
    useEffect(() => {
        fetchProducts()
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
                    src={
                        'https://t3.ftcdn.net/jpg/04/21/88/02/240_F_421880296_IeHkMQblZwDGwPuWG2GuxWW4DAuAZA9h.jpg'
                    } // change this from
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
                        {props.name}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ padding: '1rem' }}>
                <Typography variant="body1">Bread crumbs → Bread crumbs</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { sx: 'column', md: 'row' } }}>
                <Box
                    sx={{
                        width: { sx: '100%', md: '25%' },
                        borderRight: { sx: 'none', md: '1px solid gray' },
                        borderBottom: { sx: '1px solid gray', md: 'none' },
                    }}
                >
                    <Typography variant="h4" sx={{ padding: '1rem' }}>
                        Filters:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1rem',
                        }}
                    >
                        <Typography variant="h5">Price</Typography>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={priceRange}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={priceRangetext}
                        />
                        <Typography variant="h5">Brand</Typography>
                        <Typography variant="h5">Discount</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: '1rem',
                            padding: '1rem',
                        }}
                    >
                        {products.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    cursor: 'pointer',
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '1rem',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover',
                                    position: 'relative',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(0.98)', // Zoom effect on hover
                                        transition: 'all 0.2s ease-in-out',
                                    },
                                    '&:hover h4': {
                                        transform: 'translate(50%, -50%) scale(1.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        top: '50%',
                                        right: '50%',
                                    },
                                    '&:hover img': {
                                        filter: 'blur(4px) opacity(0.7)',
                                    },
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '1rem',
                                        aspectRatio: '1/1',
                                        objectFit: 'cover',
                                        position: 'relative',
                                        transition: 'transform 0.2s ease-in-out',
                                    }}
                                />
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: 'white',
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        transition: 'all 0.2s ease-in-out',
                                        fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.8rem' },
                                    }}
                                >
                                    {product.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CategoryPage
