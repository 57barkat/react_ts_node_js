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
  Collapse,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ChildCareIcon from "@mui/icons-material/ChildCare";
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
  const isAdmin = localStorage.getItem("role") === "admin";
  const [productsOpen, setProductsOpen] = useState(false);

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

  const handleProductsClick = () => {
    setProductsOpen(!productsOpen);
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
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="Store Logo"
              src="https://lh3.googleusercontent.com/-k3b3AAu3Snw/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkm0nPJZEChmc5IHmBICmnksiQ3Ufw/photo.jpg?sz=46" // Replace with the actual path to your image
              style={{ marginRight: 10, width: 30, height: 30 }}
            />
            Barkat Store
          </Typography>
          {!isMobile && (
            <>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
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
          <ListItem
            button
            component={Link}
            to="/"
            onClick={handleLinkClick}
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={handleProductsClick}
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/products/mens"
                onClick={handleLinkClick}
                style={{
                  paddingLeft: theme.spacing(4),
                  borderBottom: "1px solid #ccc",
                }}
              >
                <ListItemIcon style={{ minWidth: "35px" }}>
                  <ManIcon />
                </ListItemIcon>
                <ListItemText primary="Men" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/products/women"
                onClick={handleLinkClick}
                style={{
                  paddingLeft: theme.spacing(4),
                  borderBottom: "1px solid #ccc",
                }}
              >
                <ListItemIcon style={{ minWidth: "35px" }}>
                  <WomanIcon />
                </ListItemIcon>
                <ListItemText primary="Women" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/products/kids"
                onClick={handleLinkClick}
                style={{
                  paddingLeft: theme.spacing(4),
                  borderBottom: "1px solid #ccc",
                }}
              >
                <ListItemIcon style={{ minWidth: "35px" }}>
                  <ChildCareIcon />
                </ListItemIcon>
                <ListItemText primary="Kids" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            component={Link}
            to="/payment"
            onClick={handleLinkClick}
            style={{ borderBottom: "1px solid #ccc" }}
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
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
        {isMobile && (
          <div style={{ marginTop: "auto", padding: theme.spacing(2) }}>
            {isAdmin && (
              <Button
                color="inherit"
                component={Link}
                to="/admin"
                fullWidth
                style={{
                  marginBottom: theme.spacing(1),
                  border: "1px solid #ccc",
                }}
              >
                Admin
              </Button>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              fullWidth
              style={{ border: "1px solid #ccc" }}
            >
              Logout
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default NavBar;
