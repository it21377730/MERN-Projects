const Product = require('../models/product');

// Controller to handle creating a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,  // Include category when creating the product
      image: req.file.path, // Save the image file path
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Controller to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Controller to update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const updatedData = {
      name,
      description,
      price,
      category, // Include category in update
      image: req.file ? req.file.path : undefined,
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Controller to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
