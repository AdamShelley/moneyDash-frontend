import React from "react";

import Card from "../utils/Card";
import CategoryItem from "./CategoryItem";
import "./Categories.css";

const Categories = ({ transactions }) => {
  let data = [];
  let totalSpend = 0;

  transactions.forEach((transaction) => {
    // If Data contains category already, add it to the existing
    if (transaction.income) {
      return;
    }

    if (data.some((item) => item.category === transaction.category)) {
      // Access the data object and add the amount to it
      data.forEach((item) => {
        if (item.category === transaction.category) {
          item.amount += transaction.amount;
        }
      });
    } else {
      // If not then add a new category
      let tran = {
        category: transaction.category,
        amount: transaction.amount,
      };

      // and push to the data array
      data.push(tran);
    }
  });

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
