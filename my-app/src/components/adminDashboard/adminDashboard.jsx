import React from "react";
import Footer from "../footer/footer";
import { Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Admin Dashboard</h1>
        {/* Admin dashboard content */}
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
