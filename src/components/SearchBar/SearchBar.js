import React from "react";

import personImg from "../../img/person.jpg";
import "./SearchBar.css";

const SearchBar = () => {
  const openModal = () => {
    console.log("Modal opened");
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <div className="user-picture" onClick={openModal}>
        <img src={personImg} alt="icon" className="user-img" />
      </div>
    </div>
  );
};

export default SearchBar;
