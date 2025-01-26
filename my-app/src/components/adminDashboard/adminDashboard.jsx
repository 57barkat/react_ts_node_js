import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Footer from "../footer/footer";
import { Box } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "User Management", path: "/admin/user-management" },
    { title: "Product Management", path: "/admin/product-management" },
    { title: "Payment and Transactions", path: "/admin/payment-transactions" },
    { title: "Order Management", path: "/admin/order-management" },
    { title: "Reporting and Analytics", path: "/admin/reporting-analytics" },
    { title: "Marketing and Promotions", path: "/admin/marketing-promotions" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textAlign: "center",
            mb: 2,
            animation: "shake 3.5s",
            padding: "10px",
            margin: "10px auto",
            display: "inline-block",
            border: "2px solid #ccc",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Hey! Barkat, welcome back
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => navigate(card.path)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                  },
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

const styles = `
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AdminDashboard;
