export const todayISO = () => new Date().toISOString().slice(0, 10);
export const isFuture = (iso) => iso > todayISO();
export function lastNDates(n) {
const out = []; const d = new Date();
for (let i = 0; i < n; i++) { const t = new Date(d); t.setDate(d.getDate() - i); out.push(t.toISOString().slice(0,10)); }
return out.reverse();
}