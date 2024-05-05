import { Product } from '@/common/types/Product'
import { Box, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MultiImageCatalog from '@/modules/product/categories/MultiImageCatalog'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Remove'

const ProductPage = () => {
    const location = useLocation()
    const [ProductImages, setProductImages] = useState([
        'https://t3.ftcdn.net/jpg/04/21/88/02/240_F_421880296_IeHkMQblZwDGwPuWG2GuxWW4DAuAZA9h.jpg',
        'https://t3.ftcdn.net/jpg/00/81/24/72/240_F_81247213_OYvGTCn5mnQQ2c0gWJ1U5ixcbmNBaMOp.jpg',
    ])
    const { productfromState } = location.state || {}
    const [currentProduct, setCurrentProduct] = useState<Product>(productfromState)
    const { id } = useParams()
    const [isPoductLoading, setIsPoductLoading] = useState<boolean>(false)
    const [quantity, setQuantity] = useState(1)

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
        setQuantity(quantity + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1)
            setQuantity(quantity - 1)
        }
    }
    const fetchProduct = async () => {
        try {
            setIsPoductLoading(true)
            const response = await fetch(`${process.env.API_URL}/products/${id}`)
            const data = await response.json()
            if (response.ok) {
                setIsPoductLoading(false)
                setCurrentProduct(data)
            } else {
                console.error(data.message)
            }
        } catch (error) {}
    }
    useEffect(() => {
        if (!productfromState || !currentProduct) {
            fetchProduct()
        }
    }, [])

    return (
        <>
            {isPoductLoading ? (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '50vh',
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{ background: 'lightgray' }}
                    />
                </Box>
            ) : (
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
                        src={currentProduct.photo}
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
                            {currentProduct.name}
                        </Typography>
                    </Box>
                </Box>
            )}
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ color: '#136207', fontWeight: '700' }}>
                    Description
                </Typography>
                <Typography variant="body1" sx={{ color: '#136207' }}>
                    {currentProduct.description}
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <MultiImageCatalog images={ProductImages} /> {/* currentProduct.images */}
                <Box>
                    <Typography variant="h4" sx={{ color: '#136207', fontWeight: '700' }}>
                        Price: {currentProduct.price}€
                    </Typography>
                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Quantity:
                        </Typography>
                        <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                            <IconButton onClick={handleDecrement} size="small">
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1">{quantity}</Typography>
                            <IconButton onClick={handleIncrement} size="small">
                                <AddIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ProductPage
