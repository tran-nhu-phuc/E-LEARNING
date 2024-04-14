
import { createSlice } from '@reduxjs/toolkit';

export const lessonIdSlice = createSlice({
  name: 'lessonId',
  initialState: {id:null},
  reducers: {
    setLessonId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setLessonId } = lessonIdSlice.actions;
export const selectLessonId = (state:any) => state.lessonId.id;
