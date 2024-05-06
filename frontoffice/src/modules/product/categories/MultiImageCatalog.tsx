import { useState } from 'react'
import { Box, Grid, Paper } from '@mui/material'

interface MultiImageCatalogProps {
    images: string[]
}

const MultiImageCatalog = ({ images }: MultiImageCatalogProps) => {
    const [selectedImage, setSelectedImage] = useState(images[0])

    const handleImageClick = (image: string) => {
        setSelectedImage(image)
    }

    return (
        <Box sx={{ flex: { xs: '100%', md: '70%' } }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <img
                    src={selectedImage}
                    alt="Main"
                    style={{
                        maxWidth: '100%',
                        minHeight: '50vh',
                        height: 'auto',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                        borderRadius: '1rem',
                    }}
                />
            </Box>

            <Grid container spacing={1} sx={{ mt: 1 }}>
                {images.map((image, index) => (
                    <Grid item xs={2} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                cursor: 'pointer',
                                p: 1,
                                border:
                                    selectedImage === image
                                        ? '2px solid green'
                                        : '2px solid transparent',
                            }}
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default MultiImageCatalog
