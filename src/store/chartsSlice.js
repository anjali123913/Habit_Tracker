// store/chartsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk
export const fetchChartsData = createAsyncThunk(
  "charts/fetchChartsData",
  async () => {
    const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://habit-tracker-backend-vitw.onrender.com/api/habits",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
    return res.data.habits; // { habits: [], progress: {} }
  }
);

const chartsSlice = createSlice({
  name: "charts",
  initialState: {
    habits: [],
    progress: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartsData.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload.habits;
        state.progress = action.payload.progress;
      })
      .addCase(fetchChartsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chartsSlice.reducer;
