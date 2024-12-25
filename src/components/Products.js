import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h2>Products List</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:5000${product.productImage}`} alt={product.name} />
            {/* //style={{ width: "150px", height: "150px" }} */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="btn">Add to Cart</button>
            <button className="btn">Pay Now</button>
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default Products;
