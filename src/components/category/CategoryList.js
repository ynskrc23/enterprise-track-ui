// src/components/category/CategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

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

    const getPictureUrl = (picturePath) => {
        // Bu örnekte, picturePath'i base64 gibi bir veriyle değiştirdiğinizden emin olun
        // veya public dizininden bir dosya yolu kullanın
        // Burada sadece örnek bir placeholder URL kullanacağız
        return 'https://via.placeholder.com/150';
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Categories</h4>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Picture</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>{category.description}</td>
                        <td>
                            <img src={getPictureUrl(category.picture)} alt={category.categoryName} className="img-fluid" style={{ width: '100px' }} />
                        </td>
                        <td>{new Date(category.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(category.updatedDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;