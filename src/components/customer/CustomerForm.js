import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
	const [form, setForm] = useState({
		id: null,
		companyName: '',
		contactName: '',
		contactTitle: '',
		address: '',
		city: '',
		region: '',
		postalCode: '',
		country: '',
		phone: '',
		fax: ''
	});
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			fetchCustomer(id);
		}
	}, [id]);

	const fetchCustomer = async (customerId) => {
		try {
			const response = await axios.get(`https://localhost:7086/api/Customers/${customerId}`);
			setForm(response.data.data);
		} catch (error) {
			console.error('Error fetching customer:', error);
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
		formData.append('companyName', form.companyName);
		formData.append('contactName', form.contactName);
		formData.append('contactTitle', form.contactTitle);
		formData.append('address', form.address);
		formData.append('city', form.city);
		formData.append('region', form.region);
		formData.append('postalCode', form.postalCode);
		formData.append('country', form.country);
		formData.append('phone', form.phone);
		formData.append('fax', form.fax);
		try {
			if (form.id) {
				// PUT isteği gönder
				await axios.put(`https://localhost:7086/api/Customers`, formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Customer updated successfully');
			} else {
				// POST isteği gönder
				await axios.post('https://localhost:7086/api/Customers', formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Customer added successfully');
			}
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/customer');
			}, 2000);
		} catch (error) {
			console.error('Error submitting customer:', error.response ? error.response.data : error.message);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{id ? 'Edit Customer' : 'Add Customer'}</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit}>
				<input type="hidden" name="id" value={form.id} />
				<div className="row">
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Company Name</label>
							<input type="text" name="companyName" value={form.companyName} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Contact Name</label>
							<input type="text" name="contactName" value={form.contactName} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Contact Title</label>
							<input type="text" name="contactTitle" value={form.contactTitle} onChange={handleChange}
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
							<label>Phone</label>
							<input type="text" name="phone" value={form.phone} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Fax</label>
							<input type="text" name="fax" value={form.fax} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					{form.id ? 'Update Customer' : 'Add Customer'}
				</button>
			</form>
		</div>
	);
};

export default CustomerForm;
