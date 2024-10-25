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
            const response = await fetch('http://localhost:4000/student-corner-api/post');
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

    const handleReplySubmit = async (postId, replyContent, setReplyContent) => {
        if (!userLoginStatus) {
            setError('You must be logged in to reply.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post/${postId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: replyContent, username: currentUser.username }),
            });

            if (response.ok) {
                setReplyContent(''); // Reset reply for this post
                fetchPosts(); // Reload posts after a successful reply
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error('Error replying:', err);
            setError('An error occurred while replying.');
        }
    };

    const filteredPosts = posts.filter(post => post.type === activeTab);

    return (
        <div className="student-corner">
            <div className="animation-container">
                <div className="text-section">
                    <h2>Student Corner</h2>
                    <p>Share your thoughts, clarify your doubts, and make your voice heard!</p>
                </div>
                {/* <Lottie animationData={animationData} loop={true} autoplay /> */}
            </div>

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
                {filteredPosts.map(post => (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                        handleReplySubmit={handleReplySubmit} 
                    />
                ))}
            </div>
        </div>
    );
};

const PostCard = ({ post, handleReplySubmit }) => {
    const [replyContent, setReplyContent] = useState(''); // Local reply content for this post
    const [isExpanded, setIsExpanded] = useState(false); // State to toggle post expansion
    const [likes, setLikes] = useState(post.likes || 0); // Local state for likes

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const handleLike = () => {
        setLikes(likes + 1); // Increase likes by 1
        // You might want to also send this update to your server
    };

    return (
        <div className={`post-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="post-content-overlay" onClick={toggleExpand}>
                <h3>{post.content}</h3>
                <p className="post-author">Posted by: {post.username}</p>
                <p className="post-likes">Likes: {likes}</p>
            </div>

            {isExpanded && (
                <>
                    <div className="thread-section">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleReplySubmit(post._id, replyContent, setReplyContent);
                        }}>
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

                    <button onClick={handleLike} className="like-button">Like</button>
                </>
            )}
        </div>
    );
};


export default StudentCorner;
