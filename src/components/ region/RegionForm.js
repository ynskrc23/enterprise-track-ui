import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RegionForm = () => {
    const [form, setForm] = useState({
        id: null,
        regionDescription: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchRegion(id);
        }
    }, [id]);

    const fetchRegion = async (RegionId) => {
        try {
            const response = await axios.get(`https://localhost:7086/api/Regions/${RegionId}`);
            setForm(response.data.data);
        } catch (error) {
            console.error('Error fetching Region:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('regionDescription', form.regionDescription);

        try {
            if (form.id) {
                // PUT isteği gönder
                await axios.put('https://localhost:7086/api/Regions', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccessMessage('Region updated successfully');
            } else {
                // POST isteği gönder
                await axios.post('https://localhost:7086/api/Regions', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccessMessage('Region added successfully');
            }
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/Region');
            }, 2000);
        } catch (error) {
            console.error('Error submitting Region:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">{id ? 'Edit Region' : 'Add Region'}</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="id" value={form.id} />
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" name="regionDescription" value={form.regionDescription} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {form.id ? 'Update Region' : 'Add Region'}
                </button>
            </form>
        </div>
    );
};

export default RegionForm;
