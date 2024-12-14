import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await axios.get('https://localhost:7086/api/Products');
			setProducts(response.data.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const deleteProduct = async (id) => {
		try {
			await axios.delete(`https://localhost:7086/api/Products/${id}`);
			setProducts(products.filter(product => product.id !== id));
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">Products</h4>
			<Link to="/product/add" className="btn btn-primary mb-3">Add Product</Link>
			<table className="table table-striped table-bordered">
				<thead className="thead-dark">
				<tr>
					<th>Product Name</th>
					<th>Supplier Company Name</th>
					<th>Category Name</th>
					<th>Quantity Per Unit</th>
					<th>Unit Price</th>
					<th>Units In Stock</th>
					<th>Units On Order</th>
					<th>Reorder Level</th>
					<th>Discontinued</th>
					<th>Created Date</th>
					<th>Updated Date</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{products.map((product) => (
					<tr key={product.id}>
						<td>{product.productName}</td>
						<td>{product.supplier.companyName}</td>
						<td>{product.category.categoryName}</td>
						<td>{product.quantityPerUnit}</td>
						<td>{product.unitPrice}</td>
						<td>{product.unitsInStock}</td>
						<td>{product.unitsOnOrder}</td>
						<td>{product.reorderLevel}</td>
						<td>{product.discontinued}</td>
						<td>{new Date(product.createdDate).toLocaleDateString()}</td>
						<td>{new Date(product.updatedDate).toLocaleDateString()}</td>
						<td>
							<Link to={`/product/edit/${product.id}`} className="btn btn-secondary btn-sm">Edit</Link>
							<button onClick={() => deleteProduct(product.id)}
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

export default ProductList;
