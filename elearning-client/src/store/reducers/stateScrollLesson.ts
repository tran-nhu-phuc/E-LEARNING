
import { createSlice } from '@reduxjs/toolkit';

export const stateScrollLessonSlice = createSlice({
  name: 'stateScrollLesson',
  initialState: false,
  reducers: {
    setStateScrollLesson: (state) => {
      return state = !state;
    },
  },
});

export const { setStateScrollLesson } = stateScrollLessonSlice.actions;
export const selectStateScrollLesson = (state:any) => state.stateScrollLesson;
