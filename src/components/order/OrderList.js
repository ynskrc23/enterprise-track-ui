import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Orders');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`https://localhost:7086/api/Orders/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const calculateOrderTotal = (details) => {
        let total = 0;
        let totalDiscount = 0;

        details.forEach((detail) => {
            const discountAmount = detail.unitPrice * detail.quantity * detail.discount;
            total += (detail.unitPrice * detail.quantity) - discountAmount;
            totalDiscount += discountAmount;
        });

        return { total, totalDiscount };
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Orders</h4>
            <Link to="/order/add" className="btn btn-primary mb-3">Add Order</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Employee</th>
                    <th>Shipper</th>
                    <th>Order Date</th>
                    <th>Required Date</th>
                    <th>Shipped Date</th>
                    <th>Freight</th>
                    <th>Ship Name</th>
                    <th>Ship Address</th>
                    <th>Ship City</th>
                    <th>Ship Country</th>
                    <th>Total</th>
                    <th>Discount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => {
                    const { total, totalDiscount } = calculateOrderTotal(order.details);
                    return (
                        <React.Fragment key={order.id}>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.customer?.companyName || 'N/A'}</td>
                                <td>{order.employee?.firstName} {order.employee?.lastName}</td>
                                <td>{order.shipper?.companyName || 'N/A'}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{new Date(order.requiredDate).toLocaleDateString()}</td>
                                <td>{new Date(order.shippedDate).toLocaleDateString()}</td>
                                <td>{order.freight}</td>
                                <td>{order.shipName}</td>
                                <td>{order.shipAddress}</td>
                                <td>{order.shipCity}</td>
                                <td>{order.shipCountry}</td>
                                <td>{total.toFixed(2)}</td>
                                <td>{totalDiscount.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => deleteOrder(order.id)}
                                            className="btn btn-danger btn-sm ml-2">Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="16">
                                    <table className="table table-sm table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Discount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.details.map((detail, index) => (
                                            <tr key={index}>
                                                <td>{detail.productId}</td>
                                                <td>{detail.product?.productName}</td>
                                                <td>{detail.unitPrice.toFixed(2)}</td>
                                                <td>{detail.quantity}</td>
                                                <td>{(detail.discount * 100).toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;