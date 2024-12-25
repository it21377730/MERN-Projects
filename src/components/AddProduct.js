import React, { useState } from 'react';
import axios from 'axios';
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    
  };

  

  
  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append("stock", product.stock);
    formData.append('image', product.image);

    try {
      const response = await axios.post('http://localhost:5000/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Use the response object to display a success message
    if (response.status === 201) {
      alert('Product added successfully!');
      //fetchAddProducts(); // Refresh product list
    }
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />


  <label>Price</label>
  <input
  type="number"
  placeholder="Price"
  value={product.price}
  onChange={(e) => setProduct({ ...product, price: e.target.value })}
  required
  className="price-input" // Add this class name
/>





        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Craft Supplies">Craft Supplies</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Gifts">Gifts</option>
        </select>

        <div className="form-group">
  <label>Stock</label>
  <input
    type="number"
    name="stock"
    value={product.stock || ''}
    onChange={handleChange}
    required
    className="stock-input"
    style={{ textAlign: 'left' }}  // Align the text (number) to the left
  />
</div>


        <label>Product Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
