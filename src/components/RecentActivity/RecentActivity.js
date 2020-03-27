import React from "react";

import RecentTransaction from "./RecentTransaction";
import Card from "../utils/Card";

import "./RecentActivity.css";

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h2>RECENT ACTIVITY</h2>
      <Card addedClass="card-recent">
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <button>New Transaction</button>
        <button>Settings</button>
      </Card>
    </div>
  );
};

export default RecentActivity;
