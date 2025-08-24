import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    "Track daily habits effortlessly",
    "Set custom reminders",
    "View streaks and progress charts",
    "Archive completed or paused habits",
    "Get detailed stats for motivation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] to-[#121218] text-white flex flex-col justify-center items-center px-4 py-12">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Welcome to Habit Tracker
      </h1>
      <p className="text-center text-gray-300 mb-8 max-w-2xl">
        Build better habits, track your progress, and stay motivated with our easy-to-use habit tracker.
      </p>

      {/* Features list */}
      <ul className="mb-8 space-y-2 max-w-md">
        {features.map((f, i) => (
          <li key={i} className="flex items-center space-x-3">
            <span className="bg-green-600 rounded-full w-3 h-3 inline-block"></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/singup")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
      >
        Get Started
      </button>
    </div>
  );
}
