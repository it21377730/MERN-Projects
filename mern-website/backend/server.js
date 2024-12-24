const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/users.js");
const productRoutes = require('./routes/product.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Backend connection test route
app.get("/api/test", (req, res) => {
  res.send({ message: "Backend is connected to the frontend!" });
});

// User and Product routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);



// Serve static files from the uploads directory
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static('C:/Users/ahfalk/OneDrive - IFS/Desktop/MERN-Projects/mern-website/backend/uploads'));



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
