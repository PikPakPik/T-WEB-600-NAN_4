import { useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
} from '@mui/material'
import { MyGlobalCartContext } from '@/common/context/CartContext'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'

interface CartComponentProps {
    isOpen: boolean
    handleClose: () => void
}

const Cart = ({ isOpen, handleClose }: CartComponentProps) => {
    const { cart, setCart } = useContext(MyGlobalCartContext)
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setIsOpenCart(isOpen)
    }, [isOpen])

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/carts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data = await response.json()
            if (response.ok) {
                setCart(data.products)
                console.log(data)
                console.log(cart)
                //console.log(cart,data.products)
            } else {
                throw new Error('Failed to fetch cart items')
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCartItems()
    }, [])
    useEffect(() => {
        let price = 0
        cart.forEach((item) => {
            price += item.buyPrice * item.quantity
        })
        setTotalPrice(price)
    }, [cart])

    const handleDecreaseQuantity = async (item) => {
        // Check if the quantity is already 1
        if (item.quantity > 1) {
            const updatedQuantity = item.quantity - 1

            const updatedCart = cart.map((cartItem) =>
                cartItem.product.id === item.product.id
                    ? { ...cartItem, quantity: updatedQuantity }
                    : cartItem
            )
            setCart(updatedCart)
        }
    }

    const handleIncreaseQuantity = async (item) => {
        const updatedQuantity = item.quantity + 1

        const updatedCart = cart.map((cartItem) =>
            cartItem.product.id === item.product.id
                ? { ...cartItem, quantity: updatedQuantity }
                : cartItem
        )
        setCart(updatedCart)
    }

    const handleDeleteItem = async (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem.product.id !== item.product.id)

        const response = await fetch(`${process.env.API_URL}/carts/${item.product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!response.ok) {
            Swal.fire({
                title: 'Failed to delete the item.',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            })
            return
        }

        setCart(updatedCart)
    }
    const updateCartQuantity = async (item, updatedQuantity: number) => {
        const response = await fetch(`${process.env.API_URL}/carts/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
        })
        if (!response.ok) {
            Swal.fire({
                title: 'Failed to update quantity of ' + item.name,
                text: 'Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            })
            return
        }
    }
    const handleValidateCart = async () => {
        try {
            setIsOpenCart(false)
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
            cart.forEach(async (ProductCard) => {
                await updateCartQuantity(ProductCard.product, ProductCard.quantity)
            })
            const response = await fetch(`${process.env.API_URL}/carts/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data = await response.json()

            if (!response.ok) {
                Swal.close()
                Swal.fire({
                    title: 'Failed to create the order',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                }).then((result) => {
                    setIsOpenCart(true)
                    if (result.isConfirmed) {
                    }
                })
                return
            } else if (response.ok && data) {
                const stripRes = await fetch(`${process.env.API_URL}/orders/${data.id}/pay`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                const stripeURL = await stripRes.json()
                if (!stripRes.ok) {
                    Swal.close()
                    Swal.fire({
                        title: 'Failed to create the order',
                        text: 'Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                    }).then((result) => {
                        setIsOpenCart(true)
                        if (result.isConfirmed) {
                        }
                    })
                    return
                }
                Swal.close()
                Swal.fire({
                    title: 'Cart validated',
                    text: 'Order created successfully',
                    icon: 'success',
                    confirmButtonText: 'Pay Order',
                }).then((result) => {
                    setIsOpenCart(true)
                    if (result.isConfirmed) {
                        window.location.href = stripeURL.url
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const renderCartItems = () => {
        if (cart.length === 0) {
            return <Typography variant="body1">Your cart is empty</Typography>
        } else {
            return (
                <Box sx={{}}>
                    {cart.map((item) => (
                        <Box
                            key={item.product.id}
                            sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
                        >
                            <img
                                src={item.product.photo}
                                alt={item.product.name}
                                style={{ width: 100, marginRight: '2rem', borderRadius: 2 }}
                            />
                            <Box>
                                <Typography variant="h6">{item.product.name}</Typography>
                                <Typography>
                                    Price: ${(item.buyPrice * item.quantity).toFixed(2)}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleDecreaseQuantity(item)}
                                    >
                                        -
                                    </Button>
                                    <Typography>{item.quantity}</Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleIncreaseQuantity(item)}
                                    >
                                        +
                                    </Button>
                                    <IconButton onClick={() => handleDeleteItem(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Typography>Total Items: {cart.length}</Typography>
                    <Typography>Total Price: {totalPrice.toFixed(2)}</Typography>
                </Box>
            )
        }
    }

    return (
        <Dialog open={isOpenCart} onClose={handleClose}>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogContent dividers>{renderCartItems()}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleValidateCart}>Validate Cart</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Cart
