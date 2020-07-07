import React from "react";

import LoggerBox from "./LoggerBox";
import { categoryFilter } from "../utils/categoryFilter";
import "./LoggerTop.css";

const LoggerTop = ({ accounts, transactions }) => {
  // Function to filter categories?
  let rawData = categoryFilter(transactions);

  let data = rawData.slice(0, 5);

  return (
    <div className="logger-info-container">
      <div className="logger-info">
        <div className="logger-info--account-filter">
          <p>Accounts</p>
          <div className="account-filter--boxes">
            {accounts &&
              accounts.map((account) => {
                return (
                  <LoggerBox key={account._id} accounts account={account} />
                );
              })}
          </div>
          {/* Loop around the accounts and display little boxes */}
        </div>
        <div className="logger-info--category-filter">
          {/* Loop around the transactions and display little boxes for each cat. */}

          <p>Categories</p>
          {data &&
            data.map((category) => {
              return (
                <LoggerBox
                  key={category.category}
                  categories
                  category={category}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LoggerTop;
