import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetchAllUsers.js

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      if (!token) {
        console.log("No token available");
        throw new Error("No token available");
      }

      const response = await fetch("http://localhost:8080/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  users: [],
  selectedUser: null,
  token: null,
  activeUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  setSelectedUser,
  setToken,
  setActiveUser,
  setDeactivatedUser,
} = userSlice.actions;
export default userSlice.reducer;
