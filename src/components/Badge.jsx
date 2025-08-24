export default function Badge({ children, className="" }){
return <span className={"px-2 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 "+className}>{children}</span>;
}