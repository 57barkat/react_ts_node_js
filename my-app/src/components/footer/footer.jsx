import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

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
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        boxShadow: "0px -4px 2px -2px gray", // Adjusted boxShadow to be on top
      }}
    >
      <Typography variant="body1">
        © 2025 eCommerce. All rights reserved.
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          Contact Us:
        </Typography>
        <IconButton
          color="inherit"
          href="mailto:barkatullahkhan120136@gmail.com"
        >
          <EmailIcon />
        </IconButton>
        <IconButton color="inherit" href="tel:+923406087431">
          <PhoneIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
