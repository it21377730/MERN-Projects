import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    // Fetching user data (like logged-in user's profile)
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/profile"); // Example API to fetch user profile
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <header className="header">
      <div className="logo-and-name">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Logo"
          className="logo"
        />
        <div className="shop-info">
          <h1 className="shop-name">mrs~CraftY</h1>
          <h4 className="shop-note">Creative Mommy</h4>
        </div>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/add-product">Add Product</Link> {/* Link to Add Product Page */}
        <Link to="/products">Products</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/saleoffers">Offers</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* User Profile Section */}
      <div className="user-profile">
        {user ? (
          <>
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <p>{user.fullName}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </header>
  );
};

export default Header;
