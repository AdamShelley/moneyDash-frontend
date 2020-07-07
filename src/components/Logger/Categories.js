import React from "react";

import Card from "../utils/Card";
import CategoryItem from "./CategoryItem";
import { categoryFilter } from "../utils/categoryFilter";
import "./Categories.css";

const Categories = ({ transactions }) => {
  let totalSpend = 0;

  let data = categoryFilter(transactions);

  // total spend of all logged transactions on app (Could move to backend?)
  totalSpend = data.reduce((acc, current) => acc + current.amount, totalSpend);

  // ORGANISE THE CATEGORY LIST BY AMOUNT
  data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)).reverse();

  return (
    <div className="categories-container">
      <Card addedClass="categories-container-card">
        <h2>Where did your money go?</h2>
        <ul>
          {/* {data.forEach((item) => console.log(item))} */}
          {data &&
            totalSpend &&
            data.map((item) => (
              <CategoryItem
                key={item.category}
                amount={item.amount}
                item={item.category}
                total={totalSpend}
              />
            ))}
        </ul>
      </Card>
    </div>
  );
};

export default Categories;
