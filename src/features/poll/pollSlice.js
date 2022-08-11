
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { executeGlobalDataFetch } from "../../app/globalSlice";
import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "../../utils/_DATA";


export const addAndSaveQuestion = (optionOneText, optionTwoText, author) => {
  // TODO: Refactor to no longer use *hackedAuthedUser*
  return async (dispatch) => {
    // console.log('in thunk', optionOneText, optionTwoText, author);
    await _saveQuestion({
      optionOneText,
      optionTwoText,
      author
    });

    dispatch(executeGlobalDataFetch());
  };
};

export const saveAnswerToRemote = ({ authedUser, questionId, answer }) => {
  return async (dispatch) => {
    // console.log('dispatching to remote:', authedUser);
    await _saveQuestionAnswer({ authedUser, qid: questionId, answer });

    dispatch(executeGlobalDataFetch());
  }
};

export const executeQuestionDataFetch = createAsyncThunk(
  'questions/dataFetch',
  async () => await _getQuestions()
);

export const pollSlice = createSlice({
  name: 'questions',
  initialState: {},
  reducers: {
    addQuestion: (state, action) => {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeGlobalDataFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(executeGlobalDataFetch.fulfilled, (state, action) => {
        const [ , questions ] = action.payload;
        return { ...state, ...questions, status: 'idle' };
      })
      .addCase(executeQuestionDataFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(executeQuestionDataFetch.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: 'idle' };
      })
  }
});

export const { addQuestion } = pollSlice.actions;

export default pollSlice.reducer;