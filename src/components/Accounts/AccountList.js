import React from "react";

import SingleAccount from "./SingleAccount";

import "./AccountList.css";

const AccountList = ({ accounts, filter }) => {
  return (
    <div className="account-list">
      <ul>
        {accounts &&
          accounts.map((account, index) => {
            console.log(account);
            return (
              <SingleAccount filter={filter} key={index} account={account} />
            );
          })}
      </ul>
      {!accounts && <p>Please add an account</p>}
    </div>
  );
};

export default AccountList;
