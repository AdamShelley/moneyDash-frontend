import React from "react";

import "./NavLink.css";

const NavLink = props => {
  return (
    <div className="nav-link">
      <i className={props.iconName}></i>
      <li>{props.children}</li>
    </div>
  );
};

export default NavLink;
