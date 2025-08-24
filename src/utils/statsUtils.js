import { lastNDates } from "./dateUtils.js";
export function computeStreak(map){ let s=0; const days=lastNDates(365).reverse(); for(let i=0;i<days.length;i++){const iso=days[i]; if(map[iso]) s++; else break;} return s; }
export function percentComplete(map, period=30){ const days=lastNDates(period); const done=days.filter((d)=>map[d]).length; return Math.round((done/days.length)*100); }