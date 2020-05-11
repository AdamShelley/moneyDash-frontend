import React from "react";
import Moment from "react-moment";

// import Card from "../utils/Card";
import "./RecentTransaction.css";

const RecentTransaction = ({ transaction }) => {
  return (
    <div className="recent-transaction">
      <i className="fas fa-home"></i>

      <div className="recent-middle">
        <h3>{transaction.description}</h3>
        <p>
          <Moment format="DD/MM/YY">{transaction.date}</Moment>
        </p>
      </div>
      <div className="recent-end">
        <i className="fas fa-ellipsis-h"></i>
        <p className="recent-cost">-{transaction.amount} GBP</p>
      </div>
    </div>
  );
};

export default RecentTransaction;
