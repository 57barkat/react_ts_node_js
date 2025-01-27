const validateProduct = (product) => {
    const requiredFields = ['productName', 'category', 'price', 'size', 'color', 'frontImageUrl', 'backImageUrl'];
    for (const field of requiredFields) {
        if (!product[field]) {
            return false;
        }
    }
    return true;
};

const handleImageUpload = (imageUrl) => {
    // Placeholder function for handling image uploads
    return imageUrl;
};

const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
};

module.exports = {
    validateProduct,
    handleImageUpload,
    calculateAverageRating
};
