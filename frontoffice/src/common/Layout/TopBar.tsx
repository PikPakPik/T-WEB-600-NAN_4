import * as React from 'react'
import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Roles } from '../types/Roles'
import CartButton from '@/common/Layout/CartButton'
import { MyGlobalCartContext } from '@/common/context/CartContext'
import Cart from '@/common/cart/Cart'

const pages = [
    { text: 'Products', link: '/#productsBox' },
    { text: 'About us', link: '/about' },
    { text: 'Contact us', link: '/contact' },
]

function ResponsiveAppBar() {
    const { cart } = useContext(MyGlobalCartContext)

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const settingsConnected = [
        { name: 'Profile', link: '/profile' },
        { name: 'Logout', link: handleLogout },
    ]
    const settingsDisconnected = [
        { name: 'Login', link: '/login' },
        { name: 'Register', link: '/register' },
    ]

    if (user?.roles.includes(Roles.ROLE_ADMIN) || user?.roles.includes(Roles.ROLE_SUPER_ADMIN)) {
        settingsConnected.push({ name: 'Admin', link: '/admin' })
    }
    const [cartItemCount, setCartItemCount] = React.useState<number>(0)

    const [isCartOpen, setIsCartOpen] = React.useState(false)

    const handleOpenCart = () => {
        if (user) {
            setIsCartOpen(true)
        } else {
            navigate('/login')
        }
    }
    React.useEffect(() => {
        const count = cart.length
        setCartItemCount(count)
    }, [cart])

    const handleCloseCart = () => {
        setIsCartOpen(false)
    }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="fixed" sx={{ background: 'rgba(0, 0, 0, 0.4);', paddingY: '0.5rem' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img src="/pics/EcomTechLogoWhite.png" style={{ width: '4rem' }} />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    ></Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.text}
                                    onClick={handleCloseNavMenu}
                                    href={page.link}
                                >
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <img src="/pics/EcomTechLogoWhite.png" style={{ width: '2rem' }} />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    ></Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                href={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Box onClick={handleOpenCart}>
                            <CartButton itemCount={cartItemCount} />
                        </Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {user ? (
                                    <Avatar alt="Remy Sharp" src={user.firstName} />
                                ) : (
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user
                                ? settingsConnected.map((setting) => (
                                      <MenuItem
                                          key={setting.name}
                                          onClick={handleCloseUserMenu}
                                          onClickCapture={() => {
                                              if (typeof setting.link === 'string') {
                                                  navigate(setting.link)
                                              } else if (setting.link === handleLogout) {
                                                  setting.link()
                                              }
                                          }}
                                      >
                                          <Typography textAlign="center">{setting.name}</Typography>
                                      </MenuItem>
                                  ))
                                : settingsDisconnected.map((setting) => (
                                      <MenuItem
                                          key={setting.name}
                                          onClick={handleCloseUserMenu}
                                          onClickCapture={() => navigate(setting.link)}
                                      >
                                          <Typography textAlign="center">{setting.name}</Typography>
                                      </MenuItem>
                                  ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Cart isOpen={isCartOpen} handleClose={handleCloseCart} />
        </AppBar>
    )
}
export default ResponsiveAppBar
