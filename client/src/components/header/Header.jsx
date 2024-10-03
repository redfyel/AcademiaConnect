import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from'../../assets/images/academia-connect-logo.png'
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';

function Header(){
  let { logoutUser, userLoginStatus } = useContext(userLoginContext);
  return (
    <div className='header d-flex justify-content-between align-items-center'>
      <Link to="/"><img src={logo} alt="logo unavailable" className='logo-img' /></Link>
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
        
        {
          userLoginStatus === false ? (<li className="nav-item links">
          <Link to="register">Login/Register</Link>
        </li> ): (<li className="nav-item links">
          <Link to="login" onClick={logoutUser}>Logout</Link>
        </li>)
        }
        

      </ul>
    </div>
  );
};

export default Header;
