// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CategoryList from "./components/category/CategoryList";
import Home from "./components/home/Home";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<CategoryList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
