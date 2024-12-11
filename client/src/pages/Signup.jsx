import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New state for success message
  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making a new request
    setSuccess(false); // Reset success state
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Signup successful", result);
        setSuccess(true);
        // Optional: redirect to a login page after a short delay
        setTimeout(() => navigate("/sign-in"), 3000);
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
    };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url('/images/house2.jpg')` }}
    >
      <div className="p-8 rounded-lg shadow-lg bg-opacity-75 bg-gray-900 w-full max-w-md border-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-600 text-white text-sm">
              Signup successful! Redirecting to login page...
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-600 text-white text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="username"
            >
              Your Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
