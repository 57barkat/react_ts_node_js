import React from "react";
import Footer from "../footer/footer";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Welcome to the Home Page</h1>
        {/* ...other content... */}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
