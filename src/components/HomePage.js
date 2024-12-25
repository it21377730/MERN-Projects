import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "./Header"; // Import Header component
// import Footer from "./Footer"; // Import Footer component
//import "./styles.css"; // Add this CSS file for styling

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="page-container">
      {/* <Header /> Reuse Header Component */}
      
      <div className="content">
        <div className="hero">
          <h2>Dive into a world of creativity with our unique craft items!</h2>
        </div>

        <section className="featured">
          <h2>Featured Craft Creations</h2>
          <div className="products">
            {products.slice(0, 6).map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <button className="add-to-cart">Add to Cart</button>
                <button className="buy-now">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* <Footer /> Reuse Footer Component */}
    </div>
  );
}

export default HomePage;
