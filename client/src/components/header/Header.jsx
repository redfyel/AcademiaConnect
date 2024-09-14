import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
function Header(){
return(
  <div className="navbar">
    <ul className="justify-content-end ">
      <li>
       <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/student-corner" className="text-secondary">student-corner</Link>
      </li>
    </ul>
  </div>
)
}
export default Header;