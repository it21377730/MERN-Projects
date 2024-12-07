const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const User = require("../models/user");  // Assuming the User model is in the "models" folder

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // Specify upload directory

// User Registration Endpoint
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    // Destructure the request body
    const {
      username,
      fullName,
      email,
      password,
      phoneNumber,
      age,
      gender,
      address,
      shippingAddress,
      country,
      dateOfBirth,
    } = req.body;

    // Check for required fields (Username, Email, Password)
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All required fields (username, email, password) must be filled." });
    }

    // Check if the email is already in use (avoid duplicate registration)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User object
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : null, // Handle optional profile picture
      phoneNumber,
      age,
      gender,
      address,
      shippingAddress,
      country,
      dateOfBirth,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success after saving the user
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture, // Send back the profile picture path if it exists
      },
    });
  } catch (error) {
    console.error(error);
    // Handle error if anything goes wrong
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

module.exports = router;
