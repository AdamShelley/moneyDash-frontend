import React from "react";

import NavLink from "./NavLink";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <div className="nav-links">
      <ul>
        <NavLink iconName="fas fa-home">Dashboard</NavLink>
        <NavLink iconName="far fa-user">Accounts</NavLink>
        <NavLink iconName="fas fa-credit-card">Adjustments</NavLink>
        <NavLink iconName="fas fa-cog">Settings</NavLink>
      </ul>
    </div>
  );
};

export default NavLinks;
