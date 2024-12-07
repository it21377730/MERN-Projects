// userController.js
const User = require('../models/user'); // User model
const upload = require('../multer-config'); // Multer config

// POST route for registering a user
app.post('/users/register', upload.single('profilePicture'), async (req, res) => {
  try {
    // Save user data along with profile picture
    const { username, fullName, email, password, phoneNumber, age, gender, address, shippingAddress, country, dateOfBirth } = req.body;
    const profilePicture = req.file ? req.file.filename : ''; // Get the file name after upload

    const newUser = new User({
      username,
      fullName,
      email,
      password, // Don't forget to hash the password before saving it!
      phoneNumber,
      age,
      gender,
      address,
      shippingAddress,
      country,
      dateOfBirth,
      profilePicture, // Save profile picture file name in the database
    });

    // Save user to database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});
