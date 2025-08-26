import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // loader start
    try {
      const res = await axios.post("https://habit-tracker-backend-vitw.onrender.com/api/auth/register", form);

      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token); // save token

      setForm({ name: "", email: "", password: "" }); // clear input
      setTimeout(() => {
        navigate("/dashboard"); // redirect
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error during signup");
    } finally {
      setLoading(false); // loader stop
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
          required
        />

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
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-2 border-t-2 border-white w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            "Signup"
          )}
        </button>
<p className="text-center py-1 text-sm">I have already an account <Link to={"/login"}className="text-blue-500 underline">Login</Link></p>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
