import React from "react";
import "./Accounts.css";

import AccountTab from "./AccountTab";
import Card from "../utils/Card";

// Fetch the accounts here?
const accounts = [
  {
    name: "Nationwide",
    balance: 5098.5,
    type: "Visa"
  },
  {
    name: "1st Direct",
    balance: 503.1,
    type: "Visa"
  },

  {
    name: "Santander",
    balance: 1090.36,
    type: "Mastercard"
  }
];

const Accounts = () => {
  return (
    <Card addedClass="card-accounts">
      <div className="account-summary">
        <Card>
          <i className="fas fa-plus"></i>
        </Card>
        {accounts.map(account => (
          <AccountTab key={account.name} details={account} />
        ))}
      </div>
    </Card>
  );
};

export default Accounts;
