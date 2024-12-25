import React from "react";
//import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
  <div className="section">
    <h4>Contact Us</h4>
    <p>Email: support@example.com</p>
    <p>Phone: +1-234-567-890</p>
    <p>Address: 123 Crafty Lane, Creativity City</p>
  </div>
  <div className="section">
    <h4>Quick Links</h4>
    &nbsp;&nbsp;<a href="/">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/register">Register</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/shop">Shop</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/categories">Categories</a>
  </div>
  <div className="section">
    <h4>Follow Us</h4>
    <div className="social-icons">
      <a href="https://web.facebook.com/login/?_rdc=1&_rdr#"><img src="/images/facebook-icon.png" alt="Facebook" /></a>
      <a href="https://www.instagram.com/accounts/login/?hl=en"><img src="/images/instagram-icon.png" alt="Instagram" /></a>
      <a href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D&mx=2"><img src="/images/twitter-icon.png" alt="Twitter" /></a>
    </div>
  </div>
</footer>
  );
};

export default Footer;
