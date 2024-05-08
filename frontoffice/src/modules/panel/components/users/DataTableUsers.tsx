import { User } from '@/common/types/User'
import { Box, Button, Skeleton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import ModalUpsertUser from './ModalUpsertUsers'
import { Roles } from '@/common/types/Roles'

function createData(
    id: number,
    login: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[]
) {
    return { id, login, firstName, lastName, email, roles }
}

export default function TableUsers() {
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState(true)
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

    React.useEffect(() => {
        fetch(`${process.env.API_URL}/users/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setUsers(data.items)
                setLoading(false)
            })
    }, [])

    const handleUserChange = (user: User) => {
        setUsers((prevUser) => {
            const existingProduct = prevUser?.find((p) => p.id === user.id)
            if (existingProduct) {
                // Si le produit existe déjà, remplacez-le par le nouveau produit
                return prevUser.map((p) => (p.id === user.id ? user : p))
            } else {
                // Si le produit n'existe pas, ajoutez-le à la liste des produits
                return [...prevUser, user]
            }
        })
    }

    return (
        <>
            <ModalUpsertUser
                open={openModal}
                handleClose={() => setOpenModal(false)}
                data={selectedUser}
                onUserChange={handleUserChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button
                    sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        ':hover': { backgroundColor: 'darkgreen' },
                    }}
                    onClick={() => {
                        setSelectedUser(null)
                        setOpenModal(true)
                    }}
                >
                    Add User
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
                                    {Object.keys(users[0]).map((key) => (
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
                            users.map((user) => {
                                const row = createData(
                                    user.id,
                                    user.login,
                                    user.firstName,
                                    user.lastName,
                                    user.email,
                                    user.roles
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
                                                        backgroundColor: 'green',
                                                        color: 'white',
                                                        ':hover': { backgroundColor: 'darkgreen' },
                                                    }}
                                                    onClick={() => {
                                                        setSelectedUser(user)
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
                                                            setUsers(
                                                                users.filter((p) => p.id !== row.id)
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
