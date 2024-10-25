import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { userLoginContext } from "../../contexts/userLoginContext";
import './UserProfile.css';
import profileImage from "../../assets/images/profile-image.jpeg";

ChartJS.register(ArcElement, Tooltip, Legend);

function UserProfile() {
  let { logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext); 
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [presentHours, setPresentHours] = useState(0);
  const [absentHours, setAbsentHours] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
  const [currentPostIndex, setCurrentPostIndex] = useState(0); // Track the current post index
  const [currentEventIndex, setCurrentEventIndex] = useState(0); // Track the current event index

  // Sample upcoming events
  const upcomingEvents = [
    { name: "AR/VR Hackathon", date: "November 29, 2024", location: "Online", description: "Join us for an immersive AR/VR experience!" },
    { name: "Hackathon 2024", date: "November 20, 2024", location: "Campus", description: "Compete for exciting prizes and learn from experts." },
    { name: "End of Semester Fest", date: "December 20, 2024", location: "Auditorium", description: "Celebrate the end of the semester with fun activities." }
  ];

  const userPosts = [
    { title: "Exploring the Future of AI", date: "October 1, 2024", content: "A deep dive into the advancements in artificial intelligence." },
    { title: "Understanding Virtual Reality", date: "October 10, 2024", content: "Exploring the possibilities of VR technology." },
    { title: "Tips for Successful Hackathons", date: "October 15, 2024", content: "Best practices for participating in hackathons." }
  ];

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const rollnum = currentUser?.rollnum;

        if (!token || !rollnum) return;

        const response = await fetch(`http://localhost:4000/user-api/attendance/${rollnum}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          let presentCount = 0;
          let absentCount = 0;
          let holidayCount = 0;

          if (data.attendance) {
            data.attendance.forEach(item => {
              if (item.status === 'present') presentCount += 7;
              if (item.status === 'absent') absentCount += 7;
              if (item.status === 'holiday') holidayCount += 1;
            });
          }

          setPresentHours(presentCount);
          setAbsentHours(absentCount);
          setHolidayDays(holidayCount);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    if (currentUser) fetchAttendanceData();
  }, [currentUser]);

  // Define pie chart data
  const totalDaysInSemester = 30 * 4; // Assuming 4 weeks in the semester
  const workingDays = totalDaysInSemester - holidayDays;
  const totalHours = Math.max(workingDays * 7, 1);
  const remainingHours = Math.max(0.75 * totalHours - presentHours, 0);

  const chartData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        label: "Attendance",
        data: [presentHours, absentHours, remainingHours],
        backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  // Handle post navigation
  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % userPosts.length);
  };

  const handlePreviousPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + userPosts.length) % userPosts.length);
  };

  // Handle event navigation
  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % upcomingEvents.length);
  };

  const handlePreviousEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="profile-box">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h3>Chandra Sekhar</h3>
          <p>Web Developer</p>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
          <li><button onClick={() => document.getElementById("posts").scrollIntoView()}>My Posts</button></li>
    <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Upcoming Events</button></li>
    <li><button onClick={() => document.getElementById("syllabus").scrollIntoView()}>Syllabus</button></li>
    <li><button onClick={() => document.getElementById("events").scrollIntoView()}>Events</button></li>
    <li><button onClick={() => document.getElementById("tracker").scrollIntoView()}>Attendance Tracker</button></li></ul>
        </div>
      </div>
      <div className="main-content">
        <div className="combined-sections">
          <div className="events-section">
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.length > 0 && (
                <div className="event-card">
                  <h3 className="event-title">{upcomingEvents[currentEventIndex].name}</h3>
                  <p className="event-date">Date: {upcomingEvents[currentEventIndex].date}</p>
                  <p className="event-location">Location: {upcomingEvents[currentEventIndex].location}</p>
                  <p className="event-description">{upcomingEvents[currentEventIndex].description}</p>
                </div>
              )}
              <div className="scroll-buttons">
                <button className="scroll-button" onClick={handlePreviousEvent}>Previous</button>
                <button className="scroll-button" onClick={handleNextEvent}>Next</button>
              </div>
            </div>
          </div>
          <div className="posts-section">
            <h2>Recent Posts</h2>
            <div className="posts-container">
              {userPosts.length > 0 && (
                <div className="post-card">
                  <h3 className="post-title">{userPosts[currentPostIndex].title}</h3>
                  <p className="post-date">Date: {userPosts[currentPostIndex].date}</p>
                  <p className="post-content">{userPosts[currentPostIndex].content}</p>
                </div>
              )}
              <div className="scroll-buttons">
                <button className="scroll-button" onClick={handlePreviousPost}>Previous</button>
                <button className="scroll-button" onClick={handleNextPost}>Next</button>
              </div>
            </div>
          </div>
        </div>

         {/* Attendance Tracker */}
         <div className="attendance-section">
          <h3 className="text-center tracker-title">Attendance Tracker</h3>
          <div className="pie-chart-section">
            <div className="small-pie-chart">
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="legend-section">
              <div className="stat-item">
                <span className="legend-icon present-circle"></span>
                <p>Present: {Math.round((presentHours / totalHours) * 100)}%</p>
              </div>
              <div className="stat-item">
                <span className="legend-icon absent-circle"></span>
                <p>Absent: {Math.round((absentHours / totalHours) * 100)}%</p>
              </div>
              <div className="stat-item">
                <span className="legend-icon remaining-circle"></span>
                <p>Yet to Come: {Math.round((remainingHours / totalHours) * 100)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
