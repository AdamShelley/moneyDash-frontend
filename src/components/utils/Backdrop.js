import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div
      className={`backdrop ${
        props.transparentModal ? "backdrop-transparent" : "backdrop-dark"
      }`}
      onClick={props.onClick}
    ></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
