import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";
  if (hideFooter) return null;

  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1">
        © 2023 eCommerce. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
