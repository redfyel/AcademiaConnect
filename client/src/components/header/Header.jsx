import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/academia-connect-logo.png';
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import ProfileImage from '../user-profile/ProfileImage'; // Import the ProfileImage component

function Header() {
  let { logoutUser, userLoginStatus, currentUser } = useContext(userLoginContext); 

  return (
    <div className='header d-flex justify-content-between align-items-center'>
      
      <Link to="/">
      <div className="logo-imge d-flex">
      <img src={logo} alt="logo unavailable" className='logo-img' />
      <h1>AcademiaConnect</h1>
      </div>
      
      </Link>
      
      <ul className="nav d-flex gap-3">
        <li className="nav-item links">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item links">
          <Link to="exam-corner">Exam Corner</Link>
        </li>
        <li className="nav-item links">
          <Link to="tracker">Attendance Tracker</Link>
        </li>
        <li className="nav-item links">
          <Link to="events">Events</Link>
        </li>
        <li className="nav-item links">
          <Link to="student-corner">Student Corner</Link>
        </li>     

        {userLoginStatus === false ? (
          <li className="nav-item links">
            <Link to="auth">Login/Register</Link>
          </li>
        ) : (
          <>
           
            <li className="nav-item links">
              <Link to="auth" onClick={logoutUser}>Logout</Link>
            </li>

            <li className="nav-item">
              <Link to="user-profile">
                <ProfileImage email={currentUser.email} /> 
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
