import React from "react";
import { MdHome } from "react-icons/md";
import { HiBookOpen } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRFill } from "react-icons/ri";
import UserService from "../../../services/user.service";
const Sidebar = () => {
  const navigate = useNavigate()
  const userService = new UserService();
  const handleLogout = async () => {
    await userService.logout();
    navigate("/login", {state: "logout"})
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return (
    <section className="sidebar">
      <div className="sidebar_body">
        <Link to={"/"}>
          <div className="sidebar_nav">
            <MdHome className="sidebar_nav_icon" />
            <p>Trang chủ</p>
          </div>
        </Link>
        <Link to={"/courses"}>
          <div className="sidebar_nav">
            <HiBookOpen className="sidebar_nav_icon" />
            <p>Bài học</p>
          </div>
        </Link>
        <Link to={"/courses/history"}>
          <div className="sidebar_nav">
            <FaHistory className="sidebar_nav_icon" />
            <p>Lịch sử</p>
          </div>
        </Link>
        <div className="logout">
          <a onClick={handleLogout}>
            <div className="sidebar_nav">
              <RiLogoutCircleRFill className="sidebar_nav_icon" />
              <p>Đăng xuất</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
