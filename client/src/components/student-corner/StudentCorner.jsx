import React, { useEffect, useState, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/student.json';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../user-profile/ProfileImage';
import './StudentCorner.css';

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
            fetchPosts();
        }
    }, [userLoginStatus, activeTab]);

    const fetchPosts = async () => {
        try {
            const endpoint = activeTab === 'myPosts' 
                ? `http://localhost:4000/student-corner-api/post?username=${currentUser.username}`
                : 'http://localhost:4000/student-corner-api/post';

            const response = await fetch(endpoint);
            const data = await response.json();
            setPosts(data.filter(post => activeTab === 'myPosts' ? post.username === currentUser.username : post.type === activeTab));
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

    return (
        <div className="student-corner">
            <div className="text-section">
                <h2>Student Corner</h2>
                <p>Share your thoughts, clarify your doubts, and make your voice heard!</p>
                <button className="hamburger-button" onClick={() => setShowMenu(!showMenu)}>☰</button>
                {showMenu && (
                    <div className="hamburger-menu">
                        <button onClick={() => setActiveTab('doubts')}>Doubts</button>
                        <button onClick={() => setActiveTab('complaints')}>Complaints</button>
                        <button onClick={() => setActiveTab('myPosts')}>My Posts</button>
                    </div>
                )}
            </div>

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
            </div>

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

            <div className="posts-container">
                {posts.map(post => (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                    />
                ))}
            </div>
        </div>
    );
};

const PostCard = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');

    const toggleExpand = () => {
        if (!isExpanded) fetchReplies(); // Fetch replies only when expanding
        setIsExpanded((prev) => !prev);
    };

    const fetchReplies = async () => {
        try {
            console.log(`Fetching replies for post ID: ${post._id}`);
            const response = await fetch(`http://localhost:4000/student-corner-api/reply/${post._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch replies');
            }
            const data = await response.json();
            console.log('Replies received:', data); // Log the data received
            setReplies(data);
        } catch (err) {
            console.error('Error fetching replies:', err);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: post._id, content: newReply }),
            });

            if (response.ok) {
                setNewReply('');
                fetchReplies();
            }
        } catch (err) {
            console.error('Error posting reply:', err);
        }
    };

    return (
        <div className={`post-cards ${isExpanded ? 'expanded' : ''}`}>
            <div className="post-header">
                <ProfileImage email={post.email || 'default@domain.com'} />
                <div className="post-user-info">
                    <p className="post-author">{post.username}</p>
                </div>
                <div className="post-time">
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <div className="post-content-overlay" onClick={toggleExpand}>
                <h3>{post.content}</h3>
                <div className="post-actions">
                    <button className="like-button">👍 {post.likes || 0}</button>
                    <button className="comments-button" onClick={toggleExpand}>
                        {isExpanded ? "Hide Comments" : "Show Comments"}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="replies-section">
                    <h4>Replies</h4>
                    {replies.length === 0 ? (
                        <p>No replies yet. Be the first to reply!</p>
                    ) : (
                        replies.map(reply => (
                            <div key={reply._id} className="reply">
                                <p className="reply-username">{reply.username}</p>
                                <p className="reply-content">{reply.content}</p>
                            </div>
                        ))
                    )}
                    <form onSubmit={handleReplySubmit} className="reply-form">
                        <input
                            type="text"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="Write a reply..."
                            required
                        />
                        <button type="submit" className="submit-reply-button">Reply</button>
                    </form>
                </div>
            )}
        </div>
    );
};


export default StudentCorner;
