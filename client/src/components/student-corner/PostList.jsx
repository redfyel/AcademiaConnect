import React, { useState } from 'react';
import './PostList.css'; // Make sure to create this CSS file
import PostItem from './PostItem';

const PostList = ({ posts, filter }) => {
    const filteredPosts = posts.filter(post => post.type === filter);

    const [threadedPosts, setThreadedPosts] = useState(filteredPosts.map(post => ({ ...post, replies: [] })));

    const handleReply = (index, reply) => {
        const newPosts = [...threadedPosts];
        newPosts[index].replies.push(reply); // Add reply to the post
        setThreadedPosts(newPosts);
    };

    return (
        <div className="post-list">
            <h2>{filter} Posts</h2>
            {threadedPosts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {threadedPosts.map((post, index) => (
                        <li key={index} className="post-item">
                            <PostItem post={post} onReply={(reply) => handleReply(index, reply)} />
                            {post.replies.length > 0 && (
                                <div className="replies">
                                    {post.replies.map((reply, replyIndex) => (
                                        <div key={replyIndex} className="reply">
                                            <strong>Reply:</strong> {reply}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostList;
