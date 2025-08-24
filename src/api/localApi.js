const KEY = "habit-tracker-state-v1";
const api = {
load: async () => {
const raw = localStorage.getItem(KEY);
return raw ? JSON.parse(raw) : { habits: [], progress: {} };
},
save: async (state) => {
localStorage.setItem(KEY, JSON.stringify(state));
},
};
export default api;