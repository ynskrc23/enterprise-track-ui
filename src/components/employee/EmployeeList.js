// src/components/employee/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Employees');
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`https://localhost:7086/api/Employees/${id}`);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleImageClick = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Employees</h4>
            <Link to="/employee/add" className="btn btn-primary mb-3">Add Employee</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Picture</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>
                            <img
                                src={`https://localhost:7086/Uploads/Employees/${employee.photo}`}
                                alt={employee.firstName}
                                className="img-fluid"
                                style={{ width: '100px', cursor: 'pointer' }}
                                onClick={() => handleImageClick(`https://localhost:7086/Uploads/Employees/${employee.photo}`)}
                            />
                        </td>
                        <td>{new Date(employee.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(employee.updatedDate).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/employee/edit/${employee.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                            <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
