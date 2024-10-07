// AcademiaChatbot.js
import React, { useState } from 'react';
import './Chatbot.css'; // Custom styles

const AcademiaChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(true); // State to manage chatbot visibility
    const [isMinimized, setIsMinimized] = useState(false); // State to manage minimization
    const chatbotName = "Academia Assistant"; // Change the chatbot name here

    const handleSend = () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Simple bot response logic
            const botResponse = getBotResponse(input);
            if (botResponse) {
                setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
            }

            setInput(""); // Clear the input field
        }
    };

    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            return "Hello! How can I assist you today?";
        } else if (lowerInput.includes("exam schedule")) {
            return "You can find the exam schedule in the Exam Corner section.";
        } else if (lowerInput.includes("event updates")) {
            return "Check the Events section for the latest updates.";
        } else {
            return "I'm sorry, I didn't understand that. Can you please rephrase?";
        }
    };

    // Function to toggle chatbot visibility
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // Function to minimize the chatbot
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
            {isOpen && (
                <div className={`chatbot ${isMinimized ? "minimized" : ""}`}>
                    <div className="chatbot-header">
                        <h2>{chatbotName}</h2>
                        <div>
                            <button className="minimize-button" onClick={toggleMinimize}>
                                {isMinimized ? "⬆️" : "⬇️"} {/* Minimize/Restore icon */}
                            </button>
                            <button className="close-button" onClick={toggleChatbot}>
                                &times; {/* Close icon */}
                            </button>
                        </div>
                    </div>
                    {!isMinimized && (
                        <>
                            <div className="chatbot-messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button onClick={handleSend}>Send</button>
                            </div>
                        </>
                    )}
                </div>
            )}
            {!isOpen && (
                <button className="open-chatbot" onClick={toggleChatbot}>
                    Chat with Us
                </button>
            )}
        </>
    );
};

export default AcademiaChatbot;
