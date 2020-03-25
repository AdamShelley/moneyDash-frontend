import React from "react";

import Card from "../utils/Card";

import "./Summary.css";

const Summary = () => {
  return (
    <Card addedClass="card-summary">
      <div className="total-summary">
        <h2>Adam Shelley</h2>
        <p>2,560.50</p>
        <span>USD</span>
        <p>Total Balance</p>
        <p>+40%</p>
        <small>this week</small>
      </div>
    </Card>
  );
};

export default Summary;
