import React, { useState } from 'react';
import './PostItem.css'; // Make sure to create this CSS file

const PostItem = ({ post, onReply }) => {
    const [reply, setReply] = useState('');

    const handleReplySubmit = (e) => {
        e.preventDefault();
        onReply(reply); // Pass reply back to parent
        setReply(''); // Clear the reply input
    };

    return (
        <div className="post-item">
            <div className="post-header">
                <img src={post.userPhoto} alt={`${post.username}'s avatar`} className="user-photo" />
                <strong>{post.username}</strong>
                <span>{post.type}</span>
            </div>
            <p>{post.description}</p>
            <form onSubmit={handleReplySubmit}>
                <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write a reply..."
                    required
                />
                <button type="submit" className="btn">Reply</button>
            </form>
        </div>
    );
};

export default PostItem;
