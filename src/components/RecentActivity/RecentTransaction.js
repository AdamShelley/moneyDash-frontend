import React from "react";

// import Card from "../utils/Card";
import "./RecentTransaction.css";

const RecentTransaction = () => {
  return (
    <div className="recent-transaction">
      <i className="fas fa-home"></i>

      <div className="recent-middle">
        <h3>Monthly Home Rent</h3>
        <p>31 July 2020, 11:08PM</p>
      </div>
      <div className="recent-end">
        <i className="fas fa-ellipsis-h"></i>
        <p className="recent-cost">-500 GBP</p>
      </div>
    </div>
  );
};

export default RecentTransaction;
