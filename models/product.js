import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    imgUrl: String
})

export const Product = mongoose.model('product', productSchema);