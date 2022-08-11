
import { createSlice } from "@reduxjs/toolkit";
import { executeGlobalDataFetch } from "../../app/globalSlice";

const initialState = {

};

// TODO: Complete <RegistrationForm />; It should create a new record in *users* with id supplied in form.

export const loginSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*.addCase(executeGlobalDataFetch.pending, (state) => {
        state.status = 'loading';
      })*/
      .addCase(executeGlobalDataFetch.fulfilled, (state, action) => {
        const [ users ] = action.payload;
        return { ...state, ...users, status: 'idle' };
      });
  }
});

export const { registerUser, loadUsers } = loginSlice.actions;

export default loginSlice.reducer;