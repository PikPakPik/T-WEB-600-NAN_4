import { Box, Button, Typography } from "@mui/material";

const Homepage = () => {
	return (
		<>
			<Box
				sx={{
					position: "relative",
					width: "100%",
					height: "100vh",
				}}
			>
				<video
					autoPlay
					muted
					loop
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				>
					<source src='/videos/header_com.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				{/* Content on top of the video */}
				<Box
					sx={{
						position: "relative",
						zIndex: 1,
						textAlign: "center",
						paddingTop: "40vh",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{/* Your content here */}
					<Typography
						variant='h1'
						sx={{
							fontSize: { xs: "2rem", md: "4rem" },
							color: "orange",
							fontWeight: "700",
							textShadow:
								"1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
						}}
					>
						Welcome to BP - Your Destination for Best Tech and Performance!
					</Typography>
					<Typography
						variant='h3'
						sx={{
							fontSize: { xs: "1.5rem", md: "2.3rem" },
							color: "lightgray",
							fontWeight: "700",
							textShadow:
								"1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
						}}
					>
						Dive into the ultimate gaming adventure.
					</Typography>
					<Box>
						<Button
							variant='contained'
							sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
							style={{
								backgroundColor: "orange",
								fontWeight: "700",
								color: "black",
							}}
						>
							Shop Now
						</Button>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					gap: "2rem",
					paddingY: "4rem",
					width: { xs: "95%", md: "75%", lg: "60%" },
					margin: "auto",
				}}
			>
				<Typography
					variant='h2'
					sx={{
						fontSize: { xs: "1.7rem", md: "2.2rem" },
						color: "orange",
						fontWeight: "700",
						textShadow:
							"1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
					}}
				>
					Our mission
				</Typography>
				<Typography
					variant='h4'
					sx={{
						fontSize: { xs: "1.2rem", md: "1.7rem" },
						color: "black",
						fontWeight: "700",
					}}
				>
					Provide enthusiasts with the tools you need to dominate the virtual
					world and excel in the digital realm. From high-performance hardware
					to cutting-edge accessories, we strive to fuel your passion and drive
					for excellence.
				</Typography>
				<Box>
					<Button
						variant='contained'
						sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
						style={{
							backgroundColor: "orange",
							fontWeight: "700",
							color: "black",
						}}
					>
						Shop Now
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Homepage;
