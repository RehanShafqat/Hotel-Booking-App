import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface UserState {
  email: string | null;
  userName?: string | null;
  status?: "succeeded" | "failed" | "loading" | "NavigationLoading" | null;
  error?: string | null;
}

const initialState: UserState = {
  email: null,
  userName: null,
  status: null,
  error: null,
};

//async thunk functions
export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData: object, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/register",
        userData
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData: UserState, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/login",
        userData,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/getUserDetails",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.status = "succeeded";
          state.error = null;
          state.email = action.payload.email;
          state.userName = action.payload.userName;
        }
      )
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.email = action.payload.email;
          state.userName = action.payload.userName;
          state.status = null;
        }
      )
      .addCase(getUserDetails.pending, (state) => {
        state.status = "NavigationLoading";
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.status = null;
      });
  },
});
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
