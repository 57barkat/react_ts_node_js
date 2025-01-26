import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
    navigate("/login"); // Navigate to login page
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 600) {
      toggleDrawer();
    }
  };

  if (hideNavBar) return null;

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Barkat Store
          </Typography>
          {!isMobile && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleDrawer}
        PaperProps={{ style: { backgroundColor: "white", color: "black" } }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleLinkClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/products"
            onClick={handleLinkClick}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/payment"
            onClick={handleLinkClick}
          >
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payment Info" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/about"
            onClick={handleLinkClick}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
