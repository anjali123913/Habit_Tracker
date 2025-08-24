import { useMemo } from "react";
import { useSelector } from "react-redux";
import { computeStreak } from "../utils/statsUtils.js";


const selectHabits = (s) => s.habits; const selectProgress = (s) => s.progress;


export default function useFilteredSortedHabits({ q, status, sortBy, }) {
    const habits = useSelector(selectHabits);
    const progress = useSelector(selectProgress);
    return useMemo(() => {
        let list = habits.filter(h => h.title.toLowerCase().includes(q.toLowerCase()) || h.description.toLowerCase().includes(q.toLowerCase()));
        if (status !== "all") list = list.filter(h => (status === "archived" ? h.archived : !h.archived));
        const streak = (h) => computeStreak(progress[h.id] || {});
        if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title))
        if (sortBy === "created") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sortBy === "streak") list.sort((a, b) => streak(b) - streak(a));
        return list;
    }, [habits, progress, q, status, sortBy]);
}