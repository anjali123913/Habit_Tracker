import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stateLoaded } from "../store/habitsSlice.js";
import api from "../api/localApi.js";


export default function useLoadState(){
const dispatch = useDispatch();
useEffect(() => { (async()=>{ const data = await api.load(); dispatch(stateLoaded(data)); })(); }, [dispatch]);
}