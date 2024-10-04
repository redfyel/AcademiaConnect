import React, { useState } from 'react';
import './Auth.css'; 
import Login from '../login/Login';
import Register from './Register';


function Auth() {
  const [activeTab, setActiveTab] = useState('login'); 

  // Tab switch handler
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('login')}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('register')}
        >
          Register
        </button>
      </div>

      {/* Show Login or Register form based on activeTab */}
      {activeTab === 'login' ? <Login /> : <Register />}
    </div>
  );
}




export default Auth;
