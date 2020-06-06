import React from "react";

import "./CategoryItem.css";

const CategoryItem = ({ item, amount, total }) => {
  // Percentage of total spend compared to amount

  const percent = (amount / total) * 100;

  return (
    <div className="category-item">
      <div className="category-item--item">
        <h3>{item}</h3>
        <p>£{amount}</p>
      </div>
      <div className="category-item--percent">
        <div
          className="category-item--percent--real"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryItem;
