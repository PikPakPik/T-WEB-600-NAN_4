import { Roles } from '@/common/types/Roles'
import { User } from '@/common/types/User'
import {
    Box,
    Button,
    FormGroup,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const ModalUpsertUser = ({
    open,
    handleClose,
    data,
    onUserChange,
}: {
    open: boolean
    handleClose: () => void
    data: User | null
    onUserChange: (product: User) => void
}) => {
    const [selectedRoles, setSelectedRoles] = React.useState<Roles[]>(data?.roles || [])

    const handleCreate = () => {
        const login = document.getElementById('login') as HTMLInputElement
        const firstName = document.getElementById('firstName') as HTMLInputElement
        const lastName = document.getElementById('lastName') as HTMLInputElement
        const email = document.getElementById('email') as HTMLInputElement
        const roles = document.getElementById('roles') as HTMLInputElement

        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                login: login.value,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                roles: roles.value,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                handleClose()
                onUserChange(data)
            })
    }

    const handleEdit = () => {
        const login = document.getElementById('login') as HTMLInputElement
        const firstName = document.getElementById('firstName') as HTMLInputElement
        const lastName = document.getElementById('lastName') as HTMLInputElement
        const email = document.getElementById('email') as HTMLInputElement

        fetch(`${process.env.API_URL}/users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                login: login.value,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                handleClose()
                onUserChange(data)
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {data ? 'Edit User' : 'Create User'}
                </Typography>
                <FormGroup style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        id="login"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        label="Login"
                        variant="outlined"
                        defaultValue={data?.login}
                        required
                    />
                    <TextField
                        id="firstName"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        label="First Name"
                        variant="outlined"
                        defaultValue={data?.firstName}
                        required
                    />
                    <TextField
                        id="lastName"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        label="Last Name"
                        variant="outlined"
                        defaultValue={data?.lastName}
                        required
                    />
                    <TextField
                        id="email"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        label="Email"
                        variant="outlined"
                        defaultValue={data?.email}
                        required
                    />
                    <Select
                        labelId="roles-label"
                        id="roles"
                        multiple
                        displayEmpty
                        disabled
                        value={selectedRoles}
                        onChange={(e) => setSelectedRoles(e.target.value as Roles[])}
                    >
                        {Object.values(Roles).map((role) =>
                            role === Roles.ROLE_SUPER_ADMIN ? null : (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            )
                        )}
                    </Select>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={data ? handleEdit : handleCreate}
                    >
                        {data ? 'Edit' : 'Create'}
                    </Button>
                </FormGroup>
            </Box>
        </Modal>
    )
}

export default ModalUpsertUser
