import React from "react";

import LoggerTransaction from "./LoggerTransaction";

import Card from "../utils/Card";
import "./LoggerList.css";

const LoggerList = ({ transactions, deleteHandler }) => {
  console.log(transactions);
  return (
    <div className="logger-list">
      <Card addedClass="card-logger-list">
        <div className="list-titles">
          <p>Icon</p>
          <p>Account</p>
          <p>Category</p>
          <p className="list-titles--description">Description</p>
          <p>Amount</p>
          <p>Date</p>
          <p></p>
        </div>

        {transactions &&
          transactions.map((transaction) => {
            return (
              <LoggerTransaction
                deleteHandler={deleteHandler}
                key={transaction._id}
                transaction={transaction}
              />
            );
          })}
      </Card>
    </div>
  );
};

export default LoggerList;
