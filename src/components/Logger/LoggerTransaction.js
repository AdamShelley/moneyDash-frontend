import React from "react";
import Moment from "react-moment";

import "./LoggerTransaction.css";

const LoggerTransaction = ({ transaction }) => {
  return (
    <div className="logger-transaction">
      <i className="fas fa-shopping-cart"></i>
      <p>{transaction.accountName}</p>
      <p>{transaction.category}</p>
      <p className="logger-transaction--description">
        {transaction.description}
      </p>
      <p>£{transaction.amount.toFixed(2)}</p>
      <p>
        {/* {day}-{month}-{year} */}
        <Moment format="DD/MM/YY">{transaction.date}</Moment>
      </p>
    </div>
  );
};

export default LoggerTransaction;
