import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authedUser',
  initialState: { value: null },
  reducers: {
    setAuthedUser: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setAuthedUser } = authSlice.actions;

export default authSlice.reducer;