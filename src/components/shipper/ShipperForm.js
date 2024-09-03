import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ShipperForm = () => {
	const [form, setForm] = useState({
		id: null,
		companyName: '',
		phone: ''
	});
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			fetchShipper(id);
		}
	}, [id]);

	const fetchShipper = async (shipperId) => {
		try {
			const response = await axios.get(`https://localhost:7086/api/Shippers/${shipperId}`);
			setForm(response.data.data);
		} catch (error) {
			console.error('Error fetching Shipper:', error);
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
		formData.append('phone', form.phone);
		try {
			if (form.id) {
				// PUT isteği gönder
				await axios.put(`https://localhost:7086/api/Shippers`, formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Shipper updated successfully');
			} else {
				// POST isteği gönder
				await axios.post('https://localhost:7086/api/Shippers', formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Shipper added successfully');
			}
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/shipper');
			}, 2000);
		} catch (error) {
			console.error('Error submitting shipper:', error.response ? error.response.data : error.message);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{id ? 'Edit Shipper' : 'Add Shipper'}</h4>
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
							<label>Phone</label>
							<input type="text" name="phone" value={form.phone} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					{form.id ? 'Update Shipper' : 'Add Shipper'}
				</button>
			</form>
		</div>
	);
};

export default ShipperForm;
