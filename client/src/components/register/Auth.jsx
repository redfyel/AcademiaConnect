import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 
import { userLoginContext } from '../../contexts/userLoginContext';

// Combined Login/Register Component with Tabs
function Auth() {
  const [activeTab, setActiveTab] = useState('login'); // State to toggle tabs

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
      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

// Login Form Component
function LoginForm() {
  const { loginUser, userLoginStatus, err } = useContext(userLoginContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function userLogin(userCred) {
    loginUser(userCred);
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/tracker");
    }
  }, [userLoginStatus]);

  return (
    <form className="auth-form" onSubmit={handleSubmit(userLogin)}>
      <h3>Login</h3>
      {err.length !== 0 && <p className="error">{err}</p>}
      <div>
        <label>Username</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <span className="error">*This field is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span className="error">*This field is required</span>}
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
  );
}

// Register Form Component
function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  async function onUserRegister(newUser) {
    try {
      let res = await fetch("http://localhost:4000/user-api/user", { 
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      let data = await res.json();
      if (data.message === "user created") {
        navigate("/login");
      } else {
        setErr(data.message);
      }
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onUserRegister)}>
      <h3>Register</h3>
      {err.length !== 0 && <p className="error">{err}</p>}
      <div>
        <label>Username</label>
        <input type="text" {...register("username", { required: true, minLength: 4 })} />
        {errors.username?.type === 'required' && <span className="error">*This field is required</span>}
        {errors.username?.type === 'minLength' && <span className="error">*Username must be at least 4 characters long</span>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span className="error">*This field is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span className="error">*This field is required</span>}
      </div>
      <button type="submit" className="btn">Register</button>
    </form>
  );
}

export default Auth;
