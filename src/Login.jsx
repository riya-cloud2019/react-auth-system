import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://react-auth-system-14w2.onrender.com/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ token store
      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      // ✅ redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <br /><br />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <br /><br />

        <button type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
