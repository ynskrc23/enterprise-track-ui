import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
	const [form, setForm] = useState({
		id: null,
		productName: '',
		quantityPerUnit: '',
		unitPrice: '',
		unitsInStock: '',
		unitsOnOrder: '',
		reorderLevel: '',
		discontinued: '',
		categoryId: '',
		supplierId: ''
	});
	const [categories, setCategories] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			fetchProduct(id);
		}
		fetchCategories();
		fetchSuppliers();
	}, [id]);

	const fetchProduct = async (productId) => {
		try {
			const response = await axios.get(`https://localhost:7086/api/Products/${productId}`);
			setForm(response.data.data);
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Categories');
			setCategories(response.data.data);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	const fetchSuppliers = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Suppliers');
			setSuppliers(response.data.data);
		} catch (error) {
			console.error('Error fetching suppliers:', error);
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
		formData.append('productName', form.productName);
		formData.append('quantityPerUnit', form.quantityPerUnit);
		formData.append('unitPrice', form.unitPrice);
		formData.append('unitsInStock', form.unitsInStock);
		formData.append('unitsOnOrder', form.unitsOnOrder);
		formData.append('reorderLevel', form.reorderLevel);
		formData.append('discontinued', form.discontinued);
		formData.append('categoryId', form.categoryId);
		formData.append('supplierId', form.supplierId);

		try {
			if (form.id) {
				// PUT isteği gönder
				await axios.put('https://localhost:7086/api/Products', formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Product updated successfully');
			} else {
				// POST isteği gönder
				await axios.post('https://localhost:7086/api/Products', formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setSuccessMessage('Product added successfully');
			}
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/product');
			}, 2000);
		} catch (error) {
			console.error('Error submitting product:', error.response ? error.response.data : error.message);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{id ? 'Edit Product' : 'Add Product'}</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<input type="hidden" name="id" value={form.id} />
				<div className="row">
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Product Name</label>
							<input type="text" name="productName" value={form.productName} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Quantity Per Unit</label>
							<input type="text" name="quantityPerUnit" value={form.quantityPerUnit} onChange={handleChange}
							       className="form-control" required/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Unit Price</label>
							<input type="text" name="unitPrice" value={form.unitPrice} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Units In Stock</label>
							<input type="text" name="unitsInStock" value={form.unitsInStock} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Units On Order</label>
							<input type="text" name="unitsOnOrder" value={form.unitsOnOrder} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Reorder Level</label>
							<input type="text" name="reorderLevel" value={form.reorderLevel} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Discontinued</label>
							<input type="text" name="discontinued" value={form.discontinued} onChange={handleChange}
							       className="form-control"/>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Category</label>
							<select name="categoryId" value={form.categoryId} onChange={handleChange} className="form-control" required>
								<option value="">Select Category</option>
								{categories.map(category => (
									<option key={category.id} value={category.id}>
										{category.categoryName}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<div className="form-group">
							<label>Supplier</label>
							<select name="supplierId" value={form.supplierId} onChange={handleChange} className="form-control" required>
								<option value="">Select Supplier</option>
								{suppliers.map(supplier => (
									<option key={supplier.id} value={supplier.id}>
										{supplier.companyName}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					{form.id ? 'Update Product' : 'Add Product'}
				</button>
			</form>
		</div>
	);
};

export default ProductForm;