import React, { useEffect, useState, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../user-profile/ProfileImage';
import Carousel from 'react-bootstrap/Carousel';
import WishBot from './WishBot';
import './StudentCorner.css';
import PostCard from './PostCard';
import axios from 'axios';

const StudentCorner = () => {
    const { userLoginStatus, currentUser } = useContext(userLoginContext);
    const [posts, setPosts] = useState([]);
    const [wishes, setWishes] = useState([]); // Separate state for birthday wishes
    const [postContent, setPostContent] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('doubts');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState(null); // For storing selected file
    const [celebratedPosts, setCelebratedPosts] = useState({});
    const navigate = useNavigate();
    
    const toggleCelebrate = (postId) => {
        setCelebratedPosts(prevState => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    useEffect(() => {
        if (userLoginStatus) {
            fetchPosts();
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
            
            // Separate regular posts and birthday wishes
            const nonWishes = filteredPosts.filter(post => post.type !== 'wish');
            const wishesPosts = filteredPosts.filter(post => post.type === 'wish');

            setPosts(nonWishes);
            setWishes(wishesPosts); // Set wishes for carousel
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

        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('type', activeTab);
        formData.append('username', currentUser.username);
        if (selectedImageFile) {
            formData.append('image', selectedImageFile);
        }

        try {
            const response = await axios.post('http://localhost:4000/student-corner-api/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                setPostContent('');
                setSelectedImageFile(null);
                fetchPosts();
            } else {
                setError('Failed to create post.');
            }
        } catch (err) {
            setError('Error occurred while creating post.');
        }
    };

    // Handle wish submit (for birthday wishes)
    const handleWishSubmit = async (wishContent, file) => {
        if (!userLoginStatus) {
            setError('You must be logged in to submit a wish.');
            return;
        }

        const formData = new FormData();
        formData.append('content', wishContent);
        formData.append('type', 'wish');  // 'wish' type for birthday wishes
        formData.append('username', currentUser.username);
        if (file) {
            formData.append('photo', file);  // Adding the photo if available
        }

        try {
            const response = await fetch("http://localhost:4000/student-corner-api/post", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                fetchPosts();  // Refresh posts after successful wish submission
                console.log('Wish submitted successfully');
            } else {
                console.error("Failed to submit wish");
            }
        } catch (error) {
            console.error("Error submitting wish:", error);
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
                       {/* Updated Hamburger Menu with 'Wishes' option */}
<button onClick={() => { setActiveTab('doubts'); setShowMenu(false); }}>Doubts</button>
<button onClick={() => { setActiveTab('complaints'); setShowMenu(false); }}>Complaints</button>
<button onClick={() => { setActiveTab('myPosts'); setShowMenu(false); }}>My Posts</button>
<button onClick={() => { setActiveTab('topPosts'); setShowMenu(false); }}>Top Posts</button>
<button onClick={() => { setActiveTab('wish'); setShowMenu(false); }}>Wishes</button>  {/* New option for Wishes */}

                    </div>
                )}
            </div>

            <form onSubmit={handlePostSubmit}>
    <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder={`Share your ${activeTab}...`}  // Adjust placeholder based on the tab
        required
    />
    <input type="file" onChange={(e) => setSelectedImageFile(e.target.files[0])} accept="image/*" />
    <button type="submit">
        {activeTab === 'wish' ? 'Submit Wish' : 'Post'}  {/* Different button text for wishes */}
    </button>
</form>

              
            {error && <p className="error-text">{error}</p>}

            {/* Display Wishes in Carousel */}
           {/* Display Wishes in Carousel */}
           <div className="wish-carousel-container">
    <Carousel interval={5000} className="wish-carousel" indicators={false} controls={true} fade={true}>
        {wishes.length > 0 ? (
            wishes.map(wish => (
                <Carousel.Item key={wish._id}>
                    <div className="carousel-content">
                        <div className="wish-card">
                            <ProfileImage email={wish.email || 'default@domain.com'} />
                            <div className="wish-details">
                                <h5 className="wish-username">{wish.username}</h5>
                                <p className="wish-content">{wish.content}</p>

                                {/* Display image if it exists */}
                                {wish.imageUrl && (
                                    <img
                                        src={`http://localhost:4000/uploads/${wish.imageUrl.split('/').pop()}`}
                                        alt="Wish Image"
                                        className="wish-image"
                                    />
                                )}

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
            {/* Regular posts */}
            <div className="posts-container">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} loggedInUsername={currentUser.username} />
                ))}
            </div>

            <WishBot onWishSubmit={(wishContent, file) => handleWishSubmit(wishContent, file)} />
        </div>
    );
};

export default StudentCorner;
