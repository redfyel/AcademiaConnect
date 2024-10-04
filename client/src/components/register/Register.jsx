
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Register() {
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

export default Register;
