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
import { useGlobalCartContext } from '@/common/context/CartContext'

interface CartComponentProps {
    isOpen: boolean
    handleClose: () => void
}

const Cart = ({ isOpen, handleClose }: CartComponentProps) => {
    const { cart, setCart } = useGlobalCartContext()

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3001/cart')
            const data = await response.json()
            setCart(data)
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
                        <Box key={item.id}>
                            <Typography>{item.product.name}</Typography>
                            <Typography>Price: ${item.product.price * item.quantity}</Typography>
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
