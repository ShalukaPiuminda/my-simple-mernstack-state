import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log("Sign-in successful");
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } else {
        setError(result.message || "Sign-in failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/houseland.jpg')`,
      }}
    >
      <div className="p-8 rounded-lg shadow-lg bg-gray-900 bg-opacity-75 w-full max-w-md border white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          LOGIN
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-600 text-white text-sm">
              Login successful! Redirecting to the homepage...
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
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="password"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-green-400"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Signup Link */}
        <p className="text-center text-white mt-4">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-green-400 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
