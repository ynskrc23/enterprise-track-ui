import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SupplierList = () => {
	const [suppliers, setSuppliers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const fetchSuppliers = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Suppliers');
			setSuppliers(response.data.data);
		} catch (error) {
			console.error('Error fetching suppliers:', error);
		}
	};

	const deleteSupplier = async (id) => {
		try {
			await axios.delete(`https://localhost:7086/api/Suppliers/${id}`);
			setSuppliers(suppliers.filter(supplier => supplier.id !== id));
		} catch (error) {
			console.error('Error deleting supplier:', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">Suppliers</h4>
			<Link to="/supplier/add" className="btn btn-primary mb-3">Add Supplier</Link>
			<table className="table table-striped table-bordered">
				<thead className="thead-dark">
				<tr>
					<th>Company Name</th>
					<th>Contact Name</th>
					<th>Contact Title</th>
					<th>Address</th>
					<th>City</th>
					<th>Region</th>
					<th>Postal Code</th>
					<th>Country</th>
					<th>Phone</th>
					<th>Fax</th>
					<th>Homepage</th>
					<th>Created Date</th>
					<th>Updated Date</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{suppliers.map((supplier) => (
					<tr key={supplier.id}>
						<td>{supplier.companyName}</td>
						<td>{supplier.contactName}</td>
						<td>{supplier.contactTitle}</td>
						<td>{supplier.address}</td>
						<td>{supplier.city}</td>
						<td>{supplier.region}</td>
						<td>{supplier.postalCode}</td>
						<td>{supplier.country}</td>
						<td>{supplier.phone}</td>
						<td>{supplier.fax}</td>
						<td>{supplier.homepage}</td>
						<td>{new Date(supplier.createdDate).toLocaleDateString()}</td>
						<td>{new Date(supplier.updatedDate).toLocaleDateString()}</td>
						<td>
							<Link to={`/supplier/edit/${supplier.id}`} className="btn btn-secondary btn-sm">Edit</Link>
							<button onClick={() => deleteSupplier(supplier.id)}
							        className="btn btn-danger btn-sm ml-2">Delete
							</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default SupplierList;
