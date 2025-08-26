import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#101019] to-[#121218] text-white flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      
      {/* Animated Background Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl -top-40 -left-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-green-600/20 blur-3xl -bottom-40 -right-40"
      />

      {/* Heading */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
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
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <span className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-3 h-3 inline-block shadow-md"></span>
            <span className="text-gray-200">{f}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/singup")}
        className="relative px-8 py-3 rounded-xl text-lg font-semibold overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 shadow-lg"
      >
        <span className="relative z-10"> Get Started</span>
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 z-0"
        />
      </motion.button>
    </div>
  );
}
