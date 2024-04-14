import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout/defaultLayout";
import AdminHome from "../components/home/homePage/homePage";
import AdminCourse from "../components/courses/adminCourse";
import AdminMessages from "../components/comments/comment";
import AdminUsers from "../components/users/users";
import AdminLogin from "../components/login/login";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<AdminHome />} />} />
        <Route
          path="/admins/Courses"
          element={<DefaultLayout child={<AdminCourse />} />}
        />
        <Route
          path="/admins/Comments"
          element={<DefaultLayout child={<AdminMessages />} />}
        />
        <Route
          path="/admins/Users"
          element={<DefaultLayout child={<AdminUsers />} />}
        />
        <Route path="/admins/Login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default Routers;
