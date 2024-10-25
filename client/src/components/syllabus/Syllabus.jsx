import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Syllabus.css'; 

const Syllabus = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [filteredSyllabus, setFilteredSyllabus] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('All');

    useEffect(() => {
        const fetchSyllabus = async () => {
            try {
                const res = await fetch('http://localhost:4000/exam-api/syllabus');
                if (!res.ok) throw new Error('Failed to fetch syllabus');

                const data = await res.json();
                console.log("Fetched Data:", data); // Log fetched data

                // Removing duplicates based on subjectName
                const uniqueData = Array.from(new Map(data.map(item => [item.subjectName, item])).values());
                console.log("Unique Syllabus Data:", uniqueData); // Log unique data

                setSyllabusList(uniqueData);
                setFilteredSyllabus(uniqueData);
            } catch (error) {
                console.error('Error fetching syllabus:', error);
                setSyllabusList([]);
                setFilteredSyllabus([]);
            }
        };

        fetchSyllabus(); 
    }, []);

    useEffect(() => {
        const filtered = syllabusList.filter(item => {
            const matchesSemester = selectedSemester === 'All' || item.semno === selectedSemester;
            const matchesSearch = item.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSemester && matchesSearch;
        });
        setFilteredSyllabus(filtered);
    }, [selectedSemester, searchTerm, syllabusList]);

    const openSyllabus = (url) => {
        window.open(url, '_blank'); 
    };

    return (
        <div className="syllabus-container">
            <h1 className="syllabus-header">Study Plan Navigator!</h1>

            {/* Filter and Search Bar */}
            <div className="syllabus-filter-container">
                {/* Search Bar (Left) */}
                <form onSubmit={(e) => e.preventDefault()} className="syllabus-search-form">
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
                </form>

                {/* Filter Dropdown (Right) */}
                <select 
                    onChange={(e) => setSelectedSemester(e.target.value)} 
                    value={selectedSemester} 
                    className="syllabus-semester-select"
                >
                    <option value="All">All Semesters</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={String(sem)}>Semester {sem}</option>
                    ))}
                </select>
            </div>

            {/* Syllabus List */}
            {filteredSyllabus.length === 0 ? (
                <p className="syllabus-no-results">No syllabus found.</p>
            ) : (
                <div className="syllabus-list">
                    {filteredSyllabus.map((item, index) => (
                        <div key={index} className="syllabus-item" onClick={() => openSyllabus(item.syllabus)}>
                            <h3 className="syllabus-item-title">{item.subjectName}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Syllabus;
