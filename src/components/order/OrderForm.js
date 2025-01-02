import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const [form, setForm] = useState({
        customerId: '',
        employeeId: '',
        shipperId: '',
        shipVia: 0,
        freight: 0,
        shipName: '',
        shipAddress: '',
        shipCity: '',
        shipRegion: '',
        shipPostalCode: '',
        shipCountry: '',
        orderDate: new Date().toISOString(),
        requiredDate: new Date().toISOString(),
        shippedDate: new Date().toISOString(),
        details: []
    });

    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
        fetchEmployees();
        fetchShippers();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Customers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Employees');
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchShippers = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Shippers');
            setShippers(response.data.data);
        } catch (error) {
            console.error('Error fetching shippers:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Products');
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddToCart = (product) => {
        const existingProduct = cart.find((item) => item.productId === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { productId: product.id, unitPrice: product.unitPrice, quantity: 1, discount: 0 }]);
        }
    };

    const handleCartChange = (index, field, value) => {
        const updatedCart = [...cart];
        updatedCart[index][field] = value;
        setCart(updatedCart);
    };

    const handleRemoveFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form, details: cart };
            await axios.post('https://localhost:7086/api/Orders', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccessMessage('Order submitted successfully');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/order');
            }, 2000);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Create Order</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>Customer</label>
                        <select name="customerId" value={form.customerId} onChange={handleChange}
                                className="form-control" required>
                            <option value="">Select Customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Employee</label>
                        <select name="employeeId" value={form.employeeId} onChange={handleChange}
                                className="form-control" required>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Shipper</label>
                        <select name="shipperId" value={form.shipperId} onChange={handleChange} className="form-control"
                                required>
                            <option value="">Select Shipper</option>
                            {shippers.map((shipper) => (
                                <option key={shipper.id} value={shipper.id}>
                                    {shipper.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Ship Name</label>
                        <input
                            type="text"
                            name="shipName"
                            value={form.shipName}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Ship Address</label>
                        <input
                            type="text"
                            name="shipAddress"
                            value={form.shipAddress}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Ship City</label>
                        <input
                            type="text"
                            name="shipCity"
                            value={form.shipCity}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Ship Region</label>
                        <input
                            type="text"
                            name="shipRegion"
                            value={form.shipRegion}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Ship Postal Code</label>
                        <input
                            type="text"
                            name="shipPostalCode"
                            value={form.shipPostalCode}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Ship Country</label>
                        <input
                            type="text"
                            name="shipCountry"
                            value={form.shipCountry}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Freight</label>
                        <input
                            type="number"
                            name="freight"
                            value={form.freight}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Ship Via</label>
                        <input
                            type="number"
                            name="shipVia"
                            value={form.shipVia}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <h5>Products</h5>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p>Price: ${product.unitPrice}</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h5>Cart</h5>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => {
                        const product = products.find((p) => p.id === item.productId);
                        const totalPrice = item.quantity * item.unitPrice * (1 - item.discount / 100);

                        return (
                            <tr key={index}>
                                <td>{product?.productName}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleCartChange(index, 'quantity', Number(e.target.value))}
                                        className="form-control"
                                    />
                                </td>
                                <td>${item.unitPrice}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={item.discount}
                                        onChange={(e) => handleCartChange(index, 'discount', Number(e.target.value))}
                                        className="form-control"
                                    />
                                </td>
                                <td>${totalPrice.toFixed(2)}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveFromCart(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-success mt-3">
                    Submit Order
                </button>
            </form>
        </div>
    );
};

export default OrderForm;