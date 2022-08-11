import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {_getUsers, _getQuestions } from "../utils/_DATA";

// TODO: Refactor this file!  It does not appear necessary to have a 'global' slice.
const initialState = { users: {}, questions: {} };

/**
 * Hydrates the application with data (initial load).
 * Just learned that you can capture the async action's resolution
 * in a reducer defined elsewhere.
 *
 * @type {AsyncThunk<Awaited<unknown>[], void, {}>}
 */
export const executeGlobalDataFetch = createAsyncThunk(
  'global/dataFetch',
  async () => {
    return await Promise.all([_getUsers(), _getQuestions()]);
  }
);

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The action: ', action);
  const result = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return result;
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executeGlobalDataFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(executeGlobalDataFetch.fulfilled, (state, action) => {
        const [ users, questions ] = action.payload;
        return { ...state, users, questions, status: 'idle' };
      });
  }
});

export default globalSlice.reducer;