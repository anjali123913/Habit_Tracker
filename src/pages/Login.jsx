import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://habit-tracker-backend-vitw.onrender.com/api/auth/login",
        form
      );

      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token); // save JWT token

      setForm({ email: "", password: "" }); // clear inputs
      setTimeout(() => {
        navigate("/dashboard"); // redirect to dashboard
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded flex items-center justify-center"
        >
          {loading ? (
            <span className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center py-1 text-sm">
          I have not an account{" "}
          <Link to={"/signup"} className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
