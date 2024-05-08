import { Category } from '@/common/types/Category'
import { Box, Button, FormGroup, Modal, TextField, Typography } from '@mui/material'

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

const ModalUpsertCategory = ({
    open,
    handleClose,
    data,
    onCategoryChange,
}: {
    open: boolean
    handleClose: () => void
    data: Category | null
    onCategoryChange: (product: Category) => void
}) => {
    const handleCreate = () => {
        const name = document.getElementById('name') as HTMLInputElement
        const active = document.getElementById('active') as HTMLInputElement

        fetch(`${process.env.API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: name.value,
                active: active.checked,
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
                onCategoryChange(data)
            })
    }

    const handleEdit = () => {
        const name = document.getElementById('name') as HTMLInputElement
        const active = document.getElementById('active') as HTMLInputElement

        fetch(`${process.env.API_URL}/categories/${data?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: name.value,
                active: active.checked,
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
                onCategoryChange(data)
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
                    {data ? 'Edit Category' : 'Create Category'}
                </Typography>
                <FormGroup style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        id="name"
                        style={{ width: '100%', margin: '5px' }}
                        type="text"
                        label="Name"
                        variant="outlined"
                        defaultValue={data?.name}
                        required
                    />
                    <TextField
                        id="active"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        type="checkbox"
                        label="Active"
                        variant="outlined"
                        defaultValue={data?.active}
                        required
                    />
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

export default ModalUpsertCategory
