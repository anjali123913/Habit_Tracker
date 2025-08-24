import { useState } from "react";
import axios from "axios";

export default function AddHabitForm() {
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
      const token = localStorage.getItem("token"); // JWT token
      const res = await axios.post(
        "https://habit-tracker-backend-vitw.onrender.com/api/habits",
        { title:name, description, frequency, startDate, category, reminder },
        { headers: { Authorization: `Bearer ${token}` } }
      );
console.log(res)
      setMessage("Habit added successfully!");
      // Reset form
      setName("");
      setDescription("");
      setFrequency("daily");
      setStartDate("");
      setCategory("General");
      setReminder("");
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || "Error adding habit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
    >
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        placeholder="Habit name *"
        value={name}
        name="title"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        placeholder="Description (optional)"
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        value={frequency}
        name="frequency"
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <input
        type="date"
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        value={startDate}
        name="startDate"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        placeholder="Category (e.g. Health)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        placeholder="Reminder note (e.g. 7:00 AM)"
        value={reminder}
        
        onChange={(e) => setReminder(e.target.value)}
      />
      <div className="md:col-span-2 xl:col-span-3 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-white text-black font-semibold w-full sm:w-auto flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-2 border-t-2 border-black w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            "Add Habit"
          )}
        </button>
        {error && <span className="text-red-400 text-sm">{error}</span>}
        {message && <span className="text-green-400 text-sm">{message}</span>}
      </div>
    </form>
  );
}
