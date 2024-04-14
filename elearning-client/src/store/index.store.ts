import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { lessonsSlice } from './reducers/lessonsReducer';
import { lessonIdSlice } from './reducers/lessonIdReduce';
import { lessonStateSlice } from './reducers/lessonState';
import { detailRegisteredCourseSlice } from './reducers/detailRegisteredCourse';
import { stateScrollLessonSlice } from './reducers/stateScrollLesson';


const rootReducer = combineReducers({
    lessons : lessonsSlice.reducer,
    lessonId: lessonIdSlice.reducer,
    lessonState: lessonStateSlice.reducer,
    detailRegisteredCourse: detailRegisteredCourseSlice.reducer,
    stateScrollLesson: stateScrollLessonSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
export default store