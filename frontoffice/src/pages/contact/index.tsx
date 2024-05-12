import { Box, Container, Typography } from '@mui/material'

const ContactPage = () => {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '50vh',
                }}
            >
                <img
                    alt="header_com"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    src={
                        'https://img.freepik.com/free-photo/black-white-bokeh-particles_1017-3297.jpg?t=st=1715470361~exp=1715473961~hmac=f829f449bdc23e6c3f3c473823b52f3afc8fda5f3fdea30f3c4bd6288098c2a0&w=1380'
                    } // change this from
                />

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'center',
                        paddingTop: '20vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '4rem' },
                            color: '#136207 ',
                            fontWeight: '700',
                        }}
                    >
                        Contact Us
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#f0f0f0', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" align="center" gutterBottom>
                        Contact Information
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Feel free to reach out to us using the following contact details:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 4,
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> contact@bp.com
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Phone:</strong> +1 123 456 7890
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Address:</strong> 123 Tech Street, Tech City, Techland
                        </Typography>
                    </Box>
                    <Typography variant="body1" align="center" mt={4}>
                        We look forward to hearing from you!
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default ContactPage
