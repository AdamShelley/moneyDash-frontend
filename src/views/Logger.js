import React, { useState, useEffect, useContext } from "react";

import LoggerForm from "../components/Logger/LoggerForm";
import LoggerList from "../components/Logger/LoggerList";
import Loading from "../components/utils/Loading";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";

import "./Logger.css";

const userId = "5e90ca49fcde55eb3c4682ee";

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
    setLoadedTransactions((prevState) => [transaction, ...prevState]);
  };

  return (
    <div className="logger-container">
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <h1>Log Expenses</h1>
      <LoggerForm
        accounts={loadedAccounts}
        addTransaction={addTransactionHandler}
      />
      {loadedTransactions && <LoggerList transactions={loadedTransactions} />}
    </div>
  );
};

export default Logger;
