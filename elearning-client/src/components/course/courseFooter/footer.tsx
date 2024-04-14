import React from "react";
import "./footer.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectLessons } from "../../../store/reducers/lessonsReducer";
import { useDispatch } from "react-redux";
import {
  selectLessonId,
  setLessonId,
} from "../../../store/reducers/lessonIdReduce";
import { setLessonState } from "../../../store/reducers/lessonState";
import { setStateScrollLesson } from "../../../store/reducers/stateScrollLesson";
import { Link } from "react-router-dom";
const CourseFooter = () => {
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const id = useSelector(selectLessonId);
  const handleNextPosition = () => {
    if (!id) {
      const lesson = lessons.find((item: any) => item.position === 2);
      dispatch(setLessonId(lesson.id));
      dispatch(setLessonState(lesson));
    } else {
      const lesson = lessons.find((item: any) => item.id === id);
      const needLesson = lessons.find(
        (item: any) => item.position === lesson.position + 1
      );
      if (needLesson) {
        dispatch(setLessonState(needLesson));
        dispatch(setLessonId(needLesson.id));
      }
      dispatch(setStateScrollLesson());
    }
  };
  const handlePreviousPosition = () => {
    if (!id) {
    } else {
      const lesson = lessons.find((item: any) => item.id === id);
      if (lesson.position === 1) {
      } else {
        const needLesson = lessons.find(
          (item: any) => item.position === lesson.position - 1
        );
        dispatch(setLessonState(needLesson));
        dispatch(setLessonId(needLesson.id));
      }
    }
    dispatch(setStateScrollLesson());
  };
  return (
    <div className="course_footer_container">
      <div className="course_footer_button">
        <Link
          to={`#${id}`}
          onClick={handlePreviousPosition}
          className="course_footer_lesson_button"
        >
          <span>
            <FaChevronLeft />
          </span>
          BÀI TRƯỚC
        </Link>
        <Link
          to={`#${id}`}
          onClick={handleNextPosition}
          className="course_footer_lesson_button"
        >
          BÀI TIẾP THEO
          <span>
            <FaChevronRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CourseFooter;
