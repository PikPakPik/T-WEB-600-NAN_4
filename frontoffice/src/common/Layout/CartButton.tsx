import { IconButton, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface CartButtonProps {
    itemCount: number
}

const CartButton = ({ itemCount }: CartButtonProps) => {
    return (
        <IconButton sx={{ marginRight: '1rem' }}>
            <Badge badgeContent={itemCount.toString()} color="error">
                <ShoppingCartIcon sx={{ color: 'white' }} />
            </Badge>
        </IconButton>
    )
}

export default CartButton
