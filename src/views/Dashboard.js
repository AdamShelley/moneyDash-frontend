import React from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import TotalSummary from "../components/Summary/Summary";
import Accounts from "../components/Accounts/Accounts";
import Graph from "../components/Graph/Graph";
import RecentActivity from "../components/RecentActivity/RecentActivity";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SearchBar />
      <div className="layer1">
        <TotalSummary />
        <Accounts />
      </div>
      <div className="layer2">
        <Graph />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
