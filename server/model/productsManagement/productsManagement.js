const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    commentText: { type: String, required: false }
});

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, enum: ['Men', 'Women', 'Kid'], required: true },
    price: { type: Number, required: true, min: 0 },
    size: { type: [String], enum: ['Small', 'Medium', 'Large', 'XL', 'XXL'], required: true },
    color: { type: String, required: true },
    frontImageUrl: { type: String, required: true },
    backImageUrl: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    comments: [commentSchema]
}, { timestamps: true });

productSchema.index({ productName: 1, category: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
