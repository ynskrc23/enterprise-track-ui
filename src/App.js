// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CategoryList from './components/category/CategoryList';
import CategoryForm from './components/category/CategoryForm';
import Home from './components/home/Home';
import SupplierList from "./components/supplier/SupplierList";
import SupplierForm from "./components/supplier/SupplierForm";
import ProductList from "./components/product/ProductList";
import ProductForm from "./components/product/ProductForm";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route path="/category/add" element={<CategoryForm />} />
                    <Route path="/category/edit/:id" element={<CategoryForm />} />
                    <Route path="/supplier" element={<SupplierList />} />
                    <Route path="/supplier/add" element={<SupplierForm />} />
                    <Route path="/supplier/edit/:id" element={<SupplierForm />} />
	                <Route path="/product" element={<ProductList />} />
                    <Route path="/product/add" element={<ProductForm />} />
                    <Route path="/product/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
