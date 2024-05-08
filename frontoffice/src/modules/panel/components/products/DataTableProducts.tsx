import { Category } from '@/common/types/Category'
import { Product } from '@/common/types/Product'
import { Box, Button, Skeleton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import ModalUpsertProduct from './ModalUpsertProduct'
import { Circle } from '@mui/icons-material'

function createData(
    id: number,
    name: string,
    price: number,
    description: string,
    photo: string,
    category: Category,
    stock: number,
    active: boolean,
    discount?: number,
    createdAt?: string,
    updatedAt?: string
) {
    const category_name = category.name
    if (!discount) discount = 0
    const discount_price = price - (price * discount) / 100
    return {
        id,
        name,
        description,
        photo,
        price,
        discount,
        discount_price,
        active,
        stock,
        category_name,
        createdAt,
        updatedAt,
    }
}

export default function TableProducts() {
    const [products, setProducts] = React.useState<Product[]>([])
    const [loading, setLoading] = React.useState(true)
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)

    React.useEffect(() => {
        fetch(`${process.env.API_URL}/products`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setProducts(data.items)
                setLoading(false)
            })
    }, [])

    const handleProductChange = (product: Product) => {
        setProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id)
            if (existingProduct) {
                // Si le produit existe déjà, remplacez-le par le nouveau produit
                return prevProducts.map((p) => (p.id === product.id ? product : p))
            } else {
                // Si le produit n'existe pas, ajoutez-le à la liste des produits
                return [...prevProducts, product]
            }
        })
    }

    return (
        <>
            <ModalUpsertProduct
                open={openModal}
                handleClose={() => setOpenModal(false)}
                data={selectedProduct}
                onProductChange={handleProductChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button
                    sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        ':hover': { backgroundColor: 'darkgreen' },
                    }}
                    onClick={() => {
                        setSelectedProduct(null)
                        setOpenModal(true)
                    }}
                >
                    Add Product
                </Button>
            </Box>
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
                                    {Object.keys(products[0]).map((key) => (
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
                            products.map((product) => {
                                const row = createData(
                                    product.id,
                                    product.name,
                                    product.price,
                                    product.description,
                                    product.photo,
                                    product.category,
                                    product.stock,
                                    product.active,
                                    product.discount,
                                    product.createdAt,
                                    product.updatedAt
                                )
                                return (
                                    <TableRow key={row.id}>
                                        {Object.values(row).map((value, index) =>
                                            value === true || value === false ? (
                                                <TableCell key={index}>
                                                    {value ? (
                                                        <Circle color="success" />
                                                    ) : (
                                                        <Circle color="error" />
                                                    )}
                                                </TableCell>
                                            ) : (
                                                <TableCell key={index}>{value}</TableCell>
                                            )
                                        )}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                                <Button
                                                    sx={{
                                                        backgroundColor: 'green',
                                                        color: 'white',
                                                        ':hover': { backgroundColor: 'darkgreen' },
                                                    }}
                                                    onClick={() => {
                                                        setSelectedProduct(product)
                                                        setOpenModal(true)
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    sx={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        ':hover': { backgroundColor: 'darkred' },
                                                    }}
                                                    onClick={() => {
                                                        fetch(
                                                            `${process.env.API_URL}/products/${row.id}`,
                                                            {
                                                                method: 'DELETE',
                                                            }
                                                        ).then((response) => {
                                                            if (response.status !== 204) {
                                                                throw new Error(
                                                                    'Network response was not ok'
                                                                )
                                                            }
                                                            setProducts(
                                                                products.filter(
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
