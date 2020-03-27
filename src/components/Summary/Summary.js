import React from "react";

import Card from "../utils/Card";

import "./Summary.css";

const Summary = ({ data }) => {
  return (
    <Card addedClass="card-summary">
      <div className="total-summary">
        <div className="summary-top">
          <h2 className="total-summary--name">{data.name}</h2>
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="summary-middle">
          <p className="total-summary--balance">
            {data.balance.toFixed(2)}
            <span className="total-summary--currency">GBP</span>
          </p>

          <p>Total Balance</p>
        </div>
        <div className="summary-bottom">
          <p className="total-summary--percentage">+{data.percentage}%</p>
          <small>this week</small>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
