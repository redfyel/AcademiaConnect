import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; 
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

    useEffect(() => {
        async function fetchPyqs() {
            try {
                // Fetch the PYQs data from the backend
                let res = await fetch(`http://localhost:4000/exam-api/pyqs`);
                const data = await res.json();

                if (res.ok) {
                    setPyqsList(data); 
                    setFilteredPyqs(data); 
                } else {
                    console.error('Error fetching PYQs:', data.message);
                    setPyqsList([]);
                    setFilteredPyqs([]);
                }
            } catch (error) {
                console.error('Error fetching PYQs:', error);
            }
        }

        fetchPyqs(); 
    }, []); 

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = pyqsList.filter(item =>
            item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPyqs(filtered);
    };

    const openPyqs = (url) => {
        window.open(url, '_blank'); 
    };

    
    const sortedFilteredPyqs = filteredPyqs.sort((a, b) =>
        a.subjectName.localeCompare(b.subjectName)
    );

    
    const groupedPyqs = sortedFilteredPyqs.reduce((acc, item) => {
        const subjectName = item.subjectName;

        
        if (!acc[subjectName]) {
            acc[subjectName] = { links: new Set(), count: 0 };
        }

        
        item.pyqs.forEach(link => {
            if (!acc[subjectName].links.has(link)) {
                acc[subjectName].links.add(link); 
                acc[subjectName].count += 1; 
            }
        });

        return acc;
    }, {});

    return (
        <div className="pyqs-container">
            <div className="pyqs-search-container">
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
            </div>
            {Object.keys(groupedPyqs).length === 0 && searchTerm && (
                <p className="pyqs-no-results">No PYQs found.</p>
            )}
            <div className="pyqs-list">
                {Object.keys(groupedPyqs).map((subject) => {
                    return Array.from(groupedPyqs[subject].links).map((link, idx) => (
                        <div key={`${subject}-${link}`} className="pyqs-item" onClick={() => openPyqs(link)}>
                            <h3 className="pyqs-title">
                                {subject} {romanize(idx + 1)}
                            </h3>
                        </div>
                    ));
                })}
            </div>
        </div>
    );
};

export default Pyqs;
