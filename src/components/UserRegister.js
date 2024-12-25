import React, { useState } from "react";
import axios from "axios";
import "./UserRegister.css"; // Make sure to create and link this CSS file


const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("shippingAddress", shippingAddress);
    formData.append("country", country);
    formData.append("dateOfBirth", dateOfBirth);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    console.log("FormData:", formData);

    try {
      const response = await axios.post("http://localhost:5000/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // If the response is successful, you can get the userId and store it
    const { userId, username, email, profilePicture } = response.data.user;

    // Store the userId (for example, in localStorage or state)
    localStorage.setItem("userId", userId);  // Storing userId in localStorage
    localStorage.setItem("username", username);  // Optionally, you can store the username
    localStorage.setItem("email", email);  // Optionally, you can store the email
    localStorage.setItem("profilePicture", profilePicture);  // Optionally, you can store profilePicture

    alert("User registered successfully!");
    // Optionally, you can redirect the user to another page after registration
    window.location.href = "/login";  // Redirect to the login page or dashboard

      // alert(response.data.message);  // Will display "User registered successfully!"
      // console.log(response.data.user); 
      // console.log("Registration response:", response.data);
    } catch (error) {
      alert("Error registering user");
      console.error("Registration error:", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        document.querySelector('.circle-container').style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="registration-container">
      
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        
        {/* Profile Picture */}
        <div className="form-group">
          <div className="profile-picture-container">
            <input
              type="file"
              name="profilePicture"
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
                handleProfilePictureChange(e);
              }}
              accept="image/*"
            />
            <div className="circle-container">
              <div className="plus-icon">+</div>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Full Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age */}
        <div className="form-group">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Shipping Address */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        {/* Country */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
        
      </form>
      
    </div>
  );
};

export default UserRegister;
