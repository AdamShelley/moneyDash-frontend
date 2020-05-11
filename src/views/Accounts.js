import React, { useState, useEffect, useContext, useCallback } from "react";

import LoggerList from "../components/Logger/LoggerList";
import AccountList from "../components/Accounts/AccountList";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import Input from "../components/utils/Input";
import "./Accounts.css";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useForm } from "../hooks/useForm.js";

const Accounts = () => {
  const { isLoading, error, sendRequest } = useHttpClient();

  const [showModal, setShowModal] = useState(false);
  const [loadedAccounts, setLoadedAccounts] = useState();
  const [loadedTransactions, setLoadedTransactions] = useState();
  const [currentBankType, setCurrentBankType] = useState("Current Account");
  const [activeAccount, setActiveAccount] = useState(null);
  const [reset, setReset] = useState(false);

  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      newAccount: {
        value: "",
        isValid: false,
      },
      newAccountBalance: {
        value: 0,
        isValid: false,
      },
    },
    // Overall validity of the form
    false
  );

  // RESET FILTER
  const resetFilter = useCallback(() => {
    setActiveAccount(null);
    // Get all transactions back
    // In future replace with a more cost effective method instead of calling fetch again...
    setReset(!reset);
  }, [reset]);

  // Fetch all transactions
  useEffect(() => {
    console.log("fetching transactions");
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/finance/all/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        console.log(responseData);

        setLoadedTransactions(responseData.data);
      } catch (error) {}
    };
    fetchTransactions();
  }, [auth.token, auth.userId, sendRequest, reset]);

  // Fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/account/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        console.log(responseData);

        setLoadedAccounts(responseData.accounts);
      } catch (error) {}
    };

    fetchAccounts();
  }, [auth.token, auth.userId, sendRequest]);

  const addAccountHandler = () => {
    console.log("Adding new account");
    // Launch Modal
    setShowModal(true);
  };

  const closeModalHandler = () => setShowModal(false);

  // ADD NEW ACCOUNT
  const addAccountSubmit = async (event) => {
    event.preventDefault();

    setShowModal(false);

    // Send request to account backend
    console.log(currentBankType);
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/api/account`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          name: formState.inputs.newAccount.value,
          balance: formState.inputs.newAccountBalance.value,
          accountType: currentBankType,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      setLoadedAccounts((prevAccounts) => [...prevAccounts, responseData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAccount = (account) => {
    // RESET THE STYLES OF ACCOUNT CARDS
    if (loadedAccounts.length !== 1) {
      setActiveAccount(account._id);
      setLoadedTransactions(account.transactions);
    }
  };

  const accountDeleted = (accountId) => {
    const activeAccounts = loadedAccounts.filter(
      (account) => account._id !== accountId
    );
    setLoadedAccounts(activeAccounts);
    resetFilter();
  };

  const accountTypeSet = (e) => {
    setCurrentBankType(e.target.innerHTML);
  };

  return (
    <React.Fragment>
      <Modal
        // asOverlay
        className="account-item__modal"
        show={showModal}
        onCancel={closeModalHandler}
        onSubmit={addAccountSubmit}
        headerClass="account-item__modal-header"
        header="Create an account"
        contentClass="account-item__modal-content"
        footerClass="account-item__modal-actions"
        // footer={}
      >
        <p>You can create a new account here.</p>
        <Input
          id="newAccount"
          element="input"
          type="text"
          label="Account Name"
          errorText="Please pick an account name"
          onInput={inputHandler}
        />
        <Input
          id="newAccountBalance"
          element="input"
          type="number"
          label="Account Balance"
          errorText="Please enter current account balance"
          onInput={inputHandler}
        />
        {/* <Input
          id="accountType"
          element="input"
          type="text"
          label="Account Type (e.g. Current Account)"
          errorText="Please enter current account type"
          onInput={inputHandler}
        /> */}
        {/* OPTIONS TO CLICK FOR ACCOUNT TYPE */}
        <p>Pick the type of account to create.</p>
        <div className="account-item__bank-type">
          <div
            value="Current Account"
            onClick={accountTypeSet}
            className={`account-item__bank-type--type ${
              currentBankType === "Current Account"
                ? "account-item__bank-type--type--active"
                : ""
            }`}
          >
            Current Account
          </div>
          <div
            value="Savings"
            onClick={accountTypeSet}
            className={`account-item__bank-type--type ${
              currentBankType === "Savings"
                ? "account-item__bank-type--type--active"
                : ""
            }`}
          >
            Savings
          </div>
          <div
            value="ISA"
            onClick={accountTypeSet}
            className={`account-item__bank-type--type ${
              currentBankType === "ISA"
                ? "account-item__bank-type--type--active"
                : ""
            }`}
          >
            ISA
          </div>
          <div
            value="Credit"
            onClick={accountTypeSet}
            className={`account-item__bank-type--type ${
              currentBankType === "Credit Card"
                ? "account-item__bank-type--type--active"
                : ""
            }`}
          >
            Credit Card
          </div>
        </div>
        <div className="account-item__buttons">
          <button className="btn btn-add-account" type="submit">
            Add Account
          </button>
          <button className="btn btn-close-modal" onClick={closeModalHandler}>
            Close
          </button>
        </div>
      </Modal>
      <div className="accounts-page">
        <h2>Account Summary</h2>

        {!loadedAccounts && <p>Loading...</p>}
        {error && <p>Please add an account</p>}
        {loadedAccounts ? (
          <AccountList
            active={activeAccount ? activeAccount : null}
            filter={filterAccount}
            accounts={loadedAccounts}
            deleted={accountDeleted}
          />
        ) : (
          <Loading />
        )}

        {/* MOVE TO ITS OWN FILE */}
        <div className="accounts__buttons">
          <button className="btn btn-add-account" onClick={addAccountHandler}>
            Add Account
          </button>

          <button className="btn btn-reset-filter" onClick={resetFilter}>
            Reset filter
          </button>
        </div>

        {loadedTransactions && (
          <LoggerList
            className="account-transactions"
            transactions={loadedTransactions}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Accounts;
