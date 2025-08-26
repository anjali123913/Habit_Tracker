import { useState, useEffect } from "react";
import axios from "axios";

export default function MiniCalendar({ habit, habitId, map = {}, onUpdate }) {
  const [localMap, setLocalMap] = useState({});
  const token = localStorage.getItem("token");

  // Convert timestamp array → map with YYYY-MM-DD keys
  useEffect(() => {
    const dateMap = {};

    if (habit?.customDays?.length) {
      habit.customDays.forEach((ts) => {
        const day = new Date(ts).toISOString().slice(0, 10); // "YYYY-MM-DD"
        dateMap[day] = true;
      });
    }

    setLocalMap({ ...map, ...dateMap });
  }, [habit, map]);

  // Toggle check-in/uncheck
  const toggleCheckin = async (date) => {
    const alreadyChecked = !!localMap[date];
    const newMap = { ...localMap, [date]: !alreadyChecked };

    // Optimistic update
    setLocalMap(newMap);

    try {
      const res = await axios.post(
        `https://habit-tracker-backend-vitw.onrender.com/api/habits/${habitId}/checkin`,
        { date, checked: !alreadyChecked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      if (onUpdate) onUpdate(res.data); // Update HabitRow/chart
    } catch (err) {
      console.error("Error toggling checkin:", err);
      setLocalMap(map); // rollback
    }
  };

  // Last 30 days
  const days = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i)); // oldest → newest
    return date.toISOString().slice(0, 10);
  });

  return (
    <div className="grid grid-cols-7 gap-2 p-2">
      {days.map((day) => (
        <div
          key={day}
          onClick={() => toggleCheckin(day)}
          className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer text-sm font-medium
            ${localMap[day] ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}
          `}
          title={day}
        >
          {new Date(day).getDate()}
        </div>
      ))}
    </div>
  );
}
