const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product');  // Import the Product model
const User = require("./models/user");
const userRoutes = require("./routes/users.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection string from environment variables
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN Website!');
});

// Get products route
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products from MongoDB
    res.json(products);  // Send the products as a JSON response
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Use the userRoutes to handle user-related routes (including register)
 // Adjust path as needed
app.use("/users", userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
