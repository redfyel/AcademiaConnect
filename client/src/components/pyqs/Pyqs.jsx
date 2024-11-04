import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Pyqs.css';

const romanize = (num) => {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' },
    ];

    return romanNumerals.reduce((acc, { value, numeral }) => {
        while (num >= value) {
            acc += numeral;
            num -= value;
        }
        return acc;
    }, '');
};

const Pyqs = () => {
    const [pyqsList, setPyqsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPyqs, setFilteredPyqs] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility

    useEffect(() => {
        async function fetchPyqs() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/exam-api/pyqs`);
                const data = await res.json();
                if (res.ok) {
                    setPyqsList(data);
                    setFilteredPyqs(data);
                } else {
                    setPyqsList([]);
                    setFilteredPyqs([]);
                }
            } catch (error) {
                console.error('Error fetching PYQs:', error);
            }
        }
        fetchPyqs();
    }, []);

    const filterPyqs = () => {
        let filtered = pyqsList.filter(item => {
            const matchesSearch = item.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSemester = selectedSemester === 'All' || item.semno === selectedSemester;
            return matchesSearch && matchesSemester;
        });

        filtered = filtered.sort((a, b) => a.subjectName.localeCompare(b.subjectName));

        const uniqueFiltered = filtered.reduce((acc, item) => {
            const subjectName = item.subjectName;

            if (!acc[subjectName]) {
                acc[subjectName] = { links: new Set(), count: 0 };
            }

            item.pyqs.forEach(link => {
                if (!acc[subjectName].links.has(link)) {
                    acc[subjectName].links.add(link);
                }
            });

            return acc;
        }, {});

        return uniqueFiltered;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = filterPyqs();
        setFilteredPyqs(filtered);
    };

    const openPyqs = (url) => {
        window.open(url, '_blank');
    };

    const groupedPyqs = filterPyqs();

    const toggleMenu = () => setMenuVisible(!menuVisible); // Toggle menu visibility

    return (
        <div className="pyqs-container">
            <div className="pyqs-header">
                <h1 className="pyqs-heading">Previous Years' Examination Papers</h1>
                {/* Hamburger Icon */}
                <button className="pyqs-hamburger-icon" onClick={toggleMenu}>
                    &#9776; {/* Unicode for hamburger icon */}
                </button>
            </div>

            {/* Dropdown Menu */}
            {menuVisible && (
                <div className="pyqs-menu">
                    <Link to="/syllabus">Syllabus</Link>
                    <Link to="/tutorials">Tutorials</Link>
                    <Link to="/time-table">Timetable</Link>
                </div>
            )}

            {/* Search and Filters */}
            <div className="pyqs-filter-container">
                <form onSubmit={handleSearch} className="pyqs-search-form">
                    <div className="pyqs-search-icon-container">
                        <FaSearch className="pyqs-search-icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search PYQs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pyqs-search-input"
                    />
                    <button type="submit" className="pyqs-search-button">Search</button>
                </form>

                <select 
                    onChange={(e) => setSelectedSemester(e.target.value)} 
                    value={selectedSemester} 
                    className="pyqs-semester-select"
                >
                    <option value="All">All Semesters</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={String(sem)}>Semester {sem}</option>
                    ))}
                </select>
            </div>

            {/* Display of PYQs */}
            {Object.keys(groupedPyqs).length === 0 && searchTerm && (
                <p className="pyqs-no-results">No PYQs found.</p>
            )}

            <div className="pyqs-list">
                {Object.keys(groupedPyqs).map((subject) => {
                    return Array.from(groupedPyqs[subject].links).map((link, idx) => (
                        <div key={`${subject}-${link}`} className="pyqs-item" onClick={() => openPyqs(link)}>
                            <div className="pyqs-card">
                                <h3 className="pyqs-title">
                                    {subject} {romanize(idx + 1)}
                                </h3>
                                <button className="view-btn">View Paper</button>
                            </div>
                        </div>
                    ));
                })}
            </div>
        </div>
    );
};

export default Pyqs;
