import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AddHabitForm({ setAdding }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("General");
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Habit name is required");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://habit-tracker-backend-vitw.onrender.com/api/habits",
        { title: name, description, frequency, startDate, category, reminder },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      setAdding(false);
      setMessage("Habit added successfully!");
      // Reset form
      setName("");
      setDescription("");
      setFrequency("daily");
      setStartDate("");
      setCategory("General");
      setReminder("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error adding habit");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:bg-white/10";

  return (
    <motion.form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.input
        className={inputClass}
        placeholder="Habit name *"
        value={name}
        name="title"
        onChange={(e) => setName(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      />
      <motion.input
        className={inputClass}
        placeholder="Description (optional)"
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      />
      <motion.select
        className={inputClass}
        value={frequency}
        name="frequency"
        onChange={(e) => setFrequency(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </motion.select>
      <motion.input
        type="date"
        className={inputClass}
        value={startDate}
        name="startDate"
        onChange={(e) => setStartDate(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      />
      <motion.input
        className={inputClass}
        placeholder="Category (e.g. Health)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      />
      <motion.input
        className={inputClass}
        placeholder="Reminder note (e.g. 7:00 AM)"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
      />

      <motion.div className="md:col-span-2 xl:col-span-3 flex flex-col sm:flex-row items-center gap-3 mt-2">
        <motion.button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#452e06] via-[#d1bf5a] to-[#452e06] text-black font-bold w-full sm:w-auto flex justify-center items-center shadow-lg hover:shadow-amber-400/50 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(209,191,90,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <span className="loader border-2 border-t-2 border-black w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            "Add Habit"
          )}
        </motion.button>
        {error && (
          <motion.span
            className="text-red-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.span>
        )}
        {message && (
          <motion.span
            className="text-green-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.span>
        )}
      </motion.div>
    </motion.form>
  );
}
