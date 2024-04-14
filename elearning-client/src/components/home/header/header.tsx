import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IntfCourse } from "../../../types/entities.type";
import CoursesService from "../../../services/course.service";
import UserService from "../../../services/user.service";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import Spin from "../../spin/spin";
const Header = () => {
  const coursesService = new CoursesService();
  const [spin, setSpin] = useState<boolean>(true);
  const [userDb, setUserDb] = useState<any>();
  const [isAvatar, setIsAvatar] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [coursesData, setCoursesData] = useState<IntfCourse[]>([]);
  const userString = localStorage.getItem("user") as string;
  const user = JSON.parse(userString);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/courses") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [location]);
  let goToDetail = useNavigate();
  const toDetails = (id: number | undefined): void => {
    goToDetail("/courses/detail/" + id);
    setSearch("");
  };
  const userService = new UserService();
  const getUser = async () => {
    setSpin(true);
    const result = await userService.getById(user?.id);
    setUserDb(result);
    setSpin(false);
  };
  useEffect(() => {
    setSpin(true);
    getUser();
  }, []);
  const handleSearch = async (e: any) => {
    if (e.target.value !== "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
    }
  };
  useEffect(() => {
    const getCoursesSearch = async () => {
      const coursesSearch = await coursesService.onSearch(search);
      setCoursesData(coursesSearch);
    };
    setTimeout(() => {
      getCoursesSearch();
    }, 1500);
  }, [search]);
  // Avatar
  const [avatars, setAvatars] = useState<any>();
  const [fileUpdate, setFile] = useState<any>();
  const handleAvatar = (e: any) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatars(file);
    setFile(file);
  };
  useEffect(() => {
    return () => {
      avatars && URL.revokeObjectURL(avatars.preview);
    };
  }, [avatars]);
  const handleUpdateAvatar = async () => {
    setSpin(true);
    const formData = new FormData();
    formData.append("avatar", fileUpdate);
    const result = await userService.updateUser(Number(user.id), formData);
    if (result === 1) {
      getUser();
      setSpin(false);
      setIsAvatar(false);
      toast.success("Thay avatar thành công!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      setSpin(false);
      setIsAvatar(false);
      toast.error("Thay avatar tất bại!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <header className="header">
      {spin && <Spin />}
      <Toaster position="top-center" reverseOrder={false} />
      <section className="header_container">
        <div className="header_logo">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="phoenix logo"
            />
          </Link>
          <h4>Học lập trình để đi làm</h4>
        </div>
        <div className="header_search_container">
          {isSearch ? (
            <div className="header_search">
              <IoIosSearch className="header_search_icon" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học..."
                className="header_search_bar"
                id="search_feature"
                onChange={handleSearch}
                value={search}
              />
            </div>
          ) : null}

          {search.length > 0 ? (
            <div className="search_list_detail">
              <ul id="searchList">
                {coursesData.length > 0 ? (
                  coursesData.map((item: any) => (
                    <li
                      className="course_search_name"
                      onClick={() => toDetails(item.id)}
                    >
                      {item.courseName}
                    </li>
                  ))
                ) : (
                  <li className="product_search_none">
                    Bài học này không tồn tại, xin hãy thử lại !
                  </li>
                )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="header_sup_info">
          <p>{`Hi! ${user.firstName} ${user.lastName}`}</p>
          <img
            onClick={() => setIsAvatar(true)}
            src={userDb?.avatar}
            alt="avatar"
          />
          {isAvatar ? (
            <div onClick={() => setIsAvatar(false)} className="header_profiles">
              <div
                onClick={(e: any) => e.stopPropagation()}
                className="header_profile"
              >
                <div className="header_profile_actions">
                  <img
                    src={avatars?.preview ? avatars?.preview : userDb?.avatar}
                    alt="avatar"
                  />
                  <div className="header_profile_action">
                    <label htmlFor="avatar">
                      <CiEdit
                        style={{ fontSize: 30 }}
                        className=".my_course_icon_avatar"
                      />
                    </label>
                    <input
                      onChange={handleAvatar}
                      style={{ display: "none" }}
                      id="avatar"
                      type="file"
                    />
                  </div>
                </div>
                {avatars?.preview ? (
                  <button onClick={handleUpdateAvatar}>Change Avatar</button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </header>
  );
};

export default Header;
