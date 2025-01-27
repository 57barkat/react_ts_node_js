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
        boxShadow: "0px -4px 2px -2px gray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="body1" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
        © 2025 eCommerce. All rights reserved.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 1 },
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "12px", sm: "14px" } }}
        >
          Contact Us:
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            href="mailto:barkatullahkhan120136@gmail.com"
            sx={{ fontSize: { xs: "18px", sm: "20px" } }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="tel:+923406087431"
            sx={{ fontSize: { xs: "18px", sm: "20px" } }}
          >
            <PhoneIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
