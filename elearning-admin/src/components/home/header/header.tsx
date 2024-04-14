import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { ToastWarning } from "../../../common/toastify.common";

const Header = () => {
  const navigate = useNavigate();
  const [adminFirstName, setAdminFirstName] = useState("");

  useEffect(() => {
    const adminAccessToken = localStorage.getItem("admin");
    if (!adminAccessToken) {
      navigate("/admins/login");
      ToastWarning("You have to Login to access!");
    } else {
      const adminInfo = JSON.parse(localStorage.getItem("admin") || "{}");
      const firstName = adminInfo.admin.firstName;
      if (firstName) {
        const firstLetter = firstName.charAt(0).toUpperCase();
        setAdminFirstName(firstLetter);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admins/login");
  };

  return (
    <header className="header">
      <section className="header_container">
        <div className="header_logo">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="phoenix logo"
            />
          </Link>
          <h4>Phoenix Academy</h4>
        </div>
        <div className="header_info">
          <div className="header_info_admin">
            <div className="header_info_admin_avatar">
              <p>{adminFirstName}</p>
            </div>
            <p>Admin</p>
          </div>
          <button className="header_info_button" onClick={handleLogout}>
            <RiLogoutBoxRLine className="header_info_button_icon" />
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
