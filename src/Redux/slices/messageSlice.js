import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:8080";

// Create async thunk for fetching messages

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (recipientId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;

      if (!token) {
        return rejectWithValue("No authentication token available");
      }

      const response = await axios.post(
        `${baseUrl}/api/list-messages`,
        { recipientId }, // ✅ Send in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch messages"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  isMobileView: false,
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsMobileView, setMessages, addMessage } =
  messageSlice.actions;
export default messageSlice.reducer;
