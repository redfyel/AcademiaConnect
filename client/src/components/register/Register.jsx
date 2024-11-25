import { useForm } from "react-hook-form";
import { useState } from "react";

function Register({ onRegisterSuccess }) {  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');

  async function onUserRegister(newUser) {
    try {
      let res = await fetch(`https://academiaconnect-x5a6.onrender.com`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      let data = await res.json();
      
      if (data.message === "user created") {
        onRegisterSuccess();
      } else {
        setErr(data.message);
      }
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onUserRegister)}>
      <h3 className="text-center fs-4">Register</h3>
      {err.length !== 0 && <p className="error text-center text-danger">{err}</p>}
      <div>
        <label>Username</label>
        <input type="text" {...register("username", { required: true, minLength: 4 })} />
        {errors.username?.type === 'required' && <span className="error">*This field is required</span>}
        {errors.username?.type === 'minLength' && <span className="error">*Username must be at least 4 characters long</span>}
      </div>
      <div>
        <label>Roll Number</label>
        <input type="text" {...register("rollnum", { required: true, minLength: 10 })} />
        {errors.rollnum?.type === 'required' && <span className="error">*This field is required</span>}
        {errors.rollnum?.type === 'minLength' && <span className="error">*Please give your full roll number</span>}
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
