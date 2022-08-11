import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/user/loginSlice';
import questionsReducer from '../features/poll/pollSlice';
import authReducer from '../features/auth/authSlice';

import { logger } from "./globalSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    authedUser: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat((process.env.NODE_ENV === 'test') ? [] : logger)
});
