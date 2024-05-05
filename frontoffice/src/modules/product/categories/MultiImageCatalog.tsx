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
        <Box>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={selectedImage}
                        alt="Main"
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                    />
                </Box>
            </Paper>
            <Grid container spacing={1} sx={{ mt: 2 }}>
                {images.map((image, index) => (
                    <Grid item xs={4} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                cursor: 'pointer',
                                p: 1,
                                border:
                                    selectedImage === image
                                        ? '2px solid #1976d2'
                                        : '2px solid transparent',
                            }}
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default MultiImageCatalog
