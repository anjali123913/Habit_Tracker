import Badge from "./Badge.jsx";
import { Link } from "react-router-dom";
export default function Header(){
return (
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
<div>
<h1 className="text-2xl md:text-3xl font-bold">Habit Tracker</h1>
<p className="text-white/60 text-sm md:text-base">Track habits, build streaks, and visualize progress.</p>
</div>
<div className="flex flex-wrap items-center gap-2">
<Link to="/login">Login</Link>
<Link to="/singup">Singup</Link>


</div>
</div>
);
}