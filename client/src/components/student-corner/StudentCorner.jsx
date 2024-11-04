import React, { useEffect, useState, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
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
    const [celebratedPosts, setCelebratedPosts] = useState({});
    const navigate = useNavigate();
   
    useEffect(() => {
        if (userLoginStatus) {
            fetchPosts(); // Fetch posts and wishes when logged in
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
    const handleWishSubmit = async (wishContent) => {
        if (!userLoginStatus) {
            setError('You must be logged in to post.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/student-corner-api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: wishContent, type: 'wish', username: currentUser.username }),
            });

            if (response.ok) {
                fetchPosts(); // Refresh posts to display new wish
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            console.error('Error posting wish:', err);
            setError('An error occurred while posting the wish.');
        }
    };
    // Toggle the 'Celebrate' button status
    const toggleCelebrate = (postId) => {
        setCelebratedPosts(prevState => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
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
            {/* Display Wishes in Carousel */}
<div className="wish-carousel-container">
    <Carousel interval={5000} className="wish-carousel" indicators={false} controls={true} fade={true}>
        {posts.filter(post => post.type === 'wish').length > 0 ? (
            posts.filter(post => post.type === 'wish').map(wish => (
                <Carousel.Item key={wish._id}>
                    <div className="carousel-content">
                        <div className="wish-card">
                            <ProfileImage email={wish.email || 'default@domain.com'} />
                            <div className="wish-details">
                                <h5 className="wish-username">{wish.username}</h5>
                                <p className="wish-content">{wish.content}</p>
                                <div className="wish-actions">
                                    <button className="like-button">
                                        <span role="img" aria-label="like">👍</span> Like
                                    </button>
                                    <button
                                        className={`reaction-button ${celebratedPosts[wish._id] ? 'celebrated' : ''}`}
                                        onClick={() => toggleCelebrate(wish._id)}
                                    >
                                        <span role="img" aria-label="celebrate">🎉</span> {celebratedPosts[wish._id] ? 'Celebrated' : 'Celebrate'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            ))
        ) : (
            <Carousel.Item>
                <div className="carousel-content no-wishes">
                    <p>No birthday wishes available.</p>
                </div>
            </Carousel.Item>
        )}
    </Carousel>
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

            <WishBot onWishSubmit={handleWishSubmit} />
        </div>
    );
};


const PostCard = ({ post, loggedInUsername }) => {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replies, setReplies] = useState({});
    const [newReply, setNewReply] = useState({});

    // Fetch comments when the component mounts or when commentsVisible changes
    useEffect(() => {
        if (commentsVisible) {
            fetchComments();
        }
    }, [commentsVisible]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post/${post._id}/replies`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error('Failed to fetch comments');
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Make sure this is called on the event object
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post/${post._id}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment, username: loggedInUsername }),
            });
    
            if (response.ok) {
                setNewComment(''); // Reset the comment input
                fetchComments(); // Reload comments after submission
            } else {
                console.error('Failed to submit comment:', response.status);
            }
        } catch (err) {
            console.error('Error posting comment:', err);
        }
    };
    
    const handleReplySubmit = async (commentId, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/comment/${commentId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newReply[commentId], username: loggedInUsername }),
            });

            if (response.ok) {
                setNewReply(prevState => ({ ...prevState, [commentId]: '' })); // Reset the specific reply
                fetchComments(); // Reload comments after submission
            }
        } catch (err) {
            console.error('Error posting reply:', err);
        }
    };

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    // Function to format time for a user-friendly display
    const formatTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={`post-card ${commentsVisible ? 'expanded' : ''}`}>
            <div className="post-header">
                <ProfileImage email={post.email || 'default@domain.com'} />
                <div className="post-user-info">
                    <p className="post-author">{post.username}</p>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
                <div className="post-actions">
                    <button className="like-button">👍 {post.likes || 0}</button>
                    <button className="comments-button" onClick={toggleCommentsVisibility}>
                        {commentsVisible ? 'Hide Comments' : 'Show Comments'}
                    </button>
                </div>
            </div>
{/* Comments Section */}
{commentsVisible && (
    <div className="comments-section">
        <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                required
            />
            <button type="submit" className="submit-comment-button">Comment</button>
        </form>

        <div className="comments-list">
            {comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
                comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <ProfileImage email={comment.email || 'default@domain.com'} />
                        <div className="comment-content">
                           
                                <p className="comment-author">{comment.username}</p>
                                <p className="comment-date">{formatTime(comment.createdAt)}</p>
                           
                            <p className="comment-body">{comment.content}</p>

                            {/* Replies to comments */}
                            <button className="reply-button" onClick={() => setReplies(prev => ({ ...prev, [comment._id]: !prev[comment._id] }))}>
                                {replies[comment._id] ? 'Hide Replies' : 'Show Replies'}
                            </button>

                            {replies[comment._id] && (
                                <div className="replies-section">
                                    <form onSubmit={(e) => handleReplySubmit(comment._id, e)}>
                                        <input
                                            type="text"
                                            value={newReply[comment._id] || ''}
                                            onChange={(e) => setNewReply(prev => ({ ...prev, [comment._id]: e.target.value }))}
                                            placeholder="Write a reply..."
                                            required
                                        />
                                        <button type="submit" className="submit-reply-button">Reply</button>
                                    </form>
                                    <div className="replies-list">
                                        {comment.replies && comment.replies.length > 0 ? (
                                            comment.replies.map(reply => (
                                                <div key={reply._id} className="reply">
                                                    <ProfileImage email={reply.email || 'default@domain.com'} />
                                                    <div className="reply-content">
                                                        <div className="reply-header">
                                                            <p className="reply-author">{reply.username}</p>
                                                            <p className="reply-date">{formatTime(reply.createdAt)}</p>
                                                        </div>
                                                        <p className="reply-body">{reply.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-replies">No replies yet.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
)}

        </div>
    );
};

export default StudentCorner; 