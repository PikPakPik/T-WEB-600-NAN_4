import Statistics from '@/modules/panel/components/Statistics'
import { Box } from '@mui/material'
const HomePanel = () => {
    return (
        <>
            <Box component="main">
                <Statistics />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <img
                        src="/pics/EcomTechLogoBlack.png"
                        alt="EcomTech Logo"
                        style={{ width: '50%' }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default HomePanel
