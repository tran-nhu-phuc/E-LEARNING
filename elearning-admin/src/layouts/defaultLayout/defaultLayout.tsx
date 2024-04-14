import React from "react";
import "./defaultLayout.css";
import Header from "../../components/home/header/header";
import Sidebar from "../../components/home/sidebar/sidebar";

interface Props {
  child: JSX.Element;
}
const DefaultLayout = (props: Props): JSX.Element => {
  return (
    <div className="default_layout">
      <div className="header_default_layout">
        <Header />
      </div>
      <div className="sidebar_default_layout">
        <Sidebar />
      </div>
      <div className="child">{props.child}</div>
    </div>
  );
};

export default DefaultLayout;
