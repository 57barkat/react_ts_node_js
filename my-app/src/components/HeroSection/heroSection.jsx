import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "100%",
    height: "50vh",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  textOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "2vw", // Use percentage for font size
    fontWeight: "bold",
    zIndex: 10,
    padding: "1rem 2rem",
    background: "rgba(0, 0, 0, 0.5)", // Darker transparent background
    borderRadius: "10px",
    backdropFilter: "blur(5px)", // Slightly lower blur for cleaner effect
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Stronger shadow to separate overlay
    textAlign: "center",
    maxWidth: "80%", // Ensures overlay does not take up too much space on smaller screens
    wordBreak: "break-word", // Ensures text doesn't overflow
  },
  gradientText: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

const HeroSection = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const items = [
    {
      img: "https://images.pexels.com/photos/9393922/pexels-photo-9393922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      img: "https://images.pexels.com/photos/9393546/pexels-photo-9393546.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/5699253/pexels-photo-5699253.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.textOverlay}>Welcome to Barkat Store</div>
      <Carousel
        className={classes.carousel}
        interval={3000}
        indicators={false}
        navButtonsAlwaysVisible={!isMobile}
        autoPlay={true} // Ensure autoPlay is enabled
        animation="slide" // Ensure slide animation
      >
        {items.map((item, i) => (
          <Paper key={i} className={classes.carousel}>
            <img src={item.img} alt={`slide-${i}`} className={classes.image} />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
