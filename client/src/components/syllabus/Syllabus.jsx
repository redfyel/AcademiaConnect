import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icon for search
import './Syllabus.css'; // Importing CSS for styles

const Syllabus = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSyllabus, setFilteredSyllabus] = useState([]);

    useEffect(() => {
        // Example: Fetching data from an API endpoint or using mock data
        fetch('http://localhost:4000/exam-api/syllabus') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setSyllabusList(data); // Update state with fetched syllabus
                setFilteredSyllabus(data); // Initially display all syllabus items
            })
            .catch(error => console.error('Error fetching syllabus:', error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = syllabusList.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSyllabus(filtered);
    };

    return (
        <div className="syllabus-container">
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-icon-container">
                        <FaSearch className="search-icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Syllabus"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            {filteredSyllabus.length === 0 && searchTerm && (
                <p className="no-results">No syllabus found.</p>
            )}
            <div className="syllabus-list">
                {filteredSyllabus.map((item, index) => (
                    <div key={index} className="syllabus-item">
                        <h3 className="syllabus-title">{item.title}</h3>
                        <p className="syllabus-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Syllabus;
