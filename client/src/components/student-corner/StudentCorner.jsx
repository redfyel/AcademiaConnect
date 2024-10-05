import React, { useState } from 'react';
import Lottie from 'lottie-react';
import studentAnimation from '../../assets/animations/student'; // replace with the correct path to the Lottie animation JSON file
import './StudentCorner.css'; // Include your CSS for styling
import PostForm from './PostForm';
import PostList from './PostList';

const StudentCorner = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('Doubt');

    const handlePostSubmit = (post) => {
        setPosts([...posts, post]); 
    };

    return (
        <div className="student-corner">
            <div className="student-corner-header">
                <div className="student-corner-text">
                    <h1>Student Corner</h1>
                    <p className="unlocking-text">Unlocking potential, one student at a time</p>
                </div>
                <div className="student-corner-animation">
                    <Lottie animationData={studentAnimation} />
                </div>
            </div>

            {/* Static Community Cards */}
            <div className="community-cards">
                <div
                    className="community-card"
                    style={{
                        backgroundImage: `url(https://img.freepik.com/free-vector/college-students-sitting-bench-illustration-university-girls-boys-with-bags-laptop_33099-812.jpg?w=996&t=st=1727177936~exp=1727178536~hmac=a166ac95f4a1c71da7dcd0c6095e11c845856157698ca97ce982677aae0ce0c7)`
                    }}
                >
                    <div className="community-info">
                        <h2>CSE - First Year</h2>
                        <p>Join this vibrant community to collaborate and share knowledge.</p>
                        <button type="button" className="join-button btn" data-toggle="modal" data-target="#exampleModal">
                            Join Us
                        </button>
                    </div>
                </div>
                <div
                    className="community-card"
                    style={{
                        backgroundImage: `url(https://img.freepik.com/free-vector/college-students-sitting-bench-illustration-university-girls-boys-with-bags-laptop_33099-812.jpg?w=996&t=st=1727177936~exp=1727178536~hmac=a166ac95f4a1c71da7dcd0c6095e11c845856157698ca97ce982677aae0ce0c7)`
                    }}
                >
                    <div className="community-info">
                        <h2>CSE - Second Year</h2>
                        <p>Join this vibrant community to collaborate and share knowledge.</p>
                        <button type="button" className="join-button btn" data-toggle="modal" data-target="#exampleModal">
                            Join Us
                        </button>
                    </div>
                </div>
                <div
                    className="community-card"
                    style={{
                        backgroundImage: `url(https://img.freepik.com/free-vector/college-students-sitting-bench-illustration-university-girls-boys-with-bags-laptop_33099-812.jpg?w=996&t=st=1727177936~exp=1727178536~hmac=a166ac95f4a1c71da7dcd0c6095e11c845856157698ca97ce982677aae0ce0c7)`
                    }}
                >
                    <div className="community-info">
                        <h2>CSE - Third Year</h2>
                        <p>Join this vibrant community to collaborate and share knowledge.</p>
                        <button type="button" className="join-button btn" data-toggle="modal" data-target="#exampleModal">
                            Join Us
                        </button>
                    </div>
                </div>
                <div
                    className="community-card"
                    style={{
                        backgroundImage: `url(https://img.freepik.com/free-vector/college-students-sitting-bench-illustration-university-girls-boys-with-bags-laptop_33099-812.jpg?w=996&t=st=1727177936~exp=1727178536~hmac=a166ac95f4a1c71da7dcd0c6095e11c845856157698ca97ce982677aae0ce0c7)`
                    }}
                >
                    <div className="community-info">
                        <h2>CSE - Fourth Year</h2>
                        <p>Join this vibrant community to collaborate and share knowledge.</p>
                        <button type="button" className="join-button btn" data-toggle="modal" data-target="#exampleModal">
                            Join Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for joining community */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Thanks for joining
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab buttons for navigating between sections */}
            <div className="tab-row">
                <button 
                    className={`tab-button ${activeTab === 'Doubt' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('Doubt')}
                >
                    Doubts
                </button>
                <button 
                    className={`tab-button ${activeTab === 'Complaint' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('Complaint')}
                >
                    Complaints
                </button>
                <button 
                    className={`tab-button ${activeTab === 'Post' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('Post')}
                >
                    Write a Post
                </button>
            </div>

            {/* Conditionally render content based on activeTab */}
            <div className="tab-content">
                {activeTab === 'Post' && <PostForm onPostSubmit={handlePostSubmit} />}
                {activeTab === 'Doubt' && (
                    <div>
                        <h3>Doubts Section</h3>
                        <PostList posts={posts} filter="Doubt" />
                    </div>
                )}
                {activeTab === 'Complaint' && (
                    <div>
                        <h3>Complaints Section</h3>
                        <PostList posts={posts} filter="Complaint" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCorner;
