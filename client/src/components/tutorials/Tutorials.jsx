import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icon for search
import './Tutorials.css'; // Importing CSS for styles

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTutorials, setFilteredTutorials] = useState([]);

    useEffect(() => {
        // Example: Fetching data from an API endpoint or using mock data
        fetch(`http://localhost:4000/exam-api/tutorials`) // Replace with your actual API endpoint
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
        <div className="tutorials-container-tutorials">
            <div className="search-container-tutorials">
                <form onSubmit={handleSearch} className="search-form-tutorials">
                    <div className="search-icon-container-tutorials">
                        <FaSearch className="search-icon-tutorials" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Tutorials"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input-tutorials"
                    />
                    <button type="submit" className="search-button-tutorials">Search</button>
                </form>
            </div>
            {filteredTutorials.length === 0 && searchTerm && (
                <p className="no-results-tutorials">No tutorials found.</p>
            )}
            <div className="tutorials-list-tutorials">
                {filteredTutorials.map((tutorial, index) => (
                    <div key={index} className="tutorial-item-tutorials">
                        <h3 className="tutorial-title-tutorials">{tutorial.title}</h3>
                        <p className="tutorial-description-tutorials">{tutorial.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
