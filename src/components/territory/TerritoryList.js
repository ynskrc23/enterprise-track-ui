import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TerritoryList = () => {
    const [territories, setTerritories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTerritories();
    }, []);

    const fetchTerritories = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Territories');
            setTerritories(response.data.data);
        } catch (error) {
            console.error('Error fetching territories:', error);
        }
    };

    const deleteTerritories = async (id) => {
        try {
            await axios.delete(`https://localhost:7086/api/Territories/${id}`);
            setTerritories(territories.filter(territory => territory.id !== id));
        } catch (error) {
            console.error('Error deleting territory:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Territories</h4>
            <Link to="/territory/add" className="btn btn-primary mb-3">Add Territory</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Territory Name</th>
                    <th>Region Name</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {territories.map((territory) => (
                    <tr key={territory.id}>
                        <td>{territory.territoryDescription}</td>
                        <td>{territory.region.regionDescription}</td>
                        <td>{new Date(territory.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(territory.updatedDate).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/territory/edit/${territory.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                            <button onClick={() => deleteTerritories(territory.id)}
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

export default TerritoryList;
