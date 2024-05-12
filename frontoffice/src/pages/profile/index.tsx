import { useAuth } from '@/common/hooks/useAuth'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ProfilePage = () => {
    const API_URL = process.env.API_URL
    const { user } = useAuth()
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    useEffect(() => {
        console.log(user)
        if (user) {
            setUsername(user.username)
            setFirstName(user.firstname)
            setFamilyName(user.lastname)
            setEmail(user.email)
            setAddress(user.address)
            setState(user.state)
            setCity(user.city)
            setZipCode(user.zipCode)
            setCountry(user.country)
            setPhoneNumber(user.phoneNumber)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to be logged in to access this page',
            }).then(() => {
                window.location.href = '/login'
            })
        }
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    // username,
                    firstname: firstName,
                    lastname: familyName,
                    email: email,
                    // address,
                    // state,
                    // city,
                    // zipCode,
                    // country,
                    // phoneNumber,
                }),
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User updated successfully',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    window.location.href = '/profile'
                })
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating the user',
            })
        }
    }

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
                    }
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
                        Profile
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#f0f0f0', py: 8 }}>
                <Container maxWidth="lg">
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
                                Update user
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    )
}

export default ProfilePage
