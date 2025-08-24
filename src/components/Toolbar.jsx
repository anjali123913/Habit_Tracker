export default function Toolbar({ q, setQ, status, setStatus, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
      
      {/* Search Input */}
      <div className="relative w-full lg:w-auto">
        {/* 🔍 Emoji instead of Search Icon */}
        <span className="absolute left-3 top-2.5 text-white/60">🔍</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search habits"
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-white/20 outline-none"
        />
      </div>

      {/* Filter Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 w-full lg:w-auto"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>

      {/* Sorting Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={`px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 flex items-center gap-2 ${
            sortBy === "name" ? "bg-white/10" : ""
          }`}
        >
          ↕️ Name
        </button>

        <button
          onClick={() => setSortBy("streak")}
          className={`px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 flex items-center gap-2 ${
            sortBy === "streak" ? "bg-white/10" : ""
          }`}
        >
          ↕️ Streak
        </button>

        <button
          onClick={() => setSortBy("created")}
          className={`px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 flex items-center gap-2 ${
            sortBy === "created" ? "bg-white/10" : ""
          }`}
        >
          ↕️ Newest
        </button>
      </div>
    </div>
  );
}
