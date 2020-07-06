import React from "react";

import LoggerBox from "./LoggerBox";
import "./LoggerTop.css";

const LoggerTop = ({ accounts, transactions }) => {
  // Function to filter categories?
  const filterCategories = () => {};

  return (
    <div className="logger-info-container">
      <div className="logger-info">
        <div className="logger-info--account-filter">
          <p>Accounts</p>
          <div className="account-filter--boxes">
            {accounts &&
              accounts.map((account) => {
                return <LoggerBox />;
              })}
          </div>
          {/* Loop around the accounts and display little boxes */}
        </div>
        <div className="logger-info--category-filter">
          {/* Loop around the transactions and display little boxes for each cat. */}

          <p>Categories</p>
          {transactions &&
            transactions.map((tran) => {
              //   return <LoggerBox />;
            })}
        </div>
      </div>
    </div>
  );
};

export default LoggerTop;
