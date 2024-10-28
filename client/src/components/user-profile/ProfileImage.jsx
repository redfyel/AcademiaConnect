import React, { useState } from "react";
import md5 from "md5";
import "./UserProfile.css";

function ProfileImage({ email, isOpen, onClose, currentImage, onImageUpload }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen || false);
  const [selectedImage, setSelectedImage] = useState(currentImage || null);
  const [rotation, setRotation] = useState(0);
  const emailHash = md5(email?.trim().toLowerCase() || "");
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  const styles = {
    profileIcon: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      cursor: "pointer",
      marginLeft: "10px",
      border: "2px solid black",
    },
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageUpload(file);
    }
  };

  const handleRotateLeft = () => setRotation((prevRotation) => prevRotation - 90);
  const handleRotateRight = () => setRotation((prevRotation) => prevRotation + 90);
  const handleReset = () => {
    setSelectedImage(currentImage || null);
    setRotation(0);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Profile icon that opens the modal */}
      <img
        src={selectedImage || gravatarUrl}
        alt="Profile"
        style={styles.profileIcon}
       
      />

      {/* Modal for editing profile image */}
      {isModalOpen && (
        <div className="modal-overlay1">
          <div className="modal-container1">
            <h2>Edit Profile</h2>
            <div className="image-preview-container">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Avatar Preview"
                  className="avatar-preview"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              ) : (
                <div className="placeholder-preview">No image selected</div>
              )}
            </div>
            <div className="edit-buttons">
              <button type="button" onClick={handleRotateLeft}>⟲</button>
              <button type="button" onClick={handleRotateRight}>⟳</button>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
            <label className="choose-image">
              Choose Image
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
            <div className="button-container">
              <button type="button" className="modbuts" onClick={handleSave}>Save</button>
              <button type="button" className="modbuts" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileImage;
