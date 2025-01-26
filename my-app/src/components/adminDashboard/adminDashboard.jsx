import React, { useState } from "react";
import NavBar from "../navbar/navBar";
import SideBar from "../sidebar/sideBar";
import Footer from "../footer/footer";
import { Box } from "@mui/material";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar toggleDrawer={toggleDrawer} />
      <SideBar open={sidebarOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Admin Dashboard</h1>
        {/* Admin dashboard content */}
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
