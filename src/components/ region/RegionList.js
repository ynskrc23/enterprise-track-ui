import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegionList = () => {
    const [Regions, setRegions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await axios.get('https://localhost:7086/api/Regions');
            setRegions(response.data.data);
        } catch (error) {
            console.error('Error fetching Regions:', error);
        }
    };

    const deleteRegion = async (id) => {
        try {
            await axios.delete(`https://localhost:7086/api/Regions/${id}`);
            setRegions(Regions.filter(Region => Region.id !== id));
        } catch (error) {
            console.error('Error deleting Region:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Regions</h4>
            <Link to="/Region/add" className="btn btn-primary mb-3">Add Region</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Region Description</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Regions.map((Region) => (
                    <tr key={Region.id}>
                        <td>{Region.regionDescription}</td>
                        <td>{new Date(Region.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(Region.updatedDate).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/Region/edit/${Region.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                            <button onClick={() => deleteRegion(Region.id)}
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

export default RegionList;
