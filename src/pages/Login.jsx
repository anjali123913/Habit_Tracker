import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
      localStorage.setItem("token", res.data.token);

      setForm({ email: "", password: "" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <motion.form
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700 bg-transparent"
      >
        {/* Heading */}
        <h2
          className="text-4xl font-extrabold mb-10 text-center"
          style={{
            background:
              "linear-gradient(180deg, #281000 0%, #C0971C 27.62%, #FFE976 53.63%, #C0971C 80.71%, #281000 108.33%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow-md hover:shadow-amber-500/50"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-xl bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow-md hover:shadow-amber-500/50"
          required
        />

        {/* Login Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,223,93,0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-l from-[#452e06] via-[#d1bf5a] to-[#452e06] text-black rounded-full w-full px-4 py-3 font-bold transition-colors flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-2 border-t-2 border-black w-6 h-6 rounded-full animate-spin"></span>
          ) : (
            "Login"
          )}
        </motion.button>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-300"
          >
            {message}
          </motion.p>
        )}

        {/* Signup redirect */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/singup")}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </motion.form>
    </div>
  );
}
