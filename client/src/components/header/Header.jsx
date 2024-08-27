import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='nav'>
      <ul className="listOfItems justify-content-end">
        <li className="list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-item">
          <Link to="/student-corner">Student Corner</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
