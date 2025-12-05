import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rate: Number,
    dimension: String,
    reviews: [{reviewer: String, rating: Number}],
    seller:{
        seller_name: String,
        seller_location: String,
        seller_rating: {type: Number, max: 10}
    },
    expiryDate: { type: Date, default: () => Date.now()}
});

const Product = mongoose.model("Products", productSchema);
export default Product;