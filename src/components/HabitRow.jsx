import { useState } from "react";
import axios from "axios";
import Badge from "./Badge.jsx";
import MiniCalendar from "./MiniCalendar.jsx";
import { percentComplete, computeStreak } from "../utils/statsUtils.js";

// Icons
function ArchiveIcon({ className }) {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M3 7h18v4H3zM5 11h14v10H5z" />
    </svg>
  
  );
}
function UndoIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M3 7v6h6M3 13a9 9 0 0115 6h3" />
    </svg>
  );
}
function TrashIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3" />
    </svg>
  );
}

export default function HabitRow({ habit, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
console.log(habit)
  const map = habit.progressMap || {};
  const percent = percentComplete(map, 30);
  const streak = computeStreak(map);

  const token = localStorage.getItem("token");

  const toggleArchive = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        `https://habit-tracker-backend-vitw.onrender.com/api/habits/${habit._id}`,
        { archived: !habit.archived },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating habit");
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async () => {
    if (!window.confirm(`Are you sure you want to delete "${habit.title}"?`)) return;
    setLoading(true);
    setError("");
    try {
      await axios.delete(`https://habit-tracker-backend-vitw.onrender.com/api/habits/${habit._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(null, habit._id);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition relative">
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex justify-center items-center rounded-2xl">
          <span className="loader border-2 border-t-2 border-white w-8 h-8 rounded-full animate-spin"></span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold truncate max-w-[260px] md:max-w-[360px]">{habit?.title}</h4>
            {habit?.archived && <Badge className="border-amber-400/30 text-amber-300">Archived</Badge>}
            <Badge>{habit?.frequency}</Badge>
            {habit?.category && <Badge>{habit?.category}</Badge>}
          </div>
          {habit?.description && (
            <p className="text-white/60 text-sm mt-1 max-w-prose">{habit?.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Badge>{percent}% last 30d</Badge>
          <Badge>{streak} day streak</Badge>
        </div>
      </div>

      <div className="mt-3">
        <MiniCalendar habitId={habit._id} map={map} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={toggleArchive}
          disabled={loading}
          className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 flex items-center gap-2"
        >
          {habit.archived ? <><UndoIcon className="w-4 h-4" /> Unarchive</> : <><ArchiveIcon className="w-4 h-4" /> Archive</>}
        </button>

        <button
          onClick={deleteHabit}
          disabled={loading}
          className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 flex items-center gap-2 text-red-300"
        >
          <TrashIcon className="w-4 h-4" /> Delete
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
