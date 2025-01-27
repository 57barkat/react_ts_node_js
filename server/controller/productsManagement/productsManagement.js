const Product = require('../../model/productsManagement/productsManagement');
const { validateProduct, handleImageUpload, calculateAverageRating } = require('../../utils/productsManagement/productsManagement');

const createProduct = async (req, res) => {
    const productData = req.body;
    if (!validateProduct(productData)) {
        return res.status(400).json({ message: 'Invalid product data' });
    }
    productData.frontImageUrl = handleImageUpload(productData.frontImageUrl);
    productData.backImageUrl = handleImageUpload(productData.backImageUrl);
    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    if (updateData.frontImageUrl) {
        updateData.frontImageUrl = handleImageUpload(updateData.frontImageUrl);
    }
    if (updateData.backImageUrl) {
        updateData.backImageUrl = handleImageUpload(updateData.backImageUrl);
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

const postComment = async (req, res) => {
    const { id } = req.params;
    const { userId, commentText } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.comments.push({ userId, commentText });
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error posting comment', error });
    }
};

const postRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating value' });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.rating = calculateAverageRating([...product.rating, rating]);
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error posting rating', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    postComment,
    postRating
};
