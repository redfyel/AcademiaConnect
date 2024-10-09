import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icon for search
import './Pyqs.css'; // Importing CSS for styles

const Pyqs = () => {
    const [pyqs, setPyqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPyqs, setFilteredPyqs] = useState([]);

    useEffect(() => {
        // Example: Fetching data from an API endpoint or using mock data
        fetch('/api/pyqs') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setPyqs(data); // Update state with fetched PYQs
                setFilteredPyqs(data); // Initially display all PYQs
            })
            .catch(error => console.error('Error fetching PYQs:', error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = pyqs.filter(pyq =>
            pyq.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPyqs(filtered);
    };

    return (
        <div className="pyqs-container">
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-icon-container">
                        <FaSearch className="search-icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search PYQs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            {filteredPyqs.length === 0 && searchTerm && (
                <p className="no-results">No PYQs found.</p>
            )}
            <div className="pyqs-list">
                {filteredPyqs.map((pyq, index) => (
                    <div key={index} className="pyq-item">
                        <h3 className="pyq-title">{pyq.title}</h3>
                        <p className="pyq-description">{pyq.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pyqs;
