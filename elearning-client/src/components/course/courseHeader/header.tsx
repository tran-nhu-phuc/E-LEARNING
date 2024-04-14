import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDetailRegisteredCourse } from "../../../store/reducers/detailRegisteredCourse";
const CourseHeader = () => {
  const detailRegisteredCourse = useSelector(selectDetailRegisteredCourse);
  return (
    <header className="course_header_container">
      <div className="course_header_info">
        <Link to={"/"} className="course_header_back">
          <FaChevronLeft />
        </Link>
        <Link to={"/"}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
            alt="phoenix logo"
          />
        </Link>
        <p> {detailRegisteredCourse?.course.courseName} </p>
      </div>
      <div className="course_header_progress">
        <div className="course_header_progress_lesson">
          <p>
            Hoàn thành{" "}
            <span className="course_header_progress_total">{`${detailRegisteredCourse?.completedLessons} / ${detailRegisteredCourse?.totalLessons}`}</span>{" "}
            bài học
          </p>
        </div>
          <p>
            {Math.floor(
              (detailRegisteredCourse?.completedLessons /
                detailRegisteredCourse?.totalLessons) *
                100
            )}
            %
          </p>
      </div>
    </header>
  );
};

export default CourseHeader;
