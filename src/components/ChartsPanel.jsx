import { useSelector } from "react-redux";
import { lastNDates } from "../utils/dateUtils";
import { percentComplete } from "../utils/statsUtils";
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

export default function ChartsPanel() {
  const habits = useSelector((s) => s.habits);
  const progress = useSelector((s) => s.progress);
  const days = lastNDates(14);

  const lineData = days.map((d) => ({
    date: d.slice(5),
    completed: habits.reduce(
      (acc, h) => acc + (progress[h.id]?.[d] ? 1 : 0),
      0
    ),
  }));

  const barData = habits.map((h) => ({
    name: h.name.length > 12 ? h.name.slice(0, 12) + "…" : h.name,
    pct: percentComplete(progress[h.id] || {}, 30),
  }));

  const totalCells = Math.max(habits.length * 30, 1);
  const done = habits.reduce(
    (acc, h) => acc + percentComplete(progress[h.id] || {}, 30),
    0
  );
  const pieData = [
    { name: "Completed", value: done },
    { name: "Remaining", value: Math.max(totalCells - done, 0) },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Line Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold">📈 Completions (last 14 days)</h4>
        </div>
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
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold">📊 % Complete (30d)</h4>
        </div>
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
              <Bar dataKey="pct" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
     <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
  <div className="flex items-center gap-2 mb-2">
    <h4 className="font-semibold">📅 Overall 30d Coverage</h4>
  </div>
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
              fill={entry.name === "Completed" ? "#4ade80" : "#f87171"} // green + red
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>

    {/* Percentage in center */}
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
