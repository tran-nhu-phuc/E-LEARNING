import React, { useEffect, useState } from "react";
import "./saleChart.css";
import { IoStatsChart } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import UserService from "../../../services/user.service";
import CourseService from "../../../services/course.service";
import { MdPlayLesson } from "react-icons/md";
import LessonService from "../../../services/lesson.service";
const SaleChart = () => {
  const userService = new UserService();
  const [users, setUser] = useState<any[]>([]);
  const getUser = async () => {
    const result = await userService.getAllUsers();
    setUser(result);
  };
  const courseService = new CourseService();
  const [courses, setCourses] = useState<any[]>([]);
  const getCourses = async () => {
    const result = await courseService.getAllCourses();
    setCourses(result);
  };
  const lessonService = new LessonService();
  const [lessons, setLessons] = useState<any[]>([]);
  const getLessons = async () => {
    const result = await lessonService.getAllLessons();
    setLessons(result);
  };
  useEffect(() => {
    getUser();
    getCourses();
    getLessons();
  }, []);

  return (
    <div className="saleChart_container">
      <div className="saleChart_body">
        <h3>Info Summary</h3>
        <div className="saleChart_box">
          <div className="saleChart_box_detail_totalSales">
            <div className="saleChart_box_detail_icon_totalSales">
              <IoStatsChart className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0đ</p>
            <p className="saleChart_box_detail_name">Total Sales</p>
          </div>
          <div className="saleChart_box_detail_totalOrders">
            <div className="saleChart_box_detail_icon_totalOrders">
              <FaBox className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0</p>
            <p className="saleChart_box_detail_name">Total Orders</p>
          </div>
          <div className="saleChart_box_detail_totalUsers">
            <div className="saleChart_box_detail_icon_totalUsers">
              <FaUser className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">{users.length}</p>
            <p className="saleChart_box_detail_name">Total Users</p>
          </div>
          <div className="saleChart_box_detail_totalCourses">
            <div className="saleChart_box_detail_icon_totalCourses">
              <FaBook className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">{courses.length}</p>
            <p className="saleChart_box_detail_name">Total Course</p>
          </div>
          <div className="saleChart_box_detail_totalLessons">
            <div className="saleChart_box_detail_icon_totalLessons">
              <MdPlayLesson className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">{lessons.length}</p>
            <p className="saleChart_box_detail_name">Total Lesson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleChart;
