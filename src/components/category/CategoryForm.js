// src/components/category/CategoryForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
    const [form, setForm] = useState({ id: null, categoryName: '', description: '', picture: null });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchCategory(id);
        }
    }, [id]);

    const fetchCategory = async (categoryId) => {
        try {
            const response = await axios.get(`https://localhost:7086/api/Categories/${categoryId}`);
            setForm(response.data.data);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, picture: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryName', form.categoryName);
        formData.append('description', form.description);

        // Eğer `picture` bir dosya ise formData'ya ekleyin
        if (form.picture instanceof File) {
            formData.append('picture', form.picture);
        } else if (!form.id) {
            // Yeni kategori eklerken `picture` alanı zorunludur
            console.error('The picture field is required.');
            return;
        }

        try {
            if (form.id) {
                await axios.put(`https://localhost:7086/api/Categories/${form.id}`, formData);
                setSuccessMessage('Category updated successfully');
            } else {
                await axios.post('https://localhost:7086/api/Categories', formData);
                setSuccessMessage('Category added successfully');
            }
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/category');
            }, 2000);
        } catch (error) {
            console.error('Error submitting category:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">{id ? 'Edit Category' : 'Add Category'}</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" name="categoryName" value={form.categoryName} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" value={form.description} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="form-group">
                            <label>Picture</label>
                            <input type="file" name="picture" onChange={handleFileChange} className="form-control"/>
                            {form.picture && typeof form.picture === 'string' ? (
                                <img src={`https://localhost:7086/Uploads/Categories/${form.picture}`} alt="Current"
                                     className="img-fluid mt-2" style={{width: '100px'}}/>
                            ) : (
                                form.picture &&
                                <img src={URL.createObjectURL(form.picture)} alt="Selected"
                                     className="img-fluid mt-2"
                                     style={{width: '100px'}}/>
                            )}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    {form.id ? 'Update Category' : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
