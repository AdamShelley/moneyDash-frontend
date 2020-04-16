import React from "react";

import RecentTransaction from "./RecentTransaction";
import Card from "../utils/Card";

import "./RecentActivity.css";

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <Card addedClass="card-recent">
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <div className="recent-buttons">
          <button>New Transaction</button>
          <button>Settings</button>
        </div>
      </Card>
    </div>
  );
};

export default RecentActivity;
