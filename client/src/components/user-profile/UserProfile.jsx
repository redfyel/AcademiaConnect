import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import md5 from 'md5'; 
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import ss from "../../assets/images/Attendance_Tracker-piechart.png"; // Ensure this path is correct

function UserProfile() {
  let { logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext); 
  const navigate = useNavigate();

  // Sample posts data
  const userPosts = [
    { id: 1, title: "Understanding React Hooks", content: "In this post, I discuss how to use React hooks effectively in your projects...", date: "2024-10-15" },
    { id: 2, title: "My Journey with CSS Grid", content: "CSS Grid has been a game-changer in building responsive layouts. Here are my thoughts...", date: "2024-10-12" },
    { id: 3, title: "Top 10 JavaScript Tricks", content: "JavaScript is full of quirks and tips. These are some of the tricks that have helped me...", date: "2024-10-10" },
  ];

  // Sample upcoming events data
  const upcomingEvents = [
    { id: 1, title: "TechFest 2024", date: "2024-11-05", location: "Main Auditorium", description: "A grand tech event showcasing the latest in technology, hosted by the Computer Science Department." },
    { id: 2, title: "AI and Machine Learning Conference", date: "2024-11-12", location: "Room 203, Block C", description: "A detailed conference covering the most recent advancements in AI and Machine Learning." },
  ];

    // Generate Gravatar URL from email
    const emailHash = md5(currentUser.email.trim().toLowerCase());
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  // Navigation functions
  const goToCreatePost = () => navigate('/student-corner');
  const goToAttendanceTracker = () => navigate('/tracker');
  const goToEventsCalendar = () => navigate('/events');

  return (
    <div> 
      {/* Profile header with image and details */}
      <div className="profile-header">
        <div className="background-line"></div> {/* Gradient line background */}

        <img 
          src={gravatarUrl}  // Gravatar image
          alt="Profile" 
          className="profile-picture"
           // Inline styles for profile image
        />

        {/* Profile Details */}
        <div className="profile-details">
          <h1 className="profile-name">Username</h1>
          <div className="username">@ChanduSekhar</div>
          <div className="join-roll-no">22501A0531</div>

          {/* Buttons */}
          <div className="profile-buttons">
            <button className="edit-profile">Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="welcome-message">
        Welcome, 22501A0531!
      </div>

      <div className="container-user">
        {/* Attendance Section */}
        <div className="attendance-section">
          <div className="attendance-image">
            <img 
              src={ss} // Correctly imported attendance tracker image
              alt="Attendance Tracker" 
            />
            <div className="attendance-button">
              <button className="track-attendance" onClick={goToAttendanceTracker}>
                Track your Attendance
              </button>
            </div>
          </div>
          <div className="motivational-quote">
            <p>"Success is the sum of small efforts, repeated day in and day out."</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="posts-section section">
          <div className="posts-header">
            <h2>Your Posts</h2>
            <button className="create-post" onClick={goToCreatePost}>
              Create Post
            </button>
          </div>
          <div className="posts-list">
            {userPosts.length === 0 ? (
              <p>You haven't created any posts yet.</p>
            ) : (
              userPosts.map(post => (
                <div key={post.id} className="post-card">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-date">Posted on: {post.date}</p>
                  <p className="post-content">{post.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="events-section section">
          <h2 className="events-header">Upcoming Events at PVPSIT</h2>
          <div className="events-list">
            {upcomingEvents.length === 0 ? (
              <p>No upcoming events registered.</p>
            ) : (
              upcomingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-date mb-5">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-location">📍 {event.location}</div>
                </div>
              ))
            )}
          </div>

          {/* View More Events Button */}
          <div className="view-more-events">
            <button className="view-more" onClick={() => navigate('/events')}>
              View More Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
