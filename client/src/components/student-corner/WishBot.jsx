import React, { useState } from 'react';
import './WishBot.css';

const WishBot = ({ onWishSubmit }) => {
    const [wishContent, setWishContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
    const [isOpen, setIsOpen] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Display image preview
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (wishContent.trim()) {
            onWishSubmit(wishContent, selectedImage); // Pass the wish content and image to parent
            setWishContent(''); // Clear the input field after submission
            setSelectedImage(null); // Clear the selected image after submission
            setIsOpen(false); // Close the bot after submission
        }
    };

    return (
        <div className="wish-bot-container">
            {/* Show the icon only when the bot is closed */}
            {!isOpen && (
                <button className="wish-bot-icon" onClick={() => setIsOpen(true)}>
                    🎉 {/* This is the wish-related icon */}
                </button>
            )}
            {isOpen && (
                <div className="wish-bot">
                    <form className="wish-bot-form" onSubmit={handleSubmit}>
                        <textarea
                            value={wishContent}
                            onChange={(e) => setWishContent(e.target.value)}
                            placeholder="Write your birthday wish..."
                            rows="3"
                            required
                        />
                        {/* File upload input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="wish-bot-image-input"
                        />
                        {/* Display image preview if there is a selected image */}
                        {selectedImage && (
                            <div className="image-preview">
                                <img src={selectedImage} alt="Preview" className="preview-image" />
                                <button type="button" onClick={() => setSelectedImage(null)} className="remove-image-button">Remove</button>
                            </div>
                        )}
                        <div className="wish-bot-actions">
                            <button type="submit" className="send-wish-button">Send</button>
                            <button type="button" className="minimize-wish-button" onClick={() => setIsOpen(false)}>Minimize</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default WishBot;
