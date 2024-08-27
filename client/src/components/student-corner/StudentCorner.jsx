import React, { useState } from 'react';
import './StudentCorner.css'; // Assuming you're using a separate CSS file

function StudentCorner() {
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState('doubts');
  const [posts, setPosts] = useState({ doubts: [], complaints: [] });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postType = event.target.postType.value;
    const postTitle = event.target.postTitle.value;

    setPosts((prevPosts) => ({
      ...prevPosts,
      [postType]: [...prevPosts[postType], postTitle],
    }));

    handleCloseModal();
    event.target.reset();
  };

  return (
    <div>
      <h1>Student Corner</h1>
      <div className="buttons">
        <button onClick={() => handleSectionChange('doubts')}>Doubts</button>
        <button onClick={handleOpenModal}>Create Post</button>
        <button onClick={() => handleSectionChange('complaints')}>Complaints</button>
      </div>

      <div className="section">
        {activeSection === 'doubts' && (
          <div>
            <h2>Doubts</h2>
            <ul>
              {posts.doubts.map((doubt, index) => (
                <li key={index}>{doubt}</li>
              ))}
            </ul>
          </div>
        )}
        {activeSection === 'complaints' && (
          <div>
            <h2>Complaints</h2>
            <ul>
              {posts.complaints.map((complaint, index) => (
                <li key={index}>{complaint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showModal && (
        <div id="postModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="postType">Type:</label>
              <select id="postType" name="postType">
                <option value="doubt">Doubt</option>
                <option value="complaint">Complaint</option>
              </select>
              <br />
              <label htmlFor="postTitle">Title:</label>
              <input type="text" id="postTitle" name="postTitle" required />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCorner;
