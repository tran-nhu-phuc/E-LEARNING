import React, { useEffect, useState } from "react";
import "./myCourses.css";
import { Link } from "react-router-dom";
import { RegisteredCourseService } from "../../services/registeredCourses.service";
import ProgressBar from "@ramonak/react-progress-bar";
import Spin from "../spin/spin";
const MyCourses = () => {
  const [spin, setSpin] = useState<boolean>(true);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [data, setData] = useState([]);
  const registeredCoursesService = new RegisteredCourseService();
  const getData = async () => {
    setSpin(true);
    const result = await registeredCoursesService.getHistory(user?.id);
    setData(result);
    setSpin(false);
  };
  useEffect(() => {
    setSpin(true);
    getData();
  }, []);
  
  return (
    <section className="my_course">
      {spin && <Spin />}
      <div className="my_course_avatars">
        <p>Khóa học của tôi</p>
      </div>
      {data.length === 0 ? (
        <img
          className="my_course_img_empty"
          src="../../../z5298827363811_7cbd9b224bb1d8c041391dd67a2b04cf.jpg"
          alt=""
        />
      ) : (
        <div className="my_course_history">
          {data.length > 0 &&
            data.map((item: any) => {
              return (
                <div className="course_box">
                  <div className="course_box_content">
                    <Link to={`/courses/learning/${item.courseId}`}>
                      <img src={item.course.image} alt="Ảnh chương trình" />
                    </Link>
                    <div className="course_box_content_watch">
                      <Link
                        to={`/courses/learning/${item.courseId}`}
                        className="course_box_content_watch_button"
                      >
                        Vào học
                      </Link>
                    </div>
                  </div>
                  <p className="course_box_title">{item.course.courseName}</p>
                  <div style={{ width: "100%" }} className="di">
                    <ProgressBar
                      maxCompleted={100}
                      completed={
                        Math.floor(item.completedLessons / item.totalLessons) *
                        100
                      }
                      width="100%"
                      height="9px"
                      margin="10px 0 0 0"
                      bgColor="#0051ff"
                      baseBgColor="#9dbcfea8"
                      labelAlignment="left"
                      labelSize="0"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default MyCourses;
