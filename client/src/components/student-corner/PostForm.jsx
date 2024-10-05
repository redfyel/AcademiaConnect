import React, { useState } from 'react';
import './PostForm.css'; 

const PostForm = ({ onPostSubmit }) => {
    const [type, setType] = useState('Doubt');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPostSubmit({ type, description, username });
        setDescription(''); // Clear the input after submission
        setUsername(''); // Clear the username after submission
    };

    return (
        <div className="post-form">
           <h2 style={{ color: '#172d66' }}>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Type:
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Doubt">Doubt</option>
                            <option value="Complaint">Complaint</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default PostForm;
