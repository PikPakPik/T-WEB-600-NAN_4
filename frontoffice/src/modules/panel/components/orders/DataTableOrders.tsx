import { Order } from '@/common/types/Order'
import { Box, Button, Skeleton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

function createData(
    id: number,
    totalPrice: number,
    status: string,
    products: string,
    owner: string,
    createdAt: string,
    updatedAt: string
) {
    return { id, totalPrice, status, products, owner, createdAt, updatedAt }
}

export default function TableOrders() {
    const [orders, setOrders] = React.useState<Order[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch(`${process.env.API_URL}/orders/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setOrders(data.items)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {loading ? (
                                <>
                                    <TableRowsLoader rowsNum={1} columnsNum={20} />
                                </>
                            ) : (
                                <>
                                    {Object.keys(orders[0]).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRowsLoader rowsNum={10} columnsNum={20} />
                        ) : (
                            orders.map((order) => {
                                const row = createData(
                                    order.id,
                                    order.totalPrice,
                                    order.products
                                        .map((product) => product.product.name)
                                        .join(', '),
                                    order.status,
                                    `${order.owner.firstName} ${order.owner.lastName}`,
                                    order.createdAt,
                                    order.updatedAt
                                )
                                return (
                                    <TableRow key={row.id}>
                                        {Object.values(row).map((value, index) => (
                                            <TableCell key={index}>{value}</TableCell>
                                        ))}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                                <Button
                                                    sx={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        ':hover': { backgroundColor: 'darkred' },
                                                    }}
                                                    onClick={() => {
                                                        fetch(
                                                            `${process.env.API_URL}/orders/${row.id}`,
                                                            {
                                                                method: 'DELETE',
                                                            }
                                                        ).then((response) => {
                                                            if (response.status !== 204) {
                                                                throw new Error(
                                                                    'Network response was not ok'
                                                                )
                                                            }
                                                            setOrders(
                                                                orders.filter(
                                                                    (p) => p.id !== row.id
                                                                )
                                                            )
                                                        })
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const TableRowsLoader = ({ rowsNum, columnsNum }: { rowsNum: number; columnsNum: number }) => {
    return [...Array(rowsNum)].map((index) => (
        <TableRow key={index}>
            {[...Array(columnsNum)].map((index) => (
                <TableCell key={index}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            ))}
        </TableRow>
    ))
}
