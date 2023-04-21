import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "quiz",
  initialState: {
    userName: null,
  },
  reducers: {
    handleUserName: (state, action) => {
      state.userName = action.payload;
    },
    logoutHandler: (state) => {
        state.userName = null;
    }
  },
});

export const { handleUserName, logoutHandler } = userSlice.actions;

export default userSlice.reducer;
