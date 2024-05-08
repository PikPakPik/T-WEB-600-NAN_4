import { Category } from '@/common/types/Category'
import { Circle } from '@mui/icons-material'
import { Box, Button, Skeleton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import ModalUpsertCategory from './ModalUpsertCategory'

function createData(
    id: number,
    name: string,
    active: boolean,
    createdAt?: string,
    updatedAt?: string
) {
    return { id, name, active, createdAt, updatedAt }
}

export default function TableCategories() {
    const [categories, setCategories] = React.useState<Category[]>([])
    const [loading, setLoading] = React.useState(true)
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)

    React.useEffect(() => {
        fetch(`${process.env.API_URL}/categories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setCategories(data.items)
                setLoading(false)
            })
    }, [])

    const handleCategoryChange = (category: Category) => {
        setCategories((prevCategory) => {
            const existingProduct = prevCategory?.find((p) => p.id === category.id)
            if (existingProduct) {
                // Si le produit existe déjà, remplacez-le par le nouveau produit
                return prevCategory.map((p) => (p.id === category.id ? category : p))
            } else {
                // Si le produit n'existe pas, ajoutez-le à la liste des produits
                return [...prevCategory, category]
            }
        })
    }

    return (
        <>
            <ModalUpsertCategory
                open={openModal}
                handleClose={() => setOpenModal(false)}
                data={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button
                    sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        ':hover': { backgroundColor: 'darkgreen' },
                    }}
                    onClick={() => {
                        setSelectedCategory(null)
                        setOpenModal(true)
                    }}
                >
                    Add Category
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
                                    {Object.keys(categories[0]).map((key) => (
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
                            categories.map((category) => {
                                const row = createData(
                                    category.id,
                                    category.name,
                                    category.active,
                                    category.createdAt,
                                    category.updatedAt
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
                                                        setSelectedCategory(category)
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
                                                            `${process.env.API_URL}/categories/${row.id}`,
                                                            {
                                                                method: 'DELETE',
                                                            }
                                                        ).then((response) => {
                                                            if (response.status !== 204) {
                                                                throw new Error(
                                                                    'Network response was not ok'
                                                                )
                                                            }
                                                            setCategories(
                                                                categories.filter(
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
