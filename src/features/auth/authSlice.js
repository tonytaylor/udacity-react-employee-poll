import { createSlice } from "@reduxjs/toolkit";
import {Navigate, useLocation} from 'react-router-dom';
import * as React from 'react';
import { useDispatch, useStore } from "react-redux";


export const useAuth = () => {
  const dispatch = useDispatch();
  const store = useStore();

  return {
    getAuthed() {
      const { authedUser } = store.getState();
      return authedUser;
    },
    login(authedUser) {
      return new Promise((res) => {
        dispatch(setAuthedUser(authedUser));
        res(true);
      })
    },
    logout() {
      return new Promise((res) => {
        dispatch(setAuthedUser(null));
        res(true);
      })
    }
  }
};

export const authSlice = createSlice({
  name: 'authedUser',
  initialState: { value: null },
  reducers: {
    setAuthedUser: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const RequireAuth = ({children}) => {
  const { getAuthed } = useAuth();
  const location = useLocation();

  console.log('current location:', location.pathname);
  return (getAuthed().value)
    ? children
    : <Navigate to={"/login"} state={{path: location.pathname}} />;
};

export const { setAuthedUser } = authSlice.actions;

export default authSlice.reducer;