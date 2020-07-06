import React, { useState } from "react";

import LoggerTransaction from "./LoggerTransaction";
import LoggerForm from "./LoggerForm";
import Modal from "../utils/Modal";
import Card from "../utils/Card";
import "./LoggerList.css";

const LoggerList = ({
  transactions,
  deleteHandler,
  allowDelete,
  accounts,
  addTransaction,
  loggerPage,
}) => {
  const [transactionModal, setTransactionModal] = useState(false);

  const AddTransactionModal = () => {
    // OPEN MODAL TO ADD TRANSACTION
    setTransactionModal(true);
  };

  const submitTransaction = () => {
    // If there are no errors
    setTransactionModal(false);
  };

  return (
    <React.Fragment>
      <div className="logger-list">
        {loggerPage && (
          <div className="addTransactionButton" onClick={AddTransactionModal}>
            <i className="fas fa-plus"></i>
            <p>Add transaction</p>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Account</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => {
                return (
                  <tr
                    key={transaction._id}
                    className={`logger-transaction ${
                      transaction.income ? "logger-transaction-income" : ""
                    }`}
                  >
                    <LoggerTransaction
                      deleteHandler={deleteHandler}
                      key={transaction._id}
                      allowDelete={allowDelete}
                      transaction={transaction}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        asOverlay
        overlayTransparent
        noForm
        className="transaction__modal"
        show={transactionModal}
        onCancel={() => setTransactionModal(false)}
        // onSubmit={submitTransaction}
        headerClass="transaction__modal--header"
        header="Add a transaction"
        contentClass="transaction__modal--content"
        footerClass="transaction__modal--footer"
      >
        <LoggerForm
          accounts={accounts}
          addTransaction={addTransaction}
          submitted={submitTransaction}
        />
      </Modal>
    </React.Fragment>
    // turn this into a legit table?
  );
};

export default LoggerList;
