
import { createSlice } from '@reduxjs/toolkit';

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: null,
  },
  reducers: {
    setLessons: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLessons } = lessonsSlice.actions;
export const selectLessons = (state:any) => state.lessons.data;

