import TableOrders from '@/modules/panel/components/orders/DataTableOrders'
import { Box } from '@mui/material'
const OrdersPanel = () => {
    return (
        <>
            <Box component="main">
                <TableOrders />
            </Box>
        </>
    )
}

export default OrdersPanel
