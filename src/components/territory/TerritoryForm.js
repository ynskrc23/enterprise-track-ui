import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TerritoryForm = () => {
    const [form, setForm] = useState({
        id: null,
        territoryDescription: '',
        regionId: ''
    });
    const [regions, setRegions] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchTerritory(id);
        }
        fetchRegions();
    }, [id]);

    const fetchTerritory = async (territoryId) => {
        try {
            const response = await axios.get(`https://localhost:7086/api/Territories/${territoryId}`);
            setForm(response.data.data);
        } catch (error) {
            console.error('Error fetching territory:', error);
        }
    };

    const fetchRegions = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Regions');
            setRegions(response.data.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
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
        formData.append('territoryDescription', form.territoryDescription);
        formData.append('regionId', form.regionId);

        try {
            if (form.id) {
                // PUT isteği gönder
                await axios.put('https://localhost:7086/api/Territories', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccessMessage('Territory updated successfully');
            } else {
                // POST isteği gönder
                await axios.post('https://localhost:7086/api/Territories', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setSuccessMessage('Territory added successfully');
            }
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/territory');
            }, 2000);
        } catch (error) {
            console.error('Error submitting territory:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">{id ? 'Edit Territory' : 'Add Territory'}</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="id" value={form.id} />
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Territory Description</label>
                            <input type="text" name="territoryDescription" value={form.territoryDescription} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                   
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Region</label>
                            <select name="regionId" value={form.regionId} onChange={handleChange} className="form-control" required>
                                <option value="">Select Region</option>
                                {regions.map(region => (
                                    <option key={region.id} value={region.id}>
                                        {region.regionDescription}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {form.id ? 'Update Territory' : 'Add Territory'}
                </button>
            </form>
        </div>
    );
};

export default TerritoryForm;