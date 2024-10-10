import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icon for search
import './Syllabus.css'; // Importing CSS for styles

const Syllabus = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSyllabus, setFilteredSyllabus] = useState([]);

    useEffect(() => {
        async function fetchSyllabus() {
            try {
                // Fetch the syllabus data from the backend
                let res = await fetch(`http://localhost:4000/exam-api/syllabus`);
                const data = await res.json();
                
                if (res.ok) {
                    // Remove duplicates based on subjectName
                    const uniqueData = data.reduce((acc, current) => {
                        const x = acc.find(item => item.subjectName === current.subjectName);
                        return !x ? acc.concat([current]) : acc;
                    }, []);

                    // Sort syllabus by subject name alphabetically
                    const sortedData = uniqueData.sort((a, b) =>
                        a.subjectName.localeCompare(b.subjectName)
                    );

                    setSyllabusList(sortedData); // Store the sorted and filtered syllabus data
                    setFilteredSyllabus(sortedData); // Initially display sorted and filtered syllabuses
                } else {
                    console.error('Error fetching syllabus:', data.message);
                    setSyllabusList([]);
                    setFilteredSyllabus([]);
                }
            } catch (error) {
                console.error('Error fetching syllabus:', error);
            }
        }

        fetchSyllabus(); // Call the function
    }, []); // Fetch syllabus on component mount

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = syllabusList.filter(item =>
            item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSyllabus(filtered);
    };

    const openSyllabus = (url) => {
        window.open(url, '_blank'); // Open the syllabus PDF in a new tab
    };

    return (
        <div className="syllabus-container">
            <div className="syllabus-search-container">
                <form onSubmit={handleSearch} className="syllabus-search-form">
                    <div className="syllabus-search-icon-container">
                        <FaSearch className="syllabus-search-icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Syllabus"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="syllabus-search-input"
                    />
                    <button type="submit" className="syllabus-search-button">Search</button>
                </form>
            </div>
            {filteredSyllabus.length === 0 && searchTerm && (
                <p className="syllabus-no-results">No syllabus found.</p>
            )}
            <div className="syllabus-list">
                {filteredSyllabus.map((item, index) => (
                    <div key={index} className="syllabus-item" onClick={() => openSyllabus(item.syllabus)}>
                        <h3 className="syllabus-item-title">
                            {`${item.subjectName}`}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Syllabus;
