import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '@/auth'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { handleLogin } = useContext(AuthContext)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // Construct the body data
        const formData = {
            email: email,
            password: password,
        }

        try {
            Swal.fire({
                title: 'Processing',
                html: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading()
                },
            })
            const response = await fetch(`${process.env.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                Swal.close()
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500,
                })
                handleLogin(data.token)

                window.location.href = '/'
            } else {
                Swal.close()
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: data.message || 'Invalid username/password supplied',
                })
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
                            style: { color: 'black' },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                </form>
            </Box>
        </>
    )
}

export default LoginPage
