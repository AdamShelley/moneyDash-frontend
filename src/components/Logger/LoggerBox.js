import React from "react";

import "./LoggerBox.css";

const LoggerBox = (props) => {
  const handleFilter = (e) => {
    console.log(props.account);
  };

  if (props.accounts) {
    return (
      <div onClick={handleFilter} className="logger-box-container">
        <div className="logger-box">{props.account.name}</div>
      </div>
    );
  } else if (props.categories) {
    return (
      <div onClick={handleFilter} className="logger-box-container">
        <div className="logger-box">{props.category.category}</div>
      </div>
    );
  }
};

export default LoggerBox;
