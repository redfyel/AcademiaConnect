import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './Syllabus.css';

const Syllabus = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [filteredSyllabus, setFilteredSyllabus] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchSyllabus = async () => {
            try {
                const res = await fetch('http://localhost:4000/exam-api/syllabus');
                if (!res.ok) throw new Error('Failed to fetch syllabus');
                const data = await res.json();
                const uniqueData = Array.from(new Map(data.map(item => [item.subjectName, item])).values());
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

    const openSyllabus = (url) => window.open(url, '_blank');

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="syllabus-container">
            <div className="syllabus-header">Syllabus Hub</div>

            {/* Hamburger Icon */}
            <button className="syllabus-hamburger-icon" onClick={toggleMenu}>
                &#9776; {/* Unicode for hamburger icon */}
            </button>

            {/* Dropdown Menu */}
            {menuVisible && (
                <div className="syllabus-menu">
                    <Link to="/tutorials">Tutorials</Link>
                    <Link to="/pyqs">Past Papers</Link>
                    <Link to="/time-table">Timetable</Link>
                </div>
            )}

            <div className="syllabus-filter-container">
                <div className="syllabus-search-form">
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
                </div>

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
