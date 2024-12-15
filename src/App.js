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
import CustomerList from "./components/customer/CustomerList";
import CustomerForm from "./components/customer/CustomerForm";
import ShipperList from "./components/shipper/ShipperList";
import ShipperForm from "./components/shipper/ShipperForm";
import RegionForm from "./components/ region/RegionForm";
import RegionList from "./components/ region/RegionList";
import TerritoryList from "./components/territory/TerritoryList";
import TerritoryForm from "./components/territory/TerritoryForm";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeForm from "./components/employee/EmployeeForm";

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

	                <Route path="/customer" element={<CustomerList />} />
                    <Route path="/customer/add" element={<CustomerForm />} />
                    <Route path="/customer/edit/:id" element={<CustomerForm />} />

	                <Route path="/shipper" element={<ShipperList />} />
                    <Route path="/shipper/add" element={<ShipperForm />} />
                    <Route path="/shipper/edit/:id" element={<ShipperForm />} />

                    <Route path="/region" element={<RegionList />} />
                    <Route path="/region/add" element={<RegionForm />} />
                    <Route path="/region/edit/:id" element={<RegionForm />} />

                    <Route path="/territory" element={<TerritoryList />} />
                    <Route path="/territory/add" element={<TerritoryForm />} />
                    <Route path="/territory/edit/:id" element={<TerritoryForm />} />

                    <Route path="/employee" element={<EmployeeList />} />
                    <Route path="/employee/add" element={<EmployeeForm />} />
                    <Route path="/employee/edit/:id" element={<EmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
