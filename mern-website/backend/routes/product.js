const express = require('express');
const Product = require('../models/product');
const multer = require('multer');
const router = express.Router();

// Set up storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to create a new product
router.post("/products/add", upload.single("productImage"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const productImage = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("Image saved at path:", productImage);
    console.log("File saved at:", req.file.path);


    

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      productImage,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: {
        id: newProduct._id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        stock: newProduct.stock,
        productImage: newProduct.productImage,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }

})
//update the below ones inline with the above 
// Get All Products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update Product
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, category, image: req.file ? req.file.path : undefined },
    { new: true }
  );
  res.json(updatedProduct);
});

// Delete Product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
