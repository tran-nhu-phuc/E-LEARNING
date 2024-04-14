import React, { useEffect, useMemo, useState } from "react";
import "./courseDetail.css";
import { MdOutlineSpeed } from "react-icons/md";
import { FaFilm } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBatteryFull } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CoursesService from "../../services/course.service";
import { Link, useParams } from "react-router-dom";
import {
  formatDuration,
  formatDurationTitle,
} from "../../common/formatDuration.common";
import formatPrice from "../../common/formatPrice.common";
import { RegisteredCourseService } from "../../services/registeredCourses.service";
import toast, { Toaster } from "react-hot-toast";
import PaypalComponent from "../paypal/paypal";
import Spin from "../spin/spin";
const CourseDetail = () => {
  const [spin, setSpin] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [courseDetail, setCourseDetail] = useState<any>();
  const [detailRegisteredCourse, setDetailRegisteredCourse] = useState<any>();
  const courseService = new CoursesService();
  const registeredCourseService = new RegisteredCourseService();
  let param: any = useParams();
  let idCourse: number = param.id;
  const user = JSON.parse(localStorage.getItem("user") as string);
  const getCourses = async () => {
    const result: any = await courseService.getCoursesById(idCourse);
    setCourseDetail(result);
  };
  const getDetailRegisteredCourse = async () => {
    const result: any =
      await registeredCourseService.getDetailRegisteredCourseUser(
        user?.id,
        idCourse
      );
    if (result) {
      setDetailRegisteredCourse(result);
    } else {
      setDetailRegisteredCourse(0);
    }
  };
  useEffect(() => {
    setSpin(true);
    getCourses();
    getDetailRegisteredCourse();
    setSpin(false);
  }, []);
  useMemo(() => {
    const result = courseDetail?.lessons.reduce(
      (init: number, item: any) => init + item.duration,
      0
    );
    setDuration(result);
  }, [courseDetail]);

  const renderCourseIndex = () => {
    if (!courseDetail || !courseDetail.completedContent) return null;
    const completedContents = courseDetail.completedContent.split(".");
    return completedContents.map((content: string) => (
      <div className="course_detail_mini_title_checkLine">
        <FaCheck className="checkLine_icon" />
        <p>{content.trim()}</p>
      </div>
    ));
  };
  //
  const handlePaymentFree = async () => {
    setSpin(true);
    if (courseDetail?.price === 0) {
      const form = {
        courseId: idCourse,
        userId: user?.id,
        totalLessons: courseDetail?.lessons.length,
        price: 0,
      };
      await registeredCourseService.create(form);
      await getDetailRegisteredCourse();
      toast.success("Đăng ký học thành công!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setSpin(false);
    }
  };
  const amount = useMemo(() => {
    return Math.floor(courseDetail?.price / 24000);
  }, [courseDetail]);
  return (
    <div className="course_detail_container">
      {spin && <Spin />}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="course_detail_container_body">
        <div className="course_detail_main">
          <div className="course_detail_main_title">
            <h1>{courseDetail?.courseName}</h1>
            <p className="course_detail_main_desc">
              {courseDetail?.description}
            </p>
          </div>
          <div className="course_detail_mini_title">
            <h2>Bạn sẽ học được gì</h2>
            <div className="course_detail_mini_title_info">
              {renderCourseIndex()}
            </div>
          </div>
          <div className="course_detail_mini_title">
            <h2>Nội dung khóa học</h2>
            <div className="course_detail_mini_title_courseInfo">
              <p>
                <b>{courseDetail?.lessons.length}</b> bài học
              </p>
              <p>
                Thời lượng <b>{formatDurationTitle(Number(duration))}</b>
              </p>
            </div>
            <ul className="course_detail_mini_title_courseIndex">
              {courseDetail?.lessons.length > 0 &&
                courseDetail?.lessons
                  .slice()
                  .sort((a: any, b: any) => a.position - b.position)
                  .map((lesson: any) => {
                    return (
                      <li className="course_detail_mini_title_courseIndex_detail">
                        <p>
                          <span>{lesson.position}.</span> {lesson.title}
                        </p>
                        <span>{formatDuration(lesson.duration)}</span>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className="course_detail_mini_title">
            <h2>Yêu cầu</h2>
            <div className="course_detail_mini_title">
              <div className="course_detail_mini_title_info_request">
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS).
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không
                    ngại cái khó.
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Không được nóng vội, bình tĩnh học, làm bài tập sau mỗi bài
                    học.
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho
                    bạn những gì bạn cần phải biết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course_detail_aside">
          <Link to={`/courses/learning/${idCourse}`}>
            <img src={courseDetail?.image} alt={courseDetail?.courseName} />
          </Link>
          <p className="course_detail_aside_price">
            {courseDetail && courseDetail?.price !== 0
              ? formatPrice(courseDetail?.price)
              : "Miễn phí"}
          </p>
          {detailRegisteredCourse ? (
            <Link
              to={`/courses/learning/${idCourse}`}
              className="course_detail_aside_button"
            >
              VÀO HỌC
            </Link>
          ) : courseDetail?.price === 0 ? (
            <button
              onClick={handlePaymentFree}
              className="course_detail_aside_button"
            >
              ĐĂNG KÝ HỌC
            </button>
          ) : (
            <PaypalComponent data={courseDetail} amount={amount} />
          )}
          <div className="course_detail_aside_info">
            <div className="course_detail_aside_info_line">
              <MdOutlineSpeed />
              <p>
                {courseDetail?.level === 1 ? "Trình độ cơ bản" : null}
                {courseDetail?.level === 2 ? "Trình độ trung bình" : null}
                {courseDetail?.level === 3 ? "Trình độ nâng cao" : null}
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaFilm />
              <p>
                Tổng số <b>{courseDetail?.lessons.length}</b> bài học
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaClock />
              <p>
                Thời lượng <b>{formatDurationTitle(duration)}</b>
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaBatteryFull />
              <p>
                {courseDetail?.lessons.length !== 0
                  ? "Giáo trình đầy đủ"
                  : "Giáo trình chuẩn bị ra mắt"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
