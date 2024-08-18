import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
	const [customers, setCustomers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Customers');
			setCustomers(response.data.data);
		} catch (error) {
			console.error('Error fetching customers:', error);
		}
	};

	const deleteCategory = async (id) => {
		try {
			await axios.delete(`https://localhost:7086/api/Customers/${id}`);
			setCustomers(customers.filter(customer => customer.id !== id));
		} catch (error) {
			console.error('Error deleting customer:', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">Customers</h4>
			<Link to="/customer/add" className="btn btn-primary mb-3">Add Customer</Link>
			<table className="table table-striped table-bordered">
				<thead className="thead-dark">
				<tr>
					<th>Company Name</th>
					<th>ContactName</th>
					<th>Contact Title</th>
					<th>Address</th>
					<th>City</th>
					<th>Region</th>
					<th>Postal Code</th>
					<th>Country</th>
					<th>Phone</th>
					<th>Fax</th>
					<th>Created Date</th>
					<th>Updated Date</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{customers.map((customer) => (
					<tr key={customer.id}>
						<td>{customer.companyName}</td>
						<td>{customer.contactName}</td>
						<td>{customer.contactTitle}</td>
						<td>{customer.address}</td>
						<td>{customer.city}</td>
						<td>{customer.region}</td>
						<td>{customer.postalCode}</td>
						<td>{customer.country}</td>
						<td>{customer.phone}</td>
						<td>{customer.fax}</td>
						<td>{new Date(customer.createdDate).toLocaleDateString()}</td>
						<td>{new Date(customer.updatedDate).toLocaleDateString()}</td>
						<td>
							<Link to={`/customer/edit/${customer.id}`} className="btn btn-secondary btn-sm">Edit</Link>
							<button onClick={() => deleteCategory(customer.id)}
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

export default CustomerList;
