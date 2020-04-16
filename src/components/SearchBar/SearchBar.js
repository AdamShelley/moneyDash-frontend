import React from "react";

import personImg from "../../img/person.jpg";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <div className="user-picture">
        <img src={personImg} alt="icon" className="user-img" />
      </div>
    </div>
  );
};

export default SearchBar;
