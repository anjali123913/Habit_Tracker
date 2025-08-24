import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habitsSlice.js";


const store = configureStore({ reducer: habitsReducer });


export default store;