// src/components/category/CategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`https://localhost:7086/api/Categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleImageClick = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Categories</h4>
            <Link to="/category/add" className="btn btn-primary mb-3">Add Category</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Picture</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>{category.description}</td>
                        <td>
                            <img
                                src={`https://localhost:7086/Uploads/Categories/${category.picture}`}
                                alt={category.categoryName}
                                className="img-fluid"
                                style={{ width: '100px', cursor: 'pointer' }}
                                onClick={() => handleImageClick(`https://localhost:7086/Uploads/Categories/${category.picture}`)}
                            />
                        </td>
                        <td>{new Date(category.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(category.updatedDate).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/category/edit/${category.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                            <button onClick={() => deleteCategory(category.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
