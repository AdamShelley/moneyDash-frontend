import React from "react";
import { useHistory } from "react-router-dom";
import "./Accounts.css";

import AccountTab from "./AccountTab";
import Card from "../utils/Card";

const Accounts = ({ data }) => {
  console.log(data);

  let history = useHistory();

  const addAccountHandler = () => {
    console.log("Routing to accounts page");
    // Route to the accounts page.
    history.push("/accounts");
  };

  // hook to determine bank used?

  return (
    <div className="card-accounts">
      <div className="account-summary">
        <Card addedClass="card-account-summary">
          <i className="fas fa-plus" onClick={addAccountHandler}></i>
        </Card>
        {data && data.length >= 1 ? (
          data.map((account) => (
            <AccountTab key={account._id} details={account} />
          ))
        ) : (
          <p> Begin by Adding accounts, click the + to start. </p>
        )}
      </div>
    </div>
  );
};

export default Accounts;
