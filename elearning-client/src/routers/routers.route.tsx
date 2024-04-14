import React from "react";
import DefaultLayout from "../layouts/default/defaultLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/homePage/home";
import CoursesLayout from "../layouts/course/coursesLayout";
import MyCourses from "../components/myCourses/myCourses";
import CoursePage from "../components/course/coursePage/course";
import Login from "../components/login/loginPage/login";
import Learning from "../components/course/courseLesson/lesson";
import CourseDetail from "../components/courseDetail/courseDetail";
import PrivateRouter from "./private.route";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<DefaultLayout child={<Home />} />} />
          <Route
            path="/courses"
            element={<DefaultLayout child={<CoursePage />} />}
          />
          <Route
            path="/courses/learning/:id"
            element={<CoursesLayout child={<Learning />} />}
          />
          <Route
            path="/courses/detail/:id"
            element={<DefaultLayout child={<CourseDetail />} />}
          />
          <Route
            path="/courses/history"
            element={<DefaultLayout child={<MyCourses />} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
