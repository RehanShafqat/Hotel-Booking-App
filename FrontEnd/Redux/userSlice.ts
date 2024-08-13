import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface UserState {
  email: string | null;
  userName: string | null;
  status?: "succeeded" | "failed" | null;
  error?: string | null;
}

const initialState: UserState = {
  email: null,
  userName: null,
  status: null,
  error: null,
};
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.email = null;
      state.error = null;
      state.status = null;
      state.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
