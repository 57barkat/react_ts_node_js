const express = require('express');
const router = express.Router();
const productsController = require('../../../controller/productsManagement/productsManagement');

// Create Product
router.post('/create', productsController.createProduct);

// Get All Products
router.get('/all', productsController.getAllProducts);

// Get Products by Category
router.get('/category/:category', productsController.getProductsByCategory);

// Update Product
router.put('/update/:id', productsController.updateProduct);

// Delete Product
router.delete('/delete/:id', productsController.deleteProduct);

// Post Comments
router.post('/comment/:id', productsController.postComment);

// Post Ratings
router.post('/rating/:id', productsController.postRating);

module.exports = router;
