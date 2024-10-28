import React, { useState } from 'react';
import './WishBot.css'; // Ensure your CSS file has appropriate styles

const WishBot = ({ onWishSubmit }) => {
    const [wishContent, setWishContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (wishContent.trim()) {
            onWishSubmit(wishContent);
            setWishContent('');
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
                        <div className="wish-bot-actions">
                            <button type="submit">Send</button>
                            <button type="button" onClick={() => setIsOpen(false)}>Minimize</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default WishBot;
