import React, { useState } from "react";

import SingleAccount from "./SingleAccount";
import Loading from "../utils/Loading";

import "./AccountList.css";

const AccountList = ({ accounts, filter, active, deleted }) => {
  const [modalActive, setModalActive] = useState(false);

  const modalIsShowing = () => setModalActive(true);
  const modalHidden = () => setModalActive(false);

  return (
    <div className="account-list">
      <ul>
        {accounts &&
          accounts.map((account, index) => {
            const activeAccount = active === account._id;
            return (
              <SingleAccount
                modalActive={modalActive}
                modalIsShowing={modalIsShowing}
                modalHidden={modalHidden}
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
