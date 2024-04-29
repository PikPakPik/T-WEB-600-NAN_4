import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'

const RegisterPage = () => {
    const API_URL = process.env.API_URL
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [email, setEmail] = useState('')
    const [reenterEmail, setReenterEmail] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [reenterPassword, setReenterPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // Construct the body data
        const formData = {
            firstname: firstName,
            lastname: familyName,
            email: email,
            password: password,
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                Swal.fire({
                    title: 'Registration successful',
                    text: 'You can now login to your account.',
                    icon: 'success',
                    confirmButtonText: 'Login',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'
                    }
                })

                console.log('Registration successful')
            } else {
                console.error('Registration failed:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

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
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    }}
                >
                    Welcome to <span style={{ color: '#136207', fontWeight: '800' }}>BP</span>
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
                    Register
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,

                        margin: 'auto',
                        marginTop: 4,
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={reenterEmail}
                        onChange={(e) => setReenterEmail(e.target.value)}
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                            value={state}
                            onChange={(e) => setState(e.target.value)}
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
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
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
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
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
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
                </form>
            </Box>
        </>
    )
}

export default RegisterPage
