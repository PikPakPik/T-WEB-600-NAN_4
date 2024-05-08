import { Box } from "@mui/material";

const Footer = () => {
	return (
		<>
			<Box
				component='footer'
				sx={{
					bgcolor: "black",
					width: "100%",
					display: "flex",
					flexDirection: "row",
                    py:2,
				}}
			>
				<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
					<img src='/pics/EcomTechLogoWhite.png' style={{ width: "4rem" }} />
				</Box>
				<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
					<img src='/pics/EcomTechLogoWhite.png' style={{ width: "3rem" }} />
				</Box>
				<Box></Box>
				<Box></Box>
			</Box>
		</>
	);
};

export default Footer;
