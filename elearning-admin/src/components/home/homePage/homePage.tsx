import React from "react";
import "./homePage.css";
import SaleChart from "../saleChart/saleChart";
const AdminHome = () => {
  return (
    <div className="admin_home_container">
      <SaleChart />
    </div>
  );
};

export default AdminHome;
