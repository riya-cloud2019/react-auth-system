import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch {
      alert("Login Failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <br /><br />
        <input {...register("password", { required: true })} type="password" placeholder="Password" />
        <br /><br />
        <button type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
