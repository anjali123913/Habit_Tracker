import { useDispatch } from "react-redux";
import { toggleProgress } from "../store/habitsSlice.js";
import { lastNDates, todayISO } from "../utils/dateUtils.js";

export default function MiniCalendar({ habitId, map }) {
  const dispatch = useDispatch();
  const days = lastNDates(21);

  function toggle(iso) {
    dispatch(toggleProgress({ id: habitId, iso }));
  }

  return (
    <div className="grid grid-cols-21 gap-1">
      {days.map((iso) => {
        const checked = !!map[iso];
        const future = iso > todayISO();

        return (
          <button
            key={iso}
            title={iso}
            onClick={() => !future && toggle(iso)}
            className={`w-4 h-4 rounded ${
              checked
                ? "bg-emerald-400"
                : "bg-white/20 hover:bg-white/30"
            } ${future ? "opacity-30 cursor-not-allowed" : ""}`}
          ></button>
        );
      })}
    </div>
  );
}
