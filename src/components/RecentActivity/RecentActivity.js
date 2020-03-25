import React from "react";

import Card from "../utils/Card";

import "./RecentActivity.css";

const RecentActivity = () => {
  return (
    <Card addedClass="card-recent">
      <div className="recent-activity">
        <h2>RECENT ACTIVITY</h2>
      </div>
    </Card>
  );
};

export default RecentActivity;
