
import { createSlice } from '@reduxjs/toolkit';

export const lessonStateSlice = createSlice({
  name: 'lessonState',
  initialState: {data:null},
  reducers: {
    setLessonState: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLessonState } = lessonStateSlice.actions;
export const selectLessonState = (state:any) => state.lessonState.data;
