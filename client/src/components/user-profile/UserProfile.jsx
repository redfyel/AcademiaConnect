import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import { useNavigate, Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Import icons
import { userLoginContext } from "../../contexts/userLoginContext";
import md5 from 'md5'; 
import './UserProfile.css';
import ProfileImage from "./ProfileImage";

ChartJS.register(ArcElement, Tooltip, Legend);

function UserProfile() {
  const { userLoginStatus, currentUser } = useContext(userLoginContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [presentHours, setPresentHours] = useState(0);
  const [absentHours, setAbsentHours] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
  const [currentPostIndex, setCurrentPostIndex] = useState(0); 
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

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

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-api/attendance/${rollnum}`, {
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

  const totalDaysInSemester = 30 * 4;
  const workingDays = totalDaysInSemester - holidayDays;
  const totalHours = Math.max(workingDays * 7, 1);
  const remainingDays = Math.max(totalDaysInSemester - (presentHours / 7) - (absentHours / 7) - holidayDays, 0);

  const presentPercentage = ((presentHours / totalHours) * 100).toFixed(2);
  const absentPercentage = ((absentHours / totalHours) * 100).toFixed(2);
  const remainingPercentage = 100 - (parseFloat(presentPercentage) + parseFloat(absentPercentage));

  const chartData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        label: "Attendance",
        data: [presentHours, absentHours, remainingDays], 
        backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % userPosts.length);
  };

  const handlePreviousPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + userPosts.length) % userPosts.length);
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % upcomingEvents.length);
  };

  const handlePreviousEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const emailHash = md5(currentUser.email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

  if (!userLoginStatus || !currentUser) {
    return (
      <div className="auth-error-message">
        <h3>
          Please{" "}
          <a
            href="/auth"
            className="btn btn-lg active"
            role="button"
            aria-pressed="true"
          >
            Sign Up / Login
          </a>{" "}
          to continue
        </h3>
        <p>
          You need to create an account or log in to view your dashboard.
        </p>
      </div>
    )
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // Changed to hold image URL

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  return (
    <div className="profile-page">
        
      <div className="sidebar">
        <div className="profile-box">
          <img src={gravatarUrl || uploadedImage}  alt="Profile" className="profile-image" />
          <h3>{currentUser.username}</h3>
          <p>{currentUser.rollnum}</p>
          <p>{currentUser.email}</p>
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                  </div>
        <br />
        <div className="quick-links">
          <h4 className="text-center bold">Quick Links</h4>
          <ul>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/syllabus">Syllabus</Link></li>
            <li><Link to="/pyqs">Previous Year Questions (PYQs)</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="combined-sections">
          <div className="events-section">
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-list">
              <div className="event-card1">
                <h3 className="event-title">{upcomingEvents[currentEventIndex].name}</h3>
                <p>{upcomingEvents[currentEventIndex].date}</p>
                <p>{upcomingEvents[currentEventIndex].description}</p>
              </div>
              <div className="navigation-arrows">
                <span className="arrow" onClick={handlePreviousEvent}>{"<"}</span>
                <span className="arrow" onClick={handleNextEvent}>{">"}</span>
              </div>
            </div>
          </div>
          <div className="posts-section">
            <h2 className="events-header">User Posts</h2>
            <div className="posts-container">
              <div className="post-card">
                <h3 className="post-title">{userPosts[currentPostIndex].title}</h3>
                <p>{userPosts[currentPostIndex].date}</p>
                <p>{userPosts[currentPostIndex].content}</p>
              </div>
              <div className="navigation-arrows">
                <span className="arrow" onClick={handlePreviousPost}>{"<"}</span>
                <span className="arrow" onClick={handleNextPost}>{">"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Tracker */}
        <div className="attendance-section">
          <h3 className="text-center events-header">Your Attendance</h3>
          <div className="pie-chart-section">
            <div className="small-pie-chart">
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="legend-section">
              <div className="stat-item1">
                <FaCheckCircle color="#4caf50" size={20} /> {/* Present icon */}
                <span className="stat-label">Present:</span>
                <span className="stat-value">{presentPercentage}% ({presentHours / 7} days)</span>
              </div>
              <div className="stat-item1">
                <FaTimesCircle color="#f44336" size={20} /> {/* Absent icon */}
                <span className="stat-label"> Absent:</span>
                <span className="stat-value">{absentPercentage}% ({absentHours / 7} days)</span>
              </div>
              <div className="stat-item1">
                <FaClock color="#ffc107" size={20} /> {/* Remaining icon */}
                <span className="stat-label"> Yet to Come:</span>
                <span className="stat-value">{remainingDays} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfileImage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentImage={uploadedImage}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

export default UserProfile;
