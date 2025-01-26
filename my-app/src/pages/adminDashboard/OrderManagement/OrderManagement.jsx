import React from "react";
import Footer from "../../../components/footer/footer";
import { Box } from "@mui/material";

const OrderManagement = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Order Management</h1>
        {/* Order management content */}
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderManagement;
