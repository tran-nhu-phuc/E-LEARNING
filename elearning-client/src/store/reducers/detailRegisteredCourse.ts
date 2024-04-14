import { createSlice } from '@reduxjs/toolkit';

export const detailRegisteredCourseSlice = createSlice({
  name: 'detailRegisteredCourse',
  initialState: {data:null},
  reducers: {
    setDetailRegisteredCourse: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDetailRegisteredCourse } = detailRegisteredCourseSlice.actions;
export const selectDetailRegisteredCourse = (state:any) => state.detailRegisteredCourse.data;