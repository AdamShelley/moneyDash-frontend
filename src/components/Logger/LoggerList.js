import React from "react";

import LoggerTransaction from "./LoggerTransaction";

import Card from "../utils/Card";
import "./LoggerList.css";

const LoggerList = ({ transactions, deleteHandler, allowDelete }) => {
  return (
    <div className="logger-list">
      <div className="list-titles">
        <p>Icon</p>
        <p>Account</p>
        <p>Category</p>
        <p className="list-titles--description">Description</p>
        <p>Amount</p>
        <p>Date</p>
        <p></p>
      </div>
      <Card addedClass="card-logger-list">
        {transactions &&
          transactions.map((transaction) => {
            return (
              <LoggerTransaction
                deleteHandler={deleteHandler}
                key={transaction._id}
                allowDelete={allowDelete}
                transaction={transaction}
              />
            );
          })}
      </Card>
    </div>
  );
};

export default LoggerList;
