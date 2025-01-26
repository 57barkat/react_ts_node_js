import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../../components/HeroSection/heroSection";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HeroSection />
      </Box>
    </Box>
  );
};

export default HomePage;
