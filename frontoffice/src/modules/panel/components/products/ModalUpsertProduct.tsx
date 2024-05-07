import { Category } from '@/common/types/Category'
import { Product } from '@/common/types/Product'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Input,
    List,
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

const ModalUpsertProduct = ({
    open,
    handleClose,
    data,
    onProductChange,
}: {
    open: boolean
    handleClose: () => void
    data: Product | null
    onProductChange: (product: Product) => void
}) => {
    const [categories, setCategories] = React.useState<Category[]>([])

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
            })
    }, [])

    const handleCreate = () => {
        const category = document.getElementById('select') as HTMLSelectElement
        const name = document.getElementById('name') as HTMLInputElement
        const description = document.getElementById('description') as HTMLInputElement
        const photo = document.getElementById('photo') as HTMLInputElement
        const price = document.getElementById('price') as HTMLInputElement
        const discount = document.getElementById('discount') as HTMLInputElement
        const active = document.getElementById('active') as HTMLInputElement
        const stock = document.getElementById('stock') as HTMLInputElement

        fetch(`${process.env.API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                category: category.value,
                name: name.value,
                description: description.value,
                photo: photo.value,
                price: price.value,
                discount: discount.value,
                active: active.checked,
                stock: stock.value,
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
                onProductChange(data)
            })
    }

    const handleEdit = () => {}

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {data ? 'Edit Product' : 'Create Product'}
                </Typography>
                <FormGroup style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        id="select"
                        select
                        label="Category"
                        defaultValue="default"
                        value={data?.category.id}
                    >
                        <MenuItem value="default">
                            <em>None</em>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="name"
                        style={{ width: '100%', margin: '5px' }}
                        type="text"
                        label="Name"
                        variant="outlined"
                        value={data?.name}
                        required
                    />
                    <TextField
                        id="description"
                        style={{ width: '100%', margin: '5px' }}
                        type="text"
                        label="Description"
                        variant="outlined"
                        value={data?.description}
                    />
                    <TextField
                        id="photo"
                        style={{ width: '100%', margin: '5px' }}
                        type="text"
                        label="Photo"
                        variant="outlined"
                        value={data?.photo}
                    />
                    <TextField
                        id="price"
                        style={{ width: '100%', margin: '5px' }}
                        type="number"
                        label="Price"
                        variant="outlined"
                        value={data?.price}
                        required
                    />
                    <TextField
                        id="discount"
                        style={{ width: '100%', margin: '5px' }}
                        type="number"
                        label="Discount"
                        variant="outlined"
                        value={data?.discount}
                    />
                    <TextField
                        id="active"
                        style={{ width: '100%', margin: '5px', height: '40px' }}
                        type="checkbox"
                        label="Active"
                        variant="outlined"
                        value={data?.active}
                        required
                    />
                    <TextField
                        id="stock"
                        style={{ width: '100%', margin: '5px' }}
                        type="number"
                        label="Stock"
                        variant="outlined"
                        value={data?.stock}
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

export default ModalUpsertProduct
