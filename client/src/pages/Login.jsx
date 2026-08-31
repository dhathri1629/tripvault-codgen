import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.css";

const API = "https://tripvault-codgen.onrender.com/api/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/login`,
        formData
      );

      // Store JWT token
      localStorage.setItem("token", res.data.token);

      // Get logged-in user information
      const userRes = await axios.get(
        `${API}/me`,
        {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        }
      );

      // Store user information
      localStorage.setItem("name", userRes.data.name);
      localStorage.setItem("email", userRes.data.email);

      // Show success toast
      toast.success("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      // Show error toast
      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back ✈️</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;