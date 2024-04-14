import React, { useEffect } from "react";
import "./home.css";
import Banner from "../banner/banner";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { RiListOrdered } from "react-icons/ri";
import { BsTranslate } from "react-icons/bs";
import { IoBook } from "react-icons/io5";
import { FaLaptop } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state === "login") {
      toast.success("Đăng nhập thành công!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [location]);
  return (
    <main className="home">
      <section className="home_container">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="home_banner">
          <Banner />
        </div>
        <div className="home_info_introduction1">
          <div className="home_info_detail">
            <div className="home_info_detail_box">
              <h2>CÓ PHẢI BẠN TỪNG NGHĨ RẰNG:</h2>
              <p>● Lập trình viên là một nghề rất xa vời?</p>
              <p>● Rất khó để có thể học được nghề lập trình?</p>
              <p>
                ● Công việc lập trình chỉ dành cho những người rất giỏi toán?
              </p>
              <p>
                ● Phải rất am hiểu về công nghệ thì mới theo được lập trình?
              </p>
            </div>
            <div className="home_info_detail_box">
              <h2>HAY BẠN THÍCH HỌC LẬP TRÌNH NHƯNG KHÁ LO LẮNG:</h2>
              <p>
                ● Mình đã không học hành gì trong nhiều năm nên khó để đi học
                lại?
              </p>
              <p>
                ● Học 4 năm đại học còn không xong thì làm sao học được trong
                vài tháng?
              </p>
              <p>● Mình lớn tuổi thế này thì bắt đầu có muộn quá không?</p>
              <p>
                ● Mình không biết tiếng Anh thì không biết có học lập trình được
                không??
              </p>
            </div>
          </div>
          <div className="home_info_img">
            <img
              src="https://glints.com/vn/blog/wp-content/uploads/2022/11/Hoc-viet-Code-co-ban-mang-lai-nhieu-loi-ich.jpg"
              alt="hình ảnh code của học sinh"
            />
          </div>
        </div>
        <div className="home_info_introduction2">
          <h2> BẮT ĐẦU KHÔNG KHÓ</h2>
          <p>
            Phoenix dìu dắt học viên từ khi non nớt cho đến khi trưởng thành
          </p>
          <div className="home_info_introduction2_box">
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <FcAlphabeticalSortingAz className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>BẮT ĐẦU TỪ SỐ 0</h4>
                <p>
                  Chương trình được thiết kế dành cho người không biết gì về
                  ngành CNTT và lập trình. Bắt đầu với những việc nhỏ nhất như
                  gõ bàn phím, cài đặt phần mềm, tìm kiếm thông tin
                </p>
              </div>
            </div>
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <RiListOrdered className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>TRẢI NGHIỆM DỄ ĐẾN KHÓ</h4>
                <p>
                  Các trải nghiệm của học viên được thiết kế cẩn thận để giúp
                  người mới dễ dàng bắt được nhịp. Chương trình của tháng đầu
                  tiên đã được cải tiến qua 6 phiên bản trong 2 năm
                </p>
              </div>
            </div>
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <BsTranslate className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>HỌC BẰNG TIẾNG VIỆT</h4>
                <p>
                  Toàn bộ tài liệu học tập đều là tiếng Việt giúp dễ học, dễ
                  hiểu. Các từ vựng tiếng Anh chuyên ngành được đan xen phù hợp
                  để trang bị dần cho học viên khả năng tra cứu tài liệu
                </p>
              </div>
            </div>
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <IoBook className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>HỌC ĐƯỢC</h4>
                <p>
                  Chương trình được thiết kế cá nhân hóa, bám sát theo lực học
                  từng học viên. Đảm bảo bất cứ ai, ở trình độ nào cũng có thể
                  học được, hiểu được, thực hành được, tiến bộ được
                </p>
              </div>
            </div>
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <FaLaptop className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>LÀM ĐƯỢC</h4>
                <p>
                  Mỗi lớp học đều có các huấn luyện viên hỗ trợ 1-1 khi cần, đảm
                  bảo học viên hoàn thành các thử thách, đạt được mục tiêu học
                  tập và đủ năng lực để làm việc tại doanh nghiệp
                </p>
              </div>
            </div>
            <div className="introduction2_box_info">
              <div className="introduction2_symbol">
                <BsBriefcaseFill className="introduction2_react_icon" />
              </div>
              <div className="introduction2_content">
                <h4>CÓ VIỆC NGAY</h4>
                <p>
                  Phoenix cam kết hoàn 100% học phí nếu học viên không tìm được
                  việc trong vòng 90 ngày kể từ khi tốt nghiệp. Cam kết này được
                  cụ thể hoá bằng một hợp đồng đào tạo ngay từ đầu
                </p>
              </div>
            </div>
          </div>
          <Link to={"/courses"}>
            <div className="introduction2_button">Đăng ký ngay</div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
