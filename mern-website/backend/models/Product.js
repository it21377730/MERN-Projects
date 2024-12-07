// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String, // URL or path to image
  },
  category: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
