import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const Statistics = () => {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        totalEarned: 0,
        products: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.API_URL}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        }
        fetchData()
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ border: '2px solid #f88e55', height: '100%', alignContent: 'center' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            placeContent: 'center',
                        }}
                    >
                        <InventoryIcon sx={{ color: '#f88e55' }} />
                        <Typography variant="h5" component="div" sx={{ color: '#f88e55' }}>
                            Products
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'gray', marginLeft: 'auto' }}
                        >
                            {stats.products}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ border: '2px solid #f50057', height: '100%', alignContent: 'center' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            placeContent: 'center',
                        }}
                    >
                        <ShoppingCartIcon sx={{ color: '#f50057' }} />
                        <Typography variant="h5" component="div" sx={{ color: '#f50057' }}>
                            Orders
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'gray', marginLeft: 'auto' }}
                        >
                            {stats.orders}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ border: '2px solid #008000', height: '100%', alignContent: 'center' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            placeContent: 'center',
                        }}
                    >
                        <PeopleIcon sx={{ color: '#008000' }} />
                        <Typography variant="h5" component="div" sx={{ color: '#008000' }}>
                            Users
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'gray', marginLeft: 'auto' }}
                        >
                            {stats.users}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Card sx={{ border: '2px solid #3f51b5', height: '100%', alignContent: 'center' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            placeContent: 'center',
                        }}
                    >
                        <AttachMoneyIcon sx={{ color: '#3f51b5' }} />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ color: '#3f51b5', wordWrap: 'revert-layer' }}
                        >
                            Total Earned
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: 'gray', marginLeft: 'auto' }}
                        >
                            {stats.totalEarned}€
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Statistics
