import React, { useState } from "react";
import md5 from "md5";
import "./UserProfile.css";

function ProfileImage({ email, currentImage, onImageUpload, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(currentImage || null);
  const emailHash = md5(email.trim().toLowerCase());
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
      onImageUpload(file); // Pass image file to parent if needed
    }
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={selectedImage || gravatarUrl}
        alt="Profile"
        style={styles.profileIcon}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="modal-overlay1">
          <div className="modal-container1">
            <h2>Edit Profile</h2>
            <form>
              <label>
                Profile Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              <div className="image-preview-container">
                {selectedImage ? (
                  <img src={selectedImage} alt="Avatar Preview" className="avatar-preview" />
                ) : (
                  <div className="placeholder-preview">No image selected</div>
                )}
              </div>
              <button type="button" className="modbuts" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="modbuts" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileImage;
