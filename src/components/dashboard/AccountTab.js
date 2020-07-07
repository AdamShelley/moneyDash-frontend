import React from "react";

import Card from "../utils/Card";

import { bankColor } from "../utils/bankColor";
import "./AccountTab.css";

const AccountTab = ({ details, background }) => {
  let bankName = details.name;

  const bankInfo = bankColor(bankName);

  return (
    <Card addedClass="account-card">
      <div
        className="single-account"
        style={{ backgroundColor: bankInfo.backgroundColor || "#4d52e0" }}
      >
        <h2 className="account-name">{details.name}</h2>
        <i className="fab fa-cc-visa"></i>
        <p className="account-type">{details.type || "Savings"}</p>
        <p className="account-balance">£ {details.balance.toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default AccountTab;
