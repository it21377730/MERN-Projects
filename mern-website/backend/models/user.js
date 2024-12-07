const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL of the profile picture
  phoneNumber: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: false },
  address: { type: String },
  shippingAddress: { type: String },
  country: { type: String },
  dateOfBirth: { type: Date },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
