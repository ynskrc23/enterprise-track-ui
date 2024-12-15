// src/components/employee/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
    const [form, setForm] = useState({
        id: null,
        lastName: '',
        firstName: '',
        title: '',
        titleOfCourtesy: '',
        birthDate: '',
        hireDate: '',
        address: '',
        city: '',
        region: '',
        postalCode: '',
        country: '',
        homePhone: '',
        extension: '',
        notes: '',
        reportsTo: '',
        photo: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchEmployee(id);
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD formatına dönüştürür
    };

    const fetchEmployee = async (employeeId) => {
        try {
            const response = await axios.get(`https://localhost:7086/api/Employees/${employeeId}`);
            setForm(response.data.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, photo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('lastName', form.lastName);
        formData.append('firstName', form.firstName);
        formData.append('title', form.title);
        formData.append('titleOfCourtesy', form.titleOfCourtesy);
        formData.append('birthDate', form.birthDate);
        formData.append('hireDate', form.hireDate);
        formData.append('address', form.address);
        formData.append('city', form.city);
        formData.append('region', form.region);
        formData.append('postalCode', form.postalCode);
        formData.append('country', form.country);
        formData.append('homePhone', form.homePhone);
        formData.append('extension', form.extension);
        formData.append('notes', form.notes);
        formData.append('reportsTo', form.reportsTo);
        // Eğer `photo` bir dosya ise formData'ya ekleyin
        if (form.photo instanceof File) {
            formData.append('photo', form.photo);
        } else if (!form.id) {
            // Yeni kategori eklerken `photo` alanı zorunludur
            console.error('The photo field is required.');
            return;
        }

        try {
            if (form.id) {
                await axios.put(`https://localhost:7086/api/Employees/${form.id}`, formData);
                setSuccessMessage('Employee updated successfully');
            } else {
                await axios.post('https://localhost:7086/api/Employees', formData);
                setSuccessMessage('Employee added successfully');
            }
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/employee');
            }, 2000);
        } catch (error) {
            console.error('Error submitting employee:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">{id ? 'Edit Employee' : 'Add Employee'}</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Title Of Courtesy</label>
                            <input type="text" name="titleOfCourtesy" value={form.titleOfCourtesy}
                                   onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Birth Date</label>
                            <input type="date" name="birthDate" value={formatDate(form.birthDate)} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Hire Date</label>
                            <input type="date" name="hireDate" value={formatDate(form.hireDate)} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" value={form.address} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={form.city} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Region</label>
                            <input type="text" name="region" value={form.region} onChange={handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" value={form.country} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Home Phone</label>
                            <input type="text" name="homePhone" value={form.homePhone} onChange={handleChange}
                                   className="form-control" required/>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label>Extension</label>
                            <input type="text" name="extension" value={form.extension} onChange={handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <label>Reports To</label>
                            <input type="text" name="reportsTo" value={form.reportsTo} onChange={handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <label>Photo</label>
                            <input
                                type="file"
                                name="photo"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                            {form.photo && typeof form.photo === 'string' ? (
                                <img
                                    src={`https://localhost:7086/Uploads/Employees/${form.photo}`}
                                    alt="Current"
                                    className="img-fluid mt-2"
                                    style={{width: '100px'}}
                                />
                            ) : form.photo ? (
                                <img
                                    src={URL.createObjectURL(form.photo)}
                                    alt="Selected"
                                    className="img-fluid mt-2"
                                    style={{width: '100px'}}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={4}
                                      className="form-control"/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {form.id ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
