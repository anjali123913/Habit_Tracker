import { createSlice, nanoid } from "@reduxjs/toolkit";
import api from "../api/localApi.js";
import { isFuture, todayISO } from "../utils/dateUtils.js";


const initialState = { habits: [], progress: {}, loaded: false };


const slice = createSlice({
name: "habits",
initialState,
reducers: {
stateLoaded(state, action) {
state.habits = action.payload.habits || [];
state.progress = action.payload.progress || {};
state.loaded = true;
},
addHabit: {
reducer(state, action) { state.habits.push(action.payload); },
prepare({ name, description, frequency, startDate, category, reminder }) {
return {
payload: {
id: nanoid(),
name: name.trim(),
description: description?.trim() || "",
frequency: frequency || "daily",
startDate: startDate || todayISO(),
category: category || "General",
reminder: reminder || "",
createdAt: new Date().toISOString(),
archived: false,
},
};
},
},
updateHabit(state, action) {
const { id, changes } = action.payload;
const h = state.habits.find((x) => x.id === id);
if (h) Object.assign(h, changes);
},
toggleProgress(state, action) {
const { id, iso } = action.payload;
if (isFuture(iso)) return;
if (!state.progress[id]) state.progress[id] = {};
state.progress[id][iso] = !state.progress[id][iso];
if (!state.progress[id][iso]) delete state.progress[id][iso];
},
toggleArchive(state, action) {
const h = state.habits.find((x) => x.id === action.payload);
if (h) h.archived = !h.archived;
},
deleteHabit(state, action) {
state.habits = state.habits.filter((h) => h.id !== action.payload);
delete state.progress[action.payload];
},
clearAll(state) { state.habits = []; state.progress = {}; },
},
});


export const { stateLoaded, addHabit, updateHabit, toggleProgress, toggleArchive, deleteHabit, clearAll } = slice.actions;
export default slice.reducer;


// persist
let snapshot;
export const subscribePersistence = (store) => {
store.subscribe(() => {
const s = store.getState();
if (snapshot !== s) {
snapshot = s;
api.save({ habits: s.habits, progress: s.progress });
}
});
};