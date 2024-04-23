import { Box, Button, Link, TextField, Typography } from '@mui/material'

const LoginPage = () => {
    return (
        <>
            <Box
                sx={{
                    marginTop: '20vh',
                    marginBottom: '4rem',
                    backgroundColor: 'white',
                    width: { xs: '80%', sm: '60%', md: '50%' },
                    marginX: 'auto',
                    padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    borderRadius: '1rem',
                    boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.8)',
                }}
            >
                <Typography
                    variant="h2"
                    textAlign="center"
                    sx={{
                        mt: 2,
                        fontWeight: '600',
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                    }}
                >
                    Welcome back to <span style={{ color: '#136207', fontWeight: '800' }}>BP</span>
                </Typography>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{
                        mt: 2,
                        color: '#136207',
                        fontWeight: '700',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    }}
                >
                    Login
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        margin: 'auto',
                        mt: 4,
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        type="text"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#136207',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#136207',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#136207',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#136207',
                                },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#136207',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            type="submit"
                        >
                            Login
                        </Button>
                        <Typography variant="body2">Forgot your password?</Typography>
                        <Typography variant="body2">
                            Don't have an account? <Link href="/register">Sign up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LoginPage
