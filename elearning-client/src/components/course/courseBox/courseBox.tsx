import React from "react";
import "./courseBox.css";
import { Link } from "react-router-dom";
const CourseBox = () => {
  return (
    <div className="course_box">
      <div className="course_box_content">
        <Link to={"learning/1"}>
          <img
            className="CommonItem_thumb__ew8Jj"
            src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
            alt="Kiến Thức Nhập Môn IT"
          />
        </Link>
      </div>
      <Link to={"learning/1"}>
        <p className="course_box_title">Kiến thức nhập môn IT</p>
      </Link>
      <p className="course_box_price">Miễn phí</p>
    </div>
  );
};

export default CourseBox;
