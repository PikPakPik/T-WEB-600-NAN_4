import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InventoryIcon from '@mui/icons-material/Inventory'
import { Outlet, useNavigate } from 'react-router-dom'
import { AccountCircle } from '@mui/icons-material'
import { Menu, MenuItem } from '@mui/material'
import { useAuth } from '@/common/hooks/useAuth'

const drawerWidth = 240

interface Props {
    window?: () => Window
}

function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { user } = useAuth()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div style={{ marginLeft: 'auto' }}>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                    {user?.firstname}
                </Typography>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
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
            text: 'Send email',
            link: '/admin/send-email',
            icon: <InboxIcon />,
        },
        {
            text: 'Drafts',
            link: '/admin/drafts',
            icon: <MailIcon />,
        },
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {firstListItem.map((item) => (
                    <ListItem key={item.text} disablePadding onClick={() => navigate(item.link)}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    // Remove this const when copying and pasting into your project.
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
                    <Typography variant="h6" noWrap component="div">
                        E-Commerce Panel
                    </Typography>
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
