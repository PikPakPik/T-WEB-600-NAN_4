import { Box, Typography } from '@mui/material'

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    bgcolor: 'black',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    py: 2,
                }}
            >
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, p: 1 }}>
                    <img src="/pics/EcomTechLogoWhite.png" alt="Logo" style={{ width: '4rem' }} />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, p: 1 }}>
                    <img src="/pics/EcomTechLogoWhite.png" alt="Logo" style={{ width: '3rem' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Typography variant="body2" align="center" sx={{ color: '#fff', p: 1 }}>
                    Made with ❤️ by Alexandre Tressel, Ziyad EL HILA, and Mark Rolland
                </Typography>
            </Box>
        </>
    )
}

export default Footer
