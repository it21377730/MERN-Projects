// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  },
  image: {
    type: String, // URL or path to image
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
