import { Box, Button, Container, Typography } from '@mui/material'

const AboutPage = () => {
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
                        About Us
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#f0f0f0', py: 8 }}>
                <Container maxWidth="lg">
                    <Box>
                        <Typography
                            variant="h2"
                            align="center"
                            sx={{ fontSize: '2rem', fontWeight: '700', mb: 3 }}
                        >
                            Our Story
                        </Typography>
                    </Box>
                    <Typography variant="body1" align="center" sx={{ fontSize: '1.5rem' }}>
                        Welcome to BP, your premier destination for cutting-edge tech products!
                        <br />
                        <br />
                        At BP, we're dedicated to providing you with the latest and greatest in
                        technology, from powerful CPUs and high-performance GPUs to sleek keyboards
                        and more. <br />
                        <br />
                        With BP, you can explore a vast selection of top-quality tech products
                        designed to enhance your digital experience. Whether you're a hardcore
                        gamer, a tech enthusiast, or a professional in need of reliable hardware,
                        we've got you covered. <br />
                        <br />
                        What sets BP apart is our commitment to delivering not just products, but
                        experiences. We understand the importance of staying ahead in the fast-paced
                        world of technology, and that's why we're constantly updating our inventory
                        to offer you the most innovative solutions on the market. <br />
                        <br />
                        Our user-friendly platform makes it effortless to browse, compare, and
                        purchase your favorite tech essentials. With secure payment options and fast
                        shipping, you can shop with confidence, knowing that your satisfaction is
                        our top priority. <br />
                        <br />
                        Join the BP community today and discover a world of possibilities at your
                        fingertips. Whether you're building the ultimate gaming rig, upgrading your
                        workstation, or simply indulging your passion for tech, BP is your go-to
                        destination for all things digital. <br />
                        <br />
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ fontSize: '1.5rem' }}>
                        Experience the future of technology with BP - where innovation meets
                        convenience!
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default AboutPage
