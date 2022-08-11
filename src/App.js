import React from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';

import { connect } from "react-redux";
import { useEffect } from "react";

import Nav from './features/nav/Nav';
import AddPollPage from "./features/poll/AddPollPage";
import LoginPage from './features/user/LoginPage';
import DashboardPage from "./features/dashboard/DashboardPage";
import LeaderboardPage from "./features/leaderboard/LeaderboardPage";

import { RequireAuth } from "./features/auth/authSlice";
import { executeGlobalDataFetch } from "./app/globalSlice";

import './App.css';
import PollPage from "./features/poll/PollPage";
import ErrorPage from "./ErrorPage";

// TODO: Draft (unit) tests
// TODO: Remove 'status' from the *users* and *questions* state slices (see below).
// TODO: Add react-redux-loading-bar

const App = ({ redirect, dispatch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // *executeGlobalDataFetch* can fire twice under certain conditions.  Based on the
    // info found at the following links:
    // - https://stackoverflow.com/questions/60618844
    // - https://beta.reactjs.org/learn/you-might-not-need-an-effect
    // The <React.StrictMode /> component renders components twice in development
    // environments.  This does not occur in production environments.
    dispatch(executeGlobalDataFetch());
  }, [dispatch, navigate, redirect]);

  return (
    <div className={"text-center App"}>
      <Nav />
      <Routes>
        <Route path={"*"} element={<ErrorPage />} />
        <Route path={"/"} exact element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/leaderboard"} element={<RequireAuth><LeaderboardPage /></RequireAuth>} />
        <Route path={"/add"} element={<RequireAuth><AddPollPage /></RequireAuth>} />
        <Route path={"/questions/:id"} element={<RequireAuth><PollPage /></RequireAuth>} />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ authedUser : { value }}) => {
  return { redirect: !(value) };
};

export default connect(mapStateToProps)(App);
