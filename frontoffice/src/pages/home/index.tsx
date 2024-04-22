import CategoryCards from '@/modules/home/components/CategoryCard'
import { Box, Button, Grid, Typography } from '@mui/material'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { useMediaQuery } from '@mui/material'
import ExtensionIcon from '@mui/icons-material/Extension'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '@/modules/home/styles/swiper-style.css'

const Homepage = () => {
    const isXS = useMediaQuery('(max-width: 600px)')
    const isMD = useMediaQuery('(max-width: 900px)')
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                >
                    <source src="/videos/header_com.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Content on top of the video */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'center',
                        paddingTop: '40vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {/* Your content here */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '4rem' },
                            color: '#136207 ',
                            fontWeight: '700',
                        }}
                    >
                        Welcome to BP <br /> Your Destination for Best Tech and Performance!
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2.3rem' },
                            color: 'white',
                            fontWeight: '700',
                            textShadow:
                                '1px 0 0 #136207, 0 -1px 0 #136207, 0 1px 0 #136207, -1px 0 0 #136207',
                        }}
                    >
                        Dive into the ultimate gaming adventure.
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
                            style={{
                                backgroundColor: '#136207',
                                fontWeight: '700',
                                color: 'white',
                            }}
                        >
                            Shop Now
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    gap: '2rem',
                    paddingY: '4rem',
                    width: { xs: '95%', md: '75%', lg: '60%' },
                    margin: 'auto',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '1.7rem', md: '2.2rem' },
                        color: '#136207',
                        fontWeight: '700',
                    }}
                >
                    Our mission
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: { xs: '1.2rem', md: '1.7rem' },
                        color: 'black',
                        fontWeight: '700',
                    }}
                >
                    Provide enthusiasts with the tools you need to dominate the virtual world and
                    excel in the digital realm. From high-performance hardware to cutting-edge
                    accessories, we strive to fuel your passion and drive for excellence.
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
                        style={{
                            backgroundColor: '#136207',
                            fontWeight: '700',
                            color: 'white',
                        }}
                    >
                        Shop Now
                    </Button>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: 'black', padding: '2rem' }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '1.7rem', md: '2.2rem' },
                        color: 'white',
                        fontWeight: '700',
                        marginBottom: '2rem',
                    }}
                >
                    Our Products:
                </Typography>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={30}
                    slidesPerView={isXS ? 1 : isMD ? 2 : 4}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    style={{ padding: '0rem 5rem 2rem 5rem', gap: '1rem' }}
                >
                    <SwiperSlide>
                        <CategoryCards
                            id={1}
                            name="Processors"
                            image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Intel-Alder-Lake-5-920x570.jpg"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryCards
                            id={1}
                            name="Processors"
                            image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Intel-Alder-Lake-5-920x570.jpg"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryCards
                            id={1}
                            name="Processors"
                            image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Intel-Alder-Lake-5-920x570.jpg"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryCards
                            id={1}
                            name="Processors"
                            image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Intel-Alder-Lake-5-920x570.jpg"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CategoryCards
                            id={1}
                            name="Processors"
                            image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Intel-Alder-Lake-5-920x570.jpg"
                        />
                    </SwiperSlide>
                </Swiper>
            </Box>
            <Box>
                <Grid
                    container
                    spacing={5}
                    sx={{
                        paddingY: '2rem',
                        paddingX: { xs: '1rem', md: '2rem' },
                    }}
                >
                    <Grid item xs={12} md={6} lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <MilitaryTechIcon
                                sx={{
                                    margin: 'auto',
                                    fontSize: '8rem',
                                    color: '#136207',
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.3rem', md: '2rem' },
                                    color: '#136207',
                                    fontWeight: '700',
                                }}
                            >
                                Quality and Reliability
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    color: 'black',
                                }}
                            >
                                We uphold the highest standards of excellence in every aspect of our
                                operations, ensuring that our customers receive reliable, durable,
                                and high-performance solutions they can trust.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <ExtensionIcon
                                sx={{
                                    margin: 'auto',
                                    fontSize: '8rem',
                                    color: '#136207',
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.3rem', md: '2rem' },
                                    color: '#136207',
                                    fontWeight: '700',
                                }}
                            >
                                Integrity and Transparency
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    color: 'black',
                                }}
                            >
                                We conduct ourselves with the highest levels of integrity and
                                transparency, earning the trust and respect of our customers,
                                partners, and employees through open and honest communication and
                                ethical business practices.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <TipsAndUpdatesIcon
                                sx={{
                                    margin: 'auto',
                                    fontSize: '8rem',
                                    color: '#136207',
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.3rem', md: '2rem' },
                                    color: '#136207',
                                    fontWeight: '700',
                                }}
                            >
                                Innovation and Technology Leadership
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    color: 'black',
                                }}
                            >
                                We stay at the forefront of innovation, continuously seeking out new
                                advancements and solutions to provide cutting-edge products and
                                services that meet the evolving needs of our customers.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <SupportAgentIcon
                                sx={{
                                    margin: 'auto',
                                    fontSize: '8rem',
                                    color: '#136207',
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '1.3rem', md: '2rem' },
                                    color: '#136207',
                                    fontWeight: '700',
                                }}
                            >
                                Outstanding Customer Service
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    color: 'black',
                                }}
                            >
                                Our dedicated team goes above and beyond to provide personalized
                                support and solutions, ensuring our customers' satisfaction and
                                building long-lasting relationships based on trust and reliability.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    height: '75vh',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'relative',
                    backgroundImage:
                        'url(https://www.videogameschronicle.com/files/2022/10/saint-pic-10.webp)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',

                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        width: { xs: '90%', md: '75%', lg: '60%' },
                        padding: '1rem',
                        position: 'absolute',
                        bottom: '2rem',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '3rem' },
                            color: '#136207',
                            fontWeight: '700',
                            textShadow: '1px 0 0 #fff, 0 -1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff',
                        }}
                    >
                        Join the Elite Gaming Community
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.2rem', md: '2rem' },
                            color: 'white',
                            fontWeight: '700',
                        }}
                    >
                        Discover the latest games, hardware, and accessories to take your gaming
                        experience to the next level.
                    </Typography>
                    <Box sx={{}}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.5rem' },
                                backgroundColor: '#136207',
                                fontWeight: '700',
                                color: 'white',
                            }}
                        >
                            Join Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Homepage
