import React, { useState, useEffect, useContext } from "react";

import LoggerList from "../components/Logger/LoggerList";
import AccountList from "../components/Accounts/AccountList";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import Input from "../components/utils/Input";
// import Card from "../components/utils/Card";
import "./Accounts.css";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useForm } from "../hooks/useForm.js";

const Accounts = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  // const [transactions, setTransactions] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loadedAccounts, setLoadedAccounts] = useState();
  const [loadedTransactions, setLoadedTransactions] = useState();
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

  // Fetch all transactions
  useEffect(() => {
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
  }, [auth.token, auth.userId, sendRequest]);

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

  const addAccountSubmit = async (event) => {
    event.preventDefault();

    setShowModal(false);

    // Send request to account backend

    try {
      const responseData = await sendRequest(
        `http://localhost:3001/api/account`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          name: formState.inputs.newAccount.value,
          balance: formState.inputs.newAccountBalance.value,
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
    console.log(account);
    setLoadedTransactions(account.transactions);
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}

      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        onSubmit={addAccountSubmit}
        header="Create an Account"
        contentClass="account-item__modal-content"
        footerClass="account-item__modal-actions"
        footer={<button onClick={closeModalHandler}>Close</button>}
      >
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

        <button type="submit">Add Account</button>
      </Modal>
      <div className="accounts-page">
        <h2>Account Summary</h2>

        {!loadedAccounts && <p>Loading...</p>}
        {error && <p>Please add an account</p>}
        {loadedAccounts && (
          <AccountList filter={filterAccount} accounts={loadedAccounts} />
        )}

        <button className="btn btn-add-account" onClick={addAccountHandler}>
          New Account
        </button>

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
