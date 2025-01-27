import React, { useState, useEffect } from "react";
import {
  createProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
} from "../../../apis/ProductManagementApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";

const ProductManagement = () => {
  const [productData, setProductData] = useState({
    productName: "",
    category: "Men",
    price: 0,
    size: ["Medium"],
    color: "",
    frontImageUrl: "",
    backImageUrl: "",
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(productData);
      console.log("Product created:", newProduct);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdate = async (product) => {
    setSelectedProduct(product);
    setProductData(product);
    setShowDialog(true);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDialogSubmit = async () => {
    try {
      await updateProduct(selectedProduct._id, productData);
      setShowDialog(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kid">Kid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={productData.size}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Front Image URL"
              name="frontImageUrl"
              value={productData.frontImageUrl}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Back Image URL"
              name="backImageUrl"
              value={productData.backImageUrl}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
          </Grid>
        </Grid>
      </form>

      <FormControl fullWidth style={{ marginTop: "20px" }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select value={filterCategory} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Men">Men</MenuItem>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="Kid">Kid</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Front Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <img
                    src={product.frontImageUrl}
                    alt="Front"
                    style={{ width: "50px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(product._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Product Name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kid">Kid</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={productData.size}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Front Image URL"
              name="frontImageUrl"
              value={productData.frontImageUrl}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Back Image URL"
              name="backImageUrl"
              value={productData.backImageUrl}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
