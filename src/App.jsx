import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header.jsx";
// import AddHabitForm from "./components/AddHabitForm.jsx";
// import Toolbar from "./components/Toolbar.jsx";
// import EmptyState from "./components/EmptyState.jsx";
// import HabitRow from "./components/HabitRow.jsx";
// import ChartsPanel from "./components/ChartsPanel.jsx";
// import useLoadState from "./hooks/useLoadState.js";
// import useFilteredSortedHabits from "./hooks/useFilteredSortedHabits.js";
// import { addHabit } from "./store/habitsSlice.js";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

// import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import AddHabitForm from "./components/AddHabitForm.jsx";
import Toolbar from "./components/Toolbar.jsx";
import EmptyState from "./components/EmptyState.jsx";
import HabitRow from "./components/HabitRow.jsx";
import ChartsPanel from "./components/ChartsPanel.jsx";
import useFilteredSortedHabits from "./hooks/useFilteredSortedHabits.js";

  function HabitDashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  const filtered = useFilteredSortedHabits({ q, status, sortBy, habits });

  // Fetch habits from API
  const fetchHabits = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      setHabits(res.data.habits); // assuming API returns array of habits
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Error fetching habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Add habit
  const onAdd = async (data) => {
    if (!data.name?.trim()) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/habits", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits((prev) => [...prev, res.data]); // add new habit
    } catch (err) {
      setError(err.response?.data?.message || "Error adding habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      <Header />

      <section className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <AddHabitForm onAdd={onAdd} />
        <Toolbar
          q={q}
          setQ={setQ}
          status={status}
          setStatus={setStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loader border-4 border-t-4 border-white rounded-full w-10 h-10 animate-spin"></span>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center py-20">{error}</p>
      ) : habits.length ? (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered?.map((h) => (
              <HabitRow key={h._id || h.id} habit={h} />
            ))}
          </div>
          <ChartsPanel />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-white bg-gradient-to-b from-[#0b0b10] to-[#121218]">
        <Routes>
          <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<HabitDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
