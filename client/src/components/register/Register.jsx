
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //error state
  let [err, setErr] = useState("");
  //navigate to routes
  let navigate = useNavigate();

  async function onUserRegister(newUser) {
    console.log(newUser);
    try {
      let res = await fetch("http://localhost:4000/user-api/user", { 
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      let data = await res.json()
      console.log(data);
      if (data.message === "user created") {
        navigate("/login");
      }
      else {
        setErr(data.message) //non-error messages
      }
    } catch (err) {
      console.log("error is ", err);
      setErr(err.message); //error message
    }
  }

  return (
    <div>
      <p className="display-3 text-center mt-4 lead bg-light" style={{color: '#ebebff' }}>User Registration</p>

      {/* Registration form */}
      <div className="row">
      <div className="col-11 col-sm-10 col-md-6 mx-auto" style={{ backgroundColor: '#ebebff' }}>

          {/* Other error message */}
          {err.length !== 0 && <p className="fs-2 text-danger">{err}</p>}

          <form
            className="mx-auto mt-5 p-3 "
            onSubmit={handleSubmit(onUserRegister)}
          >
            {/* username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                {...register("username", { required: true, minLength: 4 })}
              />
              {/* Validation error message */}
              {errors.username?.type === "required" && (
                <p className="lead text-danger">*This field is required</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="lead text-danger">
                  *Username must be atleast 4 characters long
                </p>
              )}
            </div>

              {/* email */}
              <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="lead text-danger">*This field is required</p>
              )}
            </div>

            {/* password */}
            <div className="mb-3">
              <label htmlFor=" password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id=" password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="lead text-danger">*This field is required</p>
              )}
            </div>

          

            {/* submit button */}
            <button
              type="submit"
              className="btntext-center border"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
