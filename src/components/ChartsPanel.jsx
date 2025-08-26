import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ----------------------------
// 🔹 Utility: last N dates
// ----------------------------
function lastNDates(n) {
  const out = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const t = new Date(d);
    t.setDate(d.getDate() - i);
    out.push(t.toISOString().slice(0, 10));
  }
  return out.reverse();
}

// ----------------------------
// 🔹 Chart Panel Component
// ----------------------------
export default function ChartsPanel({ habits }) {
  // -------------------------------
  // Helper: convert timestamps OR ISO strings → yyyy-mm-dd
  // -------------------------------
  const normalizeDays = (habit) =>
    (habit.customDays || [])
      .map((ts) => {
        const d = new Date(ts); // ✅ handle both ISO string & timestamp
        if (isNaN(d)) return null;
        return d.toISOString().slice(0, 10);
      })
      .filter(Boolean);

  // -------------------------------
  // Line Chart (last 14 days)
  // -------------------------------
  const days14 = lastNDates(14);
  const lineData = days14.map((d) => {
    const completed = habits.reduce((acc, h) => {
      const habitDays = normalizeDays(h);
      return acc + (habitDays.includes(d) ? 1 : 0);
    }, 0);

    return {
      date: d.slice(5), // MM-DD
      completed,
      status: completed > 0 ? "done" : "missed", // ✅ green/red dot
    };
  });

  // -------------------------------
  // Bar Chart (% completion in 30 days)
  // -------------------------------
  const days30 = lastNDates(30);
  const barData = habits.map((h) => {
    const habitDays = normalizeDays(h);
    const doneCount = days30.filter((d) => habitDays.includes(d)).length;
    const pct = Math.round((doneCount / days30.length) * 100);

    return {
      name: h.title?.length > 12 ? h.title.slice(0, 12) + "…" : h.title,
      pct,
    };
  });

  // -------------------------------
  // Pie Chart (Overall coverage in 30 days)
  // -------------------------------
  const totalCells = Math.max(habits.length * 30, 1);
  const done = habits.reduce((acc, h) => {
    const habitDays = normalizeDays(h);
    return acc + days30.filter((d) => habitDays.includes(d)).length;
  }, 0);

  const pieData = [
    { name: "Completed", value: done },
    { name: "Remaining", value: Math.max(totalCells - done, 0) },
  ];

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Line Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="font-semibold mb-2">📈 Completions (last 14 days)</h4>
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 10, bottom: 0, left: -10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#4ade80"
                strokeWidth={2}
                dot={({ cx, cy, payload }) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={payload.status === "done" ? "#4ade80" : "#f87171"} // ✅ green/red
                  />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="font-semibold mb-2">📊 % Complete (30d)</h4>
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 5, right: 10, bottom: 0, left: -10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="pct">
                {barData.map((entry, index) => (
                  <Cell
                    key={`${index}`}
                    fill={entry.pct >= 50 ? "#4ade80" : "#f87171"} // ✅ green/red
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="font-semibold mb-2">📅 Overall 30d Coverage</h4>
        <div className="h-56 sm:h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                labelLine={false}
              >
                {pieData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.name === "Completed" ? "#4ade80" : "#f87171"} // ✅ green/red
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>

          {/* % in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-lg font-bold">
              {Math.round((done / totalCells) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}