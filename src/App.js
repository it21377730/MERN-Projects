import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import UserRegister from "./components/UserRegister";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from "axios";

function App() {
  const [backendMessage, setBackendMessage] = useState(""); // To test backend connection

  useEffect(() => {
    // Test backend connection
    axios.get("/api/test")
      .then((response) => {
        setBackendMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setBackendMessage("Failed to connect to backend.");
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {/* Backend connection status */}
      <div style={{ textAlign: "center", padding: "10px", background: "#f0f0f0" }}>
        <p>{backendMessage}</p>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
