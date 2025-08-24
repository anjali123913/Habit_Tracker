import { Plus } from "lucide-react";
export default function EmptyState(){
return (
<div className="text-center py-14 border border-dashed border-white/10 rounded-2xl">
<div className="mx-auto w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4"><Plus/></div>
<h3 className="text-xl font-semibold mb-1">Create your first habit</h3>
<p className="text-white/60">Add a habit, then tap on days to mark progress. Data stays in your browser.</p>
</div>
);
}