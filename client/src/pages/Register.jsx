import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlaneDeparture } from "react-icons/fa";
import "../styles/register.css";

const API = "https://tripvault-codgen.onrender.com/api/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${API}/register`,
        formData
      );

      toast.success("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <div className="register-logo">
            <FaPlaneDeparture />
          </div>

          <h1>Create Your Account</h1>

          <p>
            Start saving your unforgettable journeys.
          </p>

        </div>

        {/* Form */}
        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="register-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="register-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}
          <div className="register-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account ✈️"}
          </button>

        </form>

        {/* Login Link */}
        <div className="register-login">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;