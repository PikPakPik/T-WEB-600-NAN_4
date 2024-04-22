import { Box, Button, Link, TextField, Typography } from '@mui/material'

const RegisterPage = () => {
    return (
        <>
            <Box
                sx={{
                    paddingTop: '20vh',
                    paddingBottom: '4rem',
                }}
            >
                <Typography variant="h2" textAlign="center" sx={{ mt: 2, fontWeight: '600' }}>
                    Welcome to <span style={{ color: '#136207', fontWeight: '800' }}>BP</span>
                </Typography>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{ mt: 2, color: '#136207', fontWeight: '700' }}
                >
                    Register
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
                            style: { color: '#136207' },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                    fontWeight: 'bold',
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                            label="Family Name"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                    </Box>

                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#136207' },
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
                        label="Re-enter Email"
                        variant="outlined"
                        type="email"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#136207' },
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
                        label="Address"
                        variant="outlined"
                        type="address"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#136207' },
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="State"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                            label="City"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="ZIP code"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                            label="Country"
                            variant="outlined"
                            type="text"
                            required
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#136207' },
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
                    </Box>

                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        type="tel"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#136207' },
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
                            style: { color: '#136207' },
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
                        label="Re-enter Password"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#136207' },
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
                            Register
                        </Button>
                        <Typography variant="body2">
                            Already have an account? <Link href="/login">Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RegisterPage
