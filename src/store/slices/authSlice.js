import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.withCredentials = true;
import { BASE_API_URL, api as baseApi } from "../../components/api/api";

const api = BASE_API_URL;

export const login = createAsyncThunk("/login", async (credentials) => {
  const response = await baseApi.post(`/login`, credentials);
  return response.data;
  //console.log(credentials);
  //return credentials;
});

export const register = createAsyncThunk("/register", async (formdata) => {
  const response = await baseApi.post(`/register`, formdata);

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { user: null, token: "" },
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("loginfull", action);
        state.loading = false;
        state.user = action.payload;
        // console.log;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
