import React from "react";
import NavLinks from "./NavLinks";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>MoneyDash</h2>
      <NavLinks />
    </div>
  );
};

export default Navbar;
