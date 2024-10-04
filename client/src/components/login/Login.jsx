import  {userLoginContext} from "../../contexts/userLoginContext";
import { useForm } from "react-hook-form";
import "./Login.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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

export default Login;
