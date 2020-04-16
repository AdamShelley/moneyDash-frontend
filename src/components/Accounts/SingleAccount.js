import React from "react";

import Card from "../utils/Card";
import "./SingleAccount.css";

const SingleAccount = ({ account, filter }) => {
  return (
    <li className="account" onClick={() => filter(account)}>
      <Card addedClass="account-page-card">
        <h3>{account.name}</h3>
        <p>£{account.balance.toFixed(2)}</p>
      </Card>
    </li>
  );
};

export default SingleAccount;
