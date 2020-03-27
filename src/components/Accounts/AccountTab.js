import React from "react";

import Card from "../utils/Card";
import "./AccountTab.css";

const AccountTab = ({ details }) => {
  return (
    <Card addedClass="account-card">
      <div className="single-account">
        <h2 className="account-name">{details.name}</h2>
        <i className="fab fa-cc-visa"></i>
        <p className="account-type">{details.type}</p>
        <p className="account-balance">£ {details.balance}</p>
      </div>
    </Card>
  );
};

export default AccountTab;
