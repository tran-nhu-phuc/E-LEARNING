import React, { useEffect, useState } from "react";
import "./coursesLayout.css";
import CourseSidebar from "../../components/course/courseSidebar/courseSidebar";
import CourseFooter from "../../components/course/courseFooter/footer";
import CourseHeader from "../../components/course/courseHeader/header";

interface Props {
  child: JSX.Element;
}
const CoursesLayout = (props: Props): JSX.Element => {
  return (
    <div className="course_layout">
      <div className="header_course_layout">
        <CourseHeader />
      </div>
      <div className="course_child">{props.child}</div>
      <div className="sidebar_course_layout">
        <CourseSidebar />
      </div>
      <div className="footer_course_layout">
        <CourseFooter />
      </div>
    </div>
  );
};

export default CoursesLayout;
