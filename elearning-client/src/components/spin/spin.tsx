import React from "react";
import LoadingSpinnerComponent from "react-spinners-components";
import './spin.css'
const Spin = () => {
  return (
    <div className="spin_overlay">
      <LoadingSpinnerComponent
        type={"Infinity"}
        color={"#f05123"}
        size={"200px"}
      />
    </div>
  );
};

export default Spin;
