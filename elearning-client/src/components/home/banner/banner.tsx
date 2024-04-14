import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "300px",
  color: "black",
  lineHeight: "160px",
  textAlign: "center",
  background: "white",
  width: "93%",
  borderRadius: "20px",
};

const Banner: React.FC = () => (
  <div className="banner">
    <Carousel autoplay>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fbanner%2F1.jpg?alt=media&token=1c8f2b89-f8b6-4e33-8c84-8f006f1bc833"
          style={contentStyle}
          alt=""
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fbanner%2F2.jpg?alt=media&token=eec4b95b-8c1e-410f-81fb-3375d39bd2a6"
          style={contentStyle}
          alt=""
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fbanner%2F3.jpg?alt=media&token=f1ce6c1d-aaca-4dcb-8e3c-107fe2872fb6"
          style={contentStyle}
          alt=""
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fbanner%2F4.jpg?alt=media&token=81b4e779-7830-4f24-81a1-d4acbac6adc4"
          style={contentStyle}
          alt=""
          width="100%"
        />
      </div>
    </Carousel>
  </div>
);

export default Banner;
