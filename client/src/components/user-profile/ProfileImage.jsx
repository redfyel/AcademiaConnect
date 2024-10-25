import React from 'react';
import md5 from 'md5';

const ProfileImage = ({ email }) => {
  const emailHash = md5(email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`; 
 
  const styles = {
    profileIcon: {
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
      cursor: 'pointer',
      marginLeft: '10px', 
      border : '2px solid black'
    },
  };

  return (
    <img 
      src={gravatarUrl} 
      alt="Profile" 
      style={styles.profileIcon}
    />
  );
};

export default ProfileImage;
