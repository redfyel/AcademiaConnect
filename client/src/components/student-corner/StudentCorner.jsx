import React, { useEffect, useState, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/student.json';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../user-profile/ProfileImage';
import Carousel from 'react-bootstrap/Carousel';
import WishBot from './WishBot';
import './StudentCorner.css';
import axios from 'axios'; // Ensure axios is imported

const StudentCorner = () => {
    const { userLoginStatus, currentUser } = useContext(userLoginContext);
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('doubts');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userLoginStatus) {
            fetchPosts(); // Fetch both posts and wishes when logged in
        }
    }, [userLoginStatus, activeTab]);

    const fetchPosts = async () => {
        try {
            const endpoint = `http://localhost:4000/student-corner-api/post`;

            const response = await fetch(endpoint);
            const data = await response.json();

            const filteredPosts = data.filter(post => 
                activeTab === 'myPosts' ? post.username === currentUser.username :
                post.type === activeTab || post.type === 'wish'
            );

            setPosts(filteredPosts);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!userLoginStatus) {
            setError('You must be logged in to post.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/student-corner-api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: postContent, type: activeTab, username: currentUser.username }),
            });

            if (response.ok) {
                setPostContent('');
                fetchPosts();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error('Error posting:', err);
            setError('An error occurred while posting.');
        }
    };
    const handlePostSubmits = async (e) => {
        
        if (!userLoginStatus) {
            setError('You must be logged in to post.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/student-corner-api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: postContent, type: activeTab, username: currentUser.username }),
            });

            if (response.ok) {
                setPostContent('');
                fetchPosts();
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error('Error posting:', err);
            setError('An error occurred while posting.');
        }
    };
    return (
        <div className="student-corner">
            <div className="text-section">
                <h2>Student Corner</h2>
                <p>Share your thoughts, clarify your doubts, and make your voice heard!</p>
                <button className="hamburger-button" onClick={() => setShowMenu(!showMenu)}>
                    ☰
                </button>
                {showMenu && (
                    <div className="hamburger-menu">
                        <button onClick={() => { setActiveTab('doubts'); setShowMenu(false); }}>Doubts</button>
                        <button onClick={() => { setActiveTab('complaints'); setShowMenu(false); }}>Complaints</button>
                        <button onClick={() => { setActiveTab('myPosts'); setShowMenu(false); }}>My Posts</button>
                        <button onClick={() => { setActiveTab('topPosts'); setShowMenu(false); }}>Top Posts</button>
                    </div>
                )}
            </div>

            {/* Display Wishes in Carousel */}
            <Carousel>
                {posts.filter(post => post.type === 'wish').length > 0 ? (
                    posts.filter(post => post.type === 'wish').map(wish => (
                        <Carousel.Item key={wish._id}>
                            <div className="carousel-content">
                                <h5>{wish.username}</h5>
                                <p>{wish.content}</p>
                            </div>
                        </Carousel.Item>
                    ))
                ) : (
                    <Carousel.Item>
                        <div className="carousel-content">
                            <p>No birthday wishes available.</p>
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>

            {/* Tab Bar for Navigation */}
            <div className="tab-bar">
                <button
                    className={`tab-button ${activeTab === 'doubts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('doubts')}
                >
                    Doubts
                </button>
                <button
                    className={`tab-button ${activeTab === 'complaints' ? 'active' : ''}`}
                    onClick={() => setActiveTab('complaints')}
                >
                    Complaints
                </button>
                <button
                    className={`tab-button ${activeTab === 'myPosts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('myPosts')}
                >
                    My Posts
                </button>
                <button className={`tab-button ${activeTab === 'topPosts' ? 'active' : ''}`} onClick={() => setActiveTab('topPosts')}>
                    Top Posts
                </button>
            </div>

            {/* Form for Posting */}
            <div className="form-container">
                {!userLoginStatus ? (
                    <button className="login-button" onClick={() => navigate('/auth')}>
                        Register/Login to Post
                    </button>
                ) : (
                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder={`Share your ${activeTab === 'doubts' ? 'doubt' : 'complaint'}...`}
                            rows="4"
                            required
                        />
                        <button type="submit" className="submit-button">Post</button>
                    </form>
                )}
                {error && <p className="error-text">{error}</p>}
            </div>

            {/* Display Posts */}
            <div className="posts-container">
                {posts.filter(post => post.type !== 'wish').map(post => (
                    <PostCard key={post._id} post={post} loggedInUsername={currentUser.username} />
                ))}
            </div>

            <WishBot onWishSubmit={handlePostSubmits} />
        </div>
    );
};

const PostCard = ({ post, loggedInUsername }) => {
    // Rest of the PostCard component remains the same
    return (
        <div className="post-card">
            {/* Render the post card content */}
            <div className="post-header">
                <ProfileImage email={post.email || 'default@domain.com'} />
                <div className="post-user-info">
                    <p className="post-author">{post.username}</p>
                </div>
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
        </div>
    );
};

export default StudentCorner;
