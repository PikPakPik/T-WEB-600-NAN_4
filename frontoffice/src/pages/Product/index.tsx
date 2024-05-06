import { Product } from '@/common/types/Product'
import { Box, Button, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MultiImageCatalog from '@/modules/product/categories/MultiImageCatalog'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ShieldIcon from '@mui/icons-material/Shield'

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
        if (quantity < currentProduct.stock) {
            setQuantity((prevQuantity) => prevQuantity + 1)
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1)
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
            <Box sx={{ p: 2, mt: 2 }}>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '1.5rem',
                    }}
                >
                    {currentProduct.description}
                </Typography>
            </Box>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: '3rem',
                    width: { sm: '100%', md: '70%' },
                    margin: 'auto',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: '700',
                        color: 'green',
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {currentProduct.name}
                </Typography>
                <MultiImageCatalog images={ProductImages} /> {/* currentProduct.images */}
                <Box
                    sx={{
                        flex: { xs: '100%', sm: '70%' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: '700',
                            color: 'green',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        {currentProduct.name}
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: '700' }}>
                        Product Details:
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'start', md: 'center' },
                            gap: '2rem',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: '700', fontSize: '1rem' }}>
                            Quantity:
                        </Typography>
                        <Paper
                            elevation={2}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                justifyContent: 'space-between',
                                width: '12rem',
                            }}
                        >
                            <IconButton onClick={handleDecrement} size="small">
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1">{quantity}</Typography>
                            <IconButton onClick={handleIncrement} size="small">
                                <AddIcon />
                            </IconButton>
                        </Paper>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'start', md: 'center' },
                            gap: '2rem',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ color: '#136207', fontWeight: '700', fontSize: '1.5rem' }}
                        >
                            Price: {(currentProduct.price * quantity).toFixed(2)}€
                        </Typography>
                        {currentProduct.stock === 0 ? (
                            <Typography
                                variant="body1"
                                sx={{ color: 'red', fontWeight: '700', fontSize: '1rem' }}
                            >
                                Out of stock
                            </Typography>
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: '700', fontSize: '1rem' }}
                            >
                                Stock : {currentProduct.stock}
                            </Typography>
                        )}
                    </Box>
                    <Button
                        endIcon={<AddShoppingCartIcon />}
                        variant="contained"
                        sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
                        style={{
                            backgroundColor: '#136207',
                            fontWeight: '700',
                            color: 'white',
                            width: 'fit-content',
                            alignSelf: 'center',
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <LocalShippingIcon sx={{ fontSize: '5rem' }} />
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                Free Shipping
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                flexDirection: 'column',

                                alignItems: 'center',
                            }}
                        >
                            <CurrencyExchangeIcon sx={{ fontSize: '5rem' }} />
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                30 days return
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                alignItems: 'center',
                            }}
                        >
                            <ShieldIcon sx={{ fontSize: '5rem' }} />
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                Secure payment
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ background: 'gray', p: 2, m: 1, borderRadius: '1rem', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: '700' }}>
                    Product Specifications:
                </Typography>
            </Box>
        </>
    )
}

export default ProductPage
