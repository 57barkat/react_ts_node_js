import React, { useState, useEffect } from "react";
import { fetchProductsByCategory } from "../../../../apis/ProductManagementApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState({
    category: "Men",
    price: "",
    size: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, products]);

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsByCategory("Men");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filter.price) {
      filtered.sort((a, b) =>
        filter.price === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (filter.size) {
      filtered = filtered.filter((product) =>
        product.size.includes(filter.size)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Container sx={{ paddingBottom: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Men's Products
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <Box key={product._id}>
              <img
                src={product.frontImageUrl}
                alt={product.productName}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Price</InputLabel>
            <Select
              value={filter.price}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
              <MenuItem value="highToLow">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={filter.size}
              onChange={(e) => setFilter({ ...filter, size: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="XXL">XXL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      <Grid container spacing={2} sx={{ marginBottom: 10 }}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={4} key={product._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.frontImageUrl}
                alt={product.productName}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  sx={{ marginTop: 2 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cart.length === 0 ? (
              <Typography>No items in the cart</Typography>
            ) : (
              cart.map((item, index) => (
                <Typography key={index}>
                  {item.productName} - ${item.price}
                </Typography>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MenProducts;
