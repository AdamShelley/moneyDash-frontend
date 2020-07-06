import React, { useState, useEffect, useContext } from "react";

import LoggerForm from "../components/Logger/LoggerForm";
import LoggerTop from "../components/Logger/LoggerTop";
import LoggerList from "../components/Logger/LoggerList";
import Categories from "../components/Logger/Categories";
import Loading from "../components/utils/Loading";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";

import "./Logger.css";

const Logger = () => {
  const [loadedTransactions, setLoadedTransactions] = useState();
  const [loadedAccounts, setLoadedAccounts] = useState();
  const { isLoading, sendRequest, error } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/finance/all/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        setLoadedTransactions(responseData.data);
      } catch (error) {}
    };
    fetchTransactions();
  }, [auth.token, auth.userId, sendRequest]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/account/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        setLoadedAccounts(responseData);
      } catch (error) {}
    };
    fetchAccounts();
  }, [auth.token, auth.userId, sendRequest]);

  const addTransactionHandler = (transaction) => {
    console.log("Add Transaction Handler");
    setLoadedTransactions((prevState) => [transaction, ...prevState]);
  };

  const deleteTransactionHandler = async (transaction) => {
    console.log("deleting transaction");
    console.log(transaction._id);
    // Delete the item from the database
    try {
      await sendRequest(
        `http://localhost:3001/api/finance`,
        "DELETE",
        JSON.stringify({
          userId: auth.userId,
          transactionId: transaction._id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {
      console.log(error);
    }

    // Set the loaded transactions to remove from the logger list
    const filteredTransactions = loadedTransactions.filter(
      (loaded) => loaded._id !== transaction._id
    );
    setLoadedTransactions(filteredTransactions);
  };

  return (
    <div className="logger-container">
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <h1>Expense log</h1>
      {/* <LoggerForm
        accounts={loadedAccounts}
        addTransaction={addTransactionHandler}
      /> */}
      {loadedTransactions && (
        <div className="logger-content-container">
          {loadedAccounts && (
            <LoggerTop
              accounts={loadedAccounts.accounts}
              transactions={loadedTransactions}
            />
          )}
          <LoggerList
            loggerPage
            accounts={loadedAccounts}
            addTransaction={addTransactionHandler}
            allowDelete
            deleteHandler={deleteTransactionHandler}
            transactions={loadedTransactions}
          />
          <Categories transactions={loadedTransactions} />
        </div>
      )}
    </div>
  );
};

export default Logger;
