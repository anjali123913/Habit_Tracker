import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgVideo from "../assets/bgvideo.mp4"; // ✅ apna video ka path yahan daalna

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
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center px-6 py-12 overflow-hidden">
      
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #281000 0%, #C0971C 27.62%, #FFE976 53.63%, #C0971C 80.71%, #281000 108.33%)",
          }}
        >
          Welcome to Habit Tracker
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-gray-300 mb-10 max-w-2xl text-lg"
        >
          Build better habits, track your progress, and stay motivated with our
          easy-to-use habit tracker.
        </motion.p>

        {/* Features List */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mb-12 space-y-4 max-w-md w-full"
        >
          {features.map((f, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            >
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full w-3 h-3 inline-block shadow-md"></span>
              <span className="text-gray-200">{f}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/singup")}
          className="relative px-8 py-3 rounded-xl text-lg font-semibold overflow-hidden shadow-lg"
        >
          <span
            className="relative z-10 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #281000 0%, #C0971C 27.62%, #FFE976 53.63%, #C0971C 80.71%, #281000 108.33%)",
            }}
          >
            Get Started
          </span>
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 z-0 rounded-xl"
          />
        </motion.button>
      </div>
    </div>
  );
}
