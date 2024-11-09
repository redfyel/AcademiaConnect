import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, loggedInUsername }) => {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replies, setReplies] = useState({});
    const [newReply, setNewReply] = useState({});

    // Extract file name from imageUrl
    const fileName = post.imageUrl ? post.imageUrl.split('/').pop() : null;

    // Check file extension
    const getFileExtension = (fileName) => {
        return fileName ? fileName.split('.').pop().toLowerCase() : '';
    };

    const fileExtension = getFileExtension(fileName);
    const fileUrl = fileName ? `http://localhost:4000/uploads/${fileName}` : ''; // URL pointing to the static server

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
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/student-corner-api/post/${post._id}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment, username: loggedInUsername }),
            });

            if (response.ok) {
                setNewComment('');
                fetchComments();
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
                setNewReply(prevState => ({ ...prevState, [commentId]: '' }));
                fetchComments();
            }
        } catch (err) {
            console.error('Error posting reply:', err);
        }
    };

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    const formatTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={`post-card ${commentsVisible ? 'expanded' : ''}`}>
            <div className="post-header">
                <p className="post-author">{post.username}</p>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
                {post.imageUrl && (
                    <div className="post-media">
                        {fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif' ? (
                            <img src={fileUrl} alt="Uploaded" />
                        ) : fileExtension === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg' ? (
                            <audio controls>
                                <source src={fileUrl} type={`audio/${fileExtension}`} />
                                Your browser does not support the audio element.
                            </audio>
                        ) : fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mkv' ? (
                            <video controls>
                                <source src={fileUrl} type={`video/${fileExtension}`} />
                                Your browser does not support the video element.
                            </video>
                        ) : (
                            <a href={fileUrl} download>Download file</a>
                        )}
                    </div>
                )}
            </div>

            <div className="post-actions">
                <button className="like-button">👍 {post.likes || 0}</button>
                <button className="comments-button" onClick={toggleCommentsVisibility}>
                    {commentsVisible ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>

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
                        {comments.map(comment => (
                            <div className="comment-card" key={comment._id}>
                                <div className="comment-author">{comment.username}</div>
                                <p>{comment.content}</p>

                                <form onSubmit={(e) => handleReplySubmit(comment._id, e)} className="reply-form">
                                    <input
                                        type="text"
                                        value={newReply[comment._id] || ''}
                                        onChange={(e) => setNewReply(prevState => ({
                                            ...prevState,
                                            [comment._id]: e.target.value
                                        }))}
                                        placeholder="Write a reply..."
                                    />
                                    <button type="submit">Reply</button>
                                </form>

                                {comment.replies && (
                                    <div className="replies-section">
                                        {comment.replies.map(reply => (
                                            <div className="reply" key={reply._id}>
                                                <div className="reply-author">{reply.username}</div>
                                                <p>{reply.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
