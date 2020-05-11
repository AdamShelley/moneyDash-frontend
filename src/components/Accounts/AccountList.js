import React, { useState } from "react";

import SingleAccount from "./SingleAccount";
import Loading from "../utils/Loading";

import "./AccountList.css";

const AccountList = ({ accounts, filter, active, deleted }) => {
  return (
    <div className="account-list">
      <ul>
        {accounts &&
          accounts.map((account, index) => {
            console.log(account);
            const activeAccount = active === account._id;
            return (
              <SingleAccount
                active={activeAccount}
                filter={filter}
                key={index}
                account={account}
                deleted={deleted}
              />
            );
          })}
      </ul>
      {!accounts && <p>Please add an account</p>}
    </div>
  );
};

export default AccountList;
