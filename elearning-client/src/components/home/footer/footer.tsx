import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiTiktokFill } from "react-icons/ri";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_body">
        <div className="footer_column_info">
          <div className="footer_column_head">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="Phoenix Logo"
            />
            <p>Học lập trình để đi làm</p>
          </div>
          <div className="footer_column_body">
            <p>Điện thoại: 0246.329.1102</p>
            <p>Email: contact@fullstack.edu.vn</p>
            <p>
              Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
              Giấy, TP. Hà Nội
            </p>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Flogo%2Fdmca.2593d9ecf1c982e3c3a2.png?alt=media&token=3216cbaf-12fc-49d9-a6db-7a09a8657932"
              alt=""
            />
          </div>
        </div>
        <div className="footer_column">
          <div className="footer_column_head">
            <p>VỀ PHOENIX</p>
          </div>
          <div className="footer_column_body">
            <nav>Giới thiệu</nav>
            <nav>Liên hệ</nav>
            <nav>Điều khoản</nav>
            <nav>Bảo mật</nav>
            <nav>Cơ hội việc làm</nav>
          </div>
        </div>
        <div className="footer_column">
          <div className="footer_column_head">
            <p>SẢN PHẨM</p>
          </div>
          <div className="footer_column_body">
            <nav>Game Nester</nav>
            <nav>Game CSS Diner</nav>
            <nav>Game CSS Selectors</nav>
            <nav>Game Froggy</nav>
            <nav>Game Froggy pro</nav>
            <nav>Game Scoops</nav>
          </div>
        </div>
        <div className="footer_column">
          <div className="footer_column_head">
            <p>CÔNG CỤ</p>
          </div>
          <div className="footer_column_body">
            <nav>Tạo CV xin việc</nav>
            <nav>Rút gọn liên kết</nav>
            <nav>Clip-path maker</nav>
            <nav>Snippet generator</nav>
            <nav>CSS Grid generator</nav>
            <nav>Cảnh báo sờ tay lên mặt</nav>
          </div>
        </div>
        <div className="footer_column_info">
          <div className="footer_column_head">
            <p>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC PHOENIX</p>
          </div>
          <div className="footer_column_body">
            <p>Mã số thuế: 0109922901</p>
            <p>Ngày thành lập: 04/03/2022</p>
            <p>
              Lĩnh vực: Công nghệ, giáo dục, lập trình. Phoenix xây dựng và phát
              triển những sản phẩm mang lại giá trị cho cộng đồng.
            </p>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <h4>© 2018 - 2024 PHOENIX. Nền tảng học lập trình hàng đầu Việt Nam</h4>
        <div className="footer_icon">
          <FaFacebookSquare className="footer_icon_mini" />
          <FaYoutube className="footer_icon_mini" />
          <RiTiktokFill className="footer_icon_mini" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
