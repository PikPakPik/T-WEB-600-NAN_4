import { useContext, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material'
import { MyGlobalCartContext, useGlobalCartContext } from '@/common/context/CartContext'

interface CartComponentProps {
    isOpen: boolean
    handleClose: () => void
}

const Cart = ({ isOpen, handleClose }: CartComponentProps) => {
    const { cart, setCart } = useContext(MyGlobalCartContext)

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

    const renderCartItems = () => {
        if (cart.length === 0) {
            return <Typography variant="body1">Your cart is empty</Typography>
        } else {
            return (
                <>
                    {cart.map((item) => (
                        <Box key={item.product.id}>
                            <Typography>{item.product.name}</Typography>
                            <Typography>Price: ${item.buyPrice * item.quantity}</Typography>
                            <Typography>Quantity: {item.quantity}</Typography>
                            <hr />
                        </Box>
                    ))}
                    <Typography>Total Items: {cart.length}</Typography>
                </>
            )
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogContent dividers>{renderCartItems()}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Cart
