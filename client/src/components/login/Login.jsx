import  {userLoginContext} from "../../contexts/userLoginContext";
import { useForm } from "react-hook-form";
import "./Login.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let { loginUser, userLoginStatus,err } = useContext(userLoginContext);
  let {register, handleSubmit, formState: { errors }} = useForm();
  let navigate = useNavigate();

  function userLogin(userCred) {
    loginUser(userCred);
    console.log(userLoginStatus);
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/tracker");
    }
  }, [userLoginStatus]);

  return (
    <div>
      <p className="display-3 text-center mt-4 lead">Login</p>
      <div className="row">
        <div className="col-11 col-sm-10 col-md-6 mx-auto forrm">
          <form className=" mt-5 p-3 " onSubmit={handleSubmit(userLogin)}>

            {/* other error messages */}
            {
              err.length!==0 && <p className="fs-3 text-danger">{err}</p>
            }
            <div className="mb-3">
              <label htmlFor="username" className="form-label fs-4">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className="lead text-danger">*This field is required</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-4">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="lead text-danger">*This field is required</p>
              )}
            </div>
            <button type="submit" className="btn text-white rounded-pill fs-5 border but ">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
