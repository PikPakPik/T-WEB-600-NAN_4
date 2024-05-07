import { useAuth } from '@/common/hooks/useAuth'
import { AccountCircle, ArrowBack } from '@mui/icons-material'
import InventoryIcon from '@mui/icons-material/Inventory'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const drawerWidth = 240

interface Props {
    window?: () => Window
}

function ProfileMenu() {
    const { user } = useAuth()

    return (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <AccountCircle />
            <Typography variant="body1" style={{ marginLeft: '5px' }}>
                {user?.firstName}
            </Typography>
        </div>
    )
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const navigate = useNavigate()

    const handleDrawerClose = () => {
        setIsClosing(true)
        setMobileOpen(false)
    }

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false)
    }

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen)
        }
    }

    const firstListItem = [
        {
            text: 'Dashboard',
            link: '/admin',
            icon: <InboxIcon />,
        },
        {
            text: 'Products',
            link: '/admin/products',
            icon: <InventoryIcon />,
        },
        {
            text: 'Categories',
            link: '/admin/categories',
            icon: <InboxIcon />,
        },
    ]

    const drawer = (
        <>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    E-Commerce Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ height: 'inherit' }}>
                {firstListItem.map((item) => (
                    <ListItem key={item.text} disablePadding onClick={() => navigate(item.link)}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem
                    disablePadding
                    onClick={() => navigate('/')}
                    style={{ position: 'absolute', bottom: 0 }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ArrowBack />
                        </ListItemIcon>
                        <ListItemText primary="Return to Site" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ProfileMenu />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}
