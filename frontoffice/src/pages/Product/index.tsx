import { Product } from '@/common/types/Product'
import { Box, Button, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ShieldIcon from '@mui/icons-material/Shield'
import { useAuth } from '@/common/hooks/useAuth'
import Swal from 'sweetalert2'

const ProductPage = () => {
    const { user } = useAuth()

    const location = useLocation()

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
    const addTocartBtn = async () => {
        try {
            if (user) {
                Swal.fire({
                    title: 'Processing',
                    html: 'Please wait...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading()
                    },
                })
                const response = await fetch(`${process.env.API_URL}/carts/${currentProduct.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        quantity: quantity,
                    }),
                })
                if (response.ok) {
                    Swal.close()
                    Swal.fire({
                        title: 'Done!',
                        text: currentProduct.name + ' is now in your cart.',
                        icon: 'success',
                        confirmButtonText: 'Okay!',
                    }).then(() => {
                        window.location.href = '/'
                    })
                } else {
                    Swal.close()
                    Swal.fire({
                        title: 'Error!',
                        text:
                            'An error occured while adding ' +
                            currentProduct.name +
                            ' to your cart.',
                        icon: 'error',
                        confirmButtonText: 'Okay!',
                    })
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'You need to be logged in to add products to your cart.',
                    icon: 'error',
                    confirmButtonText: 'Okay!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'
                    }
                })
            }
        } catch (error) {}
    }

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
                        src="https://img.freepik.com/free-photo/black-white-bokeh-particles_1017-3297.jpg?t=st=1715470361~exp=1715473961~hmac=f829f449bdc23e6c3f3c473823b52f3afc8fda5f3fdea30f3c4bd6288098c2a0&w=1380"
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
            <Box sx={{ p: 2, mt: 2 }}></Box>
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
                <Box sx={{ flex: { xs: '100%', md: '70%' } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 2,
                        }}
                    >
                        <img
                            src={currentProduct.photo}
                            alt="Main"
                            style={{
                                maxWidth: '100%',
                                minHeight: '50vh',
                                height: 'auto',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                                borderRadius: '1rem',
                            }}
                        />
                    </Box>
                </Box>
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
                        onClick={() => addTocartBtn()}
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
                <Typography
                    variant="body1"
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '1.5rem',
                    }}
                >
                    {currentProduct.description}
                </Typography>
            </Box>
        </>
    )
}

export default ProductPage
