import React, { useEffect, useState, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/student.json';
import { useNavigate } from 'react-router-dom'; 
import './StudentCorner.css'; 
const StudentCorner = () => {
    const { userLoginStatus, currentUser } = useContext(userLoginContext);
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('doubts'); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if (userLoginStatus) {
            fetchPosts();
        }
    }, [userLoginStatus]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post`);
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!userLoginStatus) {
            setError('You must be logged in to post. Please register or log in.');
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

    const handleReplySubmit = async (postId, e) => {
        e.preventDefault();
        if (!userLoginStatus) {
            setError('You must be logged in to reply. Please register or log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post/${postId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ replyContent, username: currentUser.username }),
            });

            if (response.ok) {
                setReplyContent(''); 
                fetchPosts(); 
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error('Error replying:', err);
            setError('An error occurred while replying.');
        }
    };

    // Filter posts based on the active tab (doubts or complaints)
    const filteredPosts = posts.filter(post => post.type === activeTab);

    return (
        <div className="student-corner">
            <div className="animation-container">
                <div className="text-section">
                    <h2>Student Corner</h2>
                    <p>Welcome to the Student Corner! Here, you can share your doubts and complaints, and engage with your peers.</p>
                </div>
                <Lottie animationData={animationData} loop={true} className=""autoplay />
            </div>

            <div className="tab-bar">
                <button className={`tab-button ${activeTab === 'doubts' ? 'active' : ''}`} onClick={() => setActiveTab('doubts')}>Doubts</button>
                <button className={`tab-button ${activeTab === 'complaints' ? 'active' : ''}`} onClick={() => setActiveTab('complaints')}>Complaints</button>
            </div>

            <div className="form-container">
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <div className="posts-container">
                {!userLoginStatus ? (
                    <div>
                        <p>
                            Please <a href="/register" onClick={(e) => {
                                e.preventDefault(); 
                                navigate('/auth'); 
                            }}>register</a> or log in to post.
                        </p>
                    </div>
                ) : (
                    filteredPosts.map(post => (
                        <div key={post._id} className="post-card">
                            <div className="post-content-overlay">
                                <h3>{post.content}</h3>
                                <p className="post-author">Posted by: {post.username}</p>
                            </div>
                            <div className="thread-section">
                                <form onSubmit={(e) => handleReplySubmit(post._id, e)}>
                                    <input
                                        type="text"
                                        className="reply-input"
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Reply..."
                                        required
                                    />
                                    <button type="submit" className="reply-button">Reply</button>
                                </form>
                            </div>
                            <div className="replies-container">
                                {post.replies && post.replies.map((reply, index) => (
                                    <div key={index} className="reply-card">
                                        <p className="reply-content">{reply.content}</p>
                                        <p className="reply-author">Replied by: {reply.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentCorner;
