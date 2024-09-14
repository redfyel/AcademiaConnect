import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentCorner.css';

const StudentCorner = () => {
    const [selectedTab, setSelectedTab] = useState('doubts');
    const [data, setData] = useState([]);  // Initialize as an empty array
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('doubt');
    const [issue, setIssue] = useState('');

    // Function to fetch data based on the selected tab
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`/api/${selectedTab}`);
    //         setData(Array.isArray(response.data) ? response.data : []);
    //     } catch (error) {
    //         console.error('Error fetching data', error);
    //         setData([]);  // Set as empty array on error
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [selectedTab]);

    const handleSubmit = async () => {
        try {
            const postData = { title, type, issue };
            await axios.post('/api/posts', postData);
            setModalOpen(false);
            fetchData();  // Refetch the data after submission
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    return (
        <div className="student-corner-container">
            <div className="tab-buttons">
                <button className={selectedTab === 'doubts' ? 'active' : ''} onClick={() => setSelectedTab('doubts')}>Doubts</button>
                <button className={selectedTab === 'complaints' ? 'active' : ''} onClick={() => setSelectedTab('complaints')}>Complaints</button>
                <button className="post-button" onClick={() => setModalOpen(true)}>Post</button>
            </div>
            <div className="content-area">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="item">
                            <h3>{item.title}</h3>
                            <p>{item.issue}</p>
                        </div>
                    ))
                ) : (
                    <p>No {selectedTab} available.</p>
                )}
            </div>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="doubt">Doubt</option>
                            <option value="complaint">Complaint</option>
                        </select>
                        <textarea
                            placeholder="Describe your issue..."
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSubmit}>Submit</button>
                            <button onClick={() => setModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCorner;
