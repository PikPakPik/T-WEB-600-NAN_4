import { Box, Button, Link, TextField, Typography } from '@mui/material'

const LoginPage = () => {
    return (
        <>
            <Box
                sx={{
                    paddingTop: '20vh',
                }}
            >
                <Typography variant="h2" textAlign="center" sx={{ mt: 2, fontWeight: '600' }}>
                    Welcome back to <span style={{ color: '#136207', fontWeight: '800' }}>BP</span>
                </Typography>
                <Typography variant="h3" textAlign="center" sx={{ mt: 2 }}>
                    Login
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: { xs: '100%', sm: '50%', md: '40%' },
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
