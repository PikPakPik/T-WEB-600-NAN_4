import { Category } from "@/common/types/Category";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	card: {
		cursor: "pointer",
		width: "100%",
		height: "auto",
		borderRadius: "1rem",
		aspectRatio: "1/1",
		objectFit: "cover",
		position: "relative",
		transition: "transform 0.2s ease-in-out",
		"&:hover": {
			transform: "scale(0.98)", // Zoom effect on hover
			transition: "all 0.2s ease-in-out",
		},
		"&:hover h4": {
			transform: "translate(50%, -50%) scale(1.1)",
			transition: "all 0.2s ease-in-out",
			top: "50%",
			right: "50%",
		},
		"&:hover img": {
			filter: "blur(4px) opacity(0.7)",
		},
	},
	typography: {
		color: "white",
		position: "absolute",
		top: "1rem",
		right: "1rem",
		transition: "all 0.2s ease-in-out",
	},
});

const CategoryCard = (props: Category) => {
	const classes = useStyles();

	return (
		<>
			<Box className={classes.card}>
				<img src={props.image} alt='processors' className={classes.card} />

				<Typography
					variant='h4'
					className={classes.typography}
					sx={{ fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.8rem" } }}
				>
					{props.name}
				</Typography>
			</Box>
		</>
	);
};

export default CategoryCard;
