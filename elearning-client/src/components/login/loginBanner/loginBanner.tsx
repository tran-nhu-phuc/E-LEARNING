import React from "react";
import { Carousel } from "antd";
import "./loginBanner.css";

const contentStyle: React.CSSProperties = {
  height: "350px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  width: "650px",
};

const LoginBanner: React.FC = () => (
  <Carousel autoplay className="carousel">
    <div className="banner_login">
      <img
        src="https://longvan.net/hinhanh/tintuc/css-la-gi1.jpg"
        style={contentStyle}
        alt="banner login"
      />
    </div>
    <div className="banner_login">
      <img
        src="https://statics.cdn.200lab.io/2023/09/02-Tempalte--5-.png"
        style={contentStyle}
        alt="banner login"
      />
    </div>
    <div className="banner_login">
      <img
        src="https://static-xf1.vietnix.vn/wp-content/uploads/2024/01/javascript-la-gi.webp"
        style={contentStyle}
        alt="banner login"
      />
    </div>
    <div className="banner_login">
      <img
        src="https://lptech.asia/uploads/files/2022/05/09/Lo-trinh-hoc-lap-trinh-web-cho-front-end-2.png"
        style={contentStyle}
        alt="banner login"
      />
    </div>
  </Carousel>
);

export default LoginBanner;
