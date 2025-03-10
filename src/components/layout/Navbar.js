// src/components/layout/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">MyLogo</a>
                <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customer">Customer</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/category">Category</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/supplier">Supplier</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shipper">Shipper</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/region">Region</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/territory">Territory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee">Employee</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/order">Order</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
