import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ShipperList = () => {
	const [shippers, setShippers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchShippers();
	}, []);

	const fetchShippers = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Shippers');
			setShippers(response.data.data);
		} catch (error) {
			console.error('Error fetching shippers:', error);
		}
	};

	const deleteShipper = async (id) => {
		try {
			await axios.delete(`https://localhost:7086/api/Shippers/${id}`);
			setShippers(shippers.filter(shipper => shipper.id !== id));
		} catch (error) {
			console.error('Error deleting shipper:', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">Shippers</h4>
			<Link to="/shipper/add" className="btn btn-primary mb-3">Add Shipper</Link>
			<table className="table table-striped table-bordered">
				<thead className="thead-dark">
				<tr>
					<th>Company Name</th>
					<th>Phone</th>
					<th>Created Date</th>
					<th>Updated Date</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{shippers.map((shipper) => (
					<tr key={shipper.id}>
						<td>{shipper.companyName}</td>
						<td>{shipper.phone}</td>
						<td>{new Date(shipper.createdDate).toLocaleDateString()}</td>
						<td>{new Date(shipper.updatedDate).toLocaleDateString()}</td>
						<td>
							<Link to={`/shipper/edit/${shipper.id}`} className="btn btn-secondary btn-sm">Edit</Link>
							<button onClick={() => deleteShipper(shipper.id)}
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

export default ShipperList;
