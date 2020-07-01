import React from "react";

import LoggerTransaction from "./LoggerTransaction";

import Card from "../utils/Card";
import "./LoggerList.css";

const LoggerList = ({ transactions, deleteHandler, allowDelete }) => {
  return (
    <div className="logger-list">
      {/* <div className="list-titles">
        <p>Icon</p>
        <p>Account</p>
        <p>Category</p>
        <p className="list-titles--description">Description</p>
        <p>Amount</p>
        <p>Date</p>
        <p></p>
      </div> */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Account</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction) => {
              return (
                <tr
                  className={`logger-transaction ${
                    transaction.income ? "logger-transaction-income" : ""
                  }`}
                >
                  <LoggerTransaction
                    deleteHandler={deleteHandler}
                    key={transaction._id}
                    allowDelete={allowDelete}
                    transaction={transaction}
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <Card addedClass="card-logger-list">
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
      </Card> */}
    </div>

    // turn this into a legit table?
  );
};

export default LoggerList;
