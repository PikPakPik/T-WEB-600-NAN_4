import {
    Box,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
    Slider,
    Typography,
    Dialog,
    DialogContent,
    Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '@/common/types/Category'
import { Product } from '@/common/types/Product'
import { useLocation } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Close } from '@mui/icons-material'

const CategoryPage = () => {
    const location = useLocation()
    const { categoryName, categoryImage } = location.state || {}
    const [categoryNameState, setCategoryNameState] = useState(categoryName)
    const [categoryImageState, setCategoryImageState] = useState(categoryImage)
    const [currentCategory, setCurrentCategory] = useState<Category>()
    const [products, setProducts] = useState<Product[]>([])
    const { id } = useParams()
    const [isPoductsLoading, setIsPoductsLoading] = useState<boolean>(false)
    const [isCurrentCategoryLoading, setIsCurrentCategoryLoading] = useState<boolean>(false)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [visibleProducts, setVisibleProducts] = useState(6)
    const [sortingCriteria, setSortingCriteria] = useState<string>('')
    const [priceRange, setPriceRange] = useState<number[]>([0, 0])
    const [openDialog, setOpenDialog] = useState(false)

    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const handleChange = (event: Event, newPriceRange: number | number[]) => {
        setPriceRange(newPriceRange as number[])
        event.preventDefault()
    }

    const priceRangeText = (value: number) => {
        return `${value}€`
    }

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortingCriteria(event.target.value)
    }

    const filteredProducts = products.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    const handleShowMore = () => {
        setVisibleProducts((prev) => prev + 6)
    }

    const sortedProducts = sortingCriteria
        ? filteredProducts.slice().sort((a, b) => {
              // Implement sorting logic based on the selected criteria
              switch (sortingCriteria) {
                  case 'A-Z':
                      return a.name.localeCompare(b.name)
                  case 'Z-A':
                      return b.name.localeCompare(a.name)
                  case 'Price ↓':
                      return a.price - b.price
                  case 'Price ↑':
                      return b.price - a.price
                  default:
                      return 0
              }
          })
        : filteredProducts

    const fetchCategory = async () => {
        try {
            setIsCurrentCategoryLoading(true)
            const response = await fetch(`${process.env.API_URL}/categories/${id}`)
            const data = await response.json()
            if (response.ok) {
                setIsCurrentCategoryLoading(false)
                setCurrentCategory(data)
                setCategoryNameState(currentCategory && currentCategory.name)
                setCategoryImageState('https://via.placeholder.com/1920x1080')
            } else {
                console.error(data.message)
            }
        } catch (error) {}
    }
    useEffect(() => {
        if (!categoryNameState || !categoryImageState) {
            fetchCategory()
        }
    }, [])
    const fetchProducts = async () => {
        try {
            setIsPoductsLoading(true)
            const response = await fetch(`${process.env.API_URL}/categories/${id}/products`)
            const data = await response.json()
            if (response.ok) {
                const activeCategories = data.filter((product: Product) => product.active)

                setProducts(activeCategories)
                const maxPrice = Math.max(
                    ...activeCategories.map((product: Product) => product.price)
                )

                setPriceRange([0, maxPrice])
                setMaxPrice(maxPrice)
                setIsPoductsLoading(false)
            } else {
                console.error(data.message)
            }
        } catch (error) {}
    }
    useEffect(() => {
        fetchProducts()
    }, [id])

    return (
        <>
            {isCurrentCategoryLoading ? (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '50vh',
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{ background: 'lightgray' }}
                    />
                </Box>
            ) : (
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
                        src={categoryImage} // change this from
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
                            {categoryName}
                        </Typography>
                    </Box>
                </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box
                    sx={{
                        width: { xs: '100%', md: '25%' },
                        borderRight: { xs: 'none', md: '1px solid lightgray' },
                        borderBottom: { xs: '1px solid lightgray', md: 'none' },
                        display: 'flex',
                        flexDirection: 'column',
                        position: { xs: 'relative', md: 'sticky' },
                        top: { xs: 'auto', md: '10vh' },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ padding: '1rem', fontSize: { xs: '1rem', md: '1.3rem' } }}
                        >
                            Filters:
                        </Typography>
                        <IconButton
                            onClick={handleDialogOpen}
                            sx={{ alignSelf: 'center', display: { xs: 'flex', md: 'none' } }}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                    <Dialog fullWidth open={openDialog} onClose={handleDialogClose}>
                        <DialogContent sx={{ height: '70vh' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>
                                    Filters:
                                </Typography>
                                <IconButton onClick={handleDialogClose}>
                                    <Close />
                                </IconButton>
                            </Box>

                            <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                                Price range:
                            </Typography>
                            <Slider
                                sx={{ width: '95%', color: 'green' }}
                                getAriaLabel={() => 'Price range'}
                                value={priceRange}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={priceRangeText}
                                max={maxPrice}
                            />

                            <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                                Sort Product by:
                            </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortingCriteria}
                                defaultValue="None"
                                onChange={handleSortChange}
                                sx={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid lightgray',
                                }}
                            >
                                <MenuItem value="None">None</MenuItem>
                                <MenuItem value="A-Z">Alphabet A⇨Z</MenuItem>
                                <MenuItem value="Z-A">Alphabet Z⇨A</MenuItem>
                                <MenuItem value="Price ↑">Price ⇘</MenuItem>
                                <MenuItem value="Price ↓">Price ⇗</MenuItem>
                            </Select>
                        </DialogContent>
                    </Dialog>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: { xs: 'row', md: 'column' },
                            gap: '1rem',
                            padding: '1rem',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                            Price range:
                        </Typography>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={priceRange}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={priceRangeText}
                            max={maxPrice}
                            sx={{
                                color: 'green',
                            }}
                        />

                        <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                            Sort Product by:
                        </Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortingCriteria}
                            defaultValue="None"
                            onChange={handleSortChange}
                            sx={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid lightgray',
                            }}
                        >
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value="A-Z">Alphabet A⇨Z</MenuItem>
                            <MenuItem value="Z-A">Alphabet Z⇨A</MenuItem>
                            <MenuItem value="Price ↑">Price ⇘</MenuItem>
                            <MenuItem value="Price ↓">Price ⇗</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Box>
                    {isPoductsLoading ? (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: '1rem',
                                padding: '1rem',
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={250}
                                height={250}
                                sx={{ background: 'lightgray' }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'grid',

                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: '1rem',
                                padding: '1rem',
                            }}
                        >
                            {sortedProducts.slice(0, visibleProducts).map((product) => (
                                <Box
                                    key={product.id}
                                    sx={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                >
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
                                            src={product.photo}
                                            alt={product.name}
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
                                                fontSize: {
                                                    xs: '1.2rem',
                                                    md: '1.5rem',
                                                    lg: '1.8rem',
                                                },
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'black',
                                            fontSize: {
                                                xs: '1rem',
                                                md: '1.2rem',
                                                lg: '1.5rem',
                                            },
                                        }}
                                    >
                                        {product.price} €
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                    {visibleProducts < sortedProducts.length && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={handleShowMore}
                                sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
                                style={{
                                    backgroundColor: '#136207',
                                    fontWeight: '700',
                                    color: 'white',
                                    margin: '1rem',
                                }}
                            >
                                Show more
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default CategoryPage
