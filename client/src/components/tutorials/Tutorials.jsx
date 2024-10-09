import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icon for search
import './Tutorials.css'; // Importing CSS for styles

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTutorials, setFilteredTutorials] = useState([]);

    useEffect(() => {
        // Example: Fetching data from an API endpoint or using mock data
        fetch('/api/tutorials') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setTutorials(data); // Update state with fetched tutorials
                setFilteredTutorials(data); // Initially display all tutorials
            })
            .catch(error => console.error('Error fetching tutorials:', error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = tutorials.filter(tutorial =>
            tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTutorials(filtered);
    };

    return (
        <div className="tutorials-container">
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-icon-container">
                        <FaSearch className="search-icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Tutorials"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            {filteredTutorials.length === 0 && searchTerm && (
                <p className="no-results">No tutorials found.</p>
            )}
            <div className="tutorials-list">
                {filteredTutorials.map((tutorial, index) => (
                    <div key={index} className="tutorial-item">
                        <h3 className="tutorial-title">{tutorial.title}</h3>
                        <p className="tutorial-description">{tutorial.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
