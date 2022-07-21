import axios from "axios";
import { clearStore } from "../features/user/userSlice";
import { getTokenFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

customFetch.interceptors.request.use((config: any) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Session Expired! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;