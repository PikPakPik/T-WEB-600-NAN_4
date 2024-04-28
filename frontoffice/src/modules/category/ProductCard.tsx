import { Box, Typography } from '@mui/material'
import { Product } from '@/common/types/Product'

const ProductCard = (props: Product) => {
    return (
        <>
            <Box
                sx={{
                    cursor: 'pointer',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(0.98)', // Zoom effect on hover
                        transition: 'all 0.2s ease-in-out',
                    },
                    '&:hover h4': {
                        transform: 'translate(50%, -50%) scale(1.1)',
                        transition: 'all 0.2s ease-in-out',
                        top: '50%',
                        right: '50%',
                    },
                    '&:hover img': {
                        filter: 'blur(4px) opacity(0.7)',
                    },
                }}
            >
                <img
                    src={props.image}
                    alt="processors"
                    style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '1rem',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        position: 'relative',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                />

                <Typography
                    variant="h4"
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        transition: 'all 0.2s ease-in-out',
                        fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.8rem' },
                    }}
                >
                    {props.name}
                </Typography>
            </Box>
        </>
    )
}

export default ProductCard
