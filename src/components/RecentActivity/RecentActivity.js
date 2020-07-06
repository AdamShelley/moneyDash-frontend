import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import RecentTransaction from "./RecentTransaction";
import Card from "../utils/Card";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import "./RecentActivity.css";

const RecentActivity = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [latestTransactions, setLatestTransactions] = useState();
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Get the latest transactions on load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/finance/latest/${auth.userId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        setLatestTransactions(responseData.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, [auth.token, auth.userId, sendRequest]);

  const addTransactionHandler = () => {
    console.log("Transaction added");
  };

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>

      <Card addedClass="card-recent">
        {showAddTransaction && (
          <AddTransaction
            addTransaction={addTransactionHandler}
            closeModal={() => setShowAddTransaction(false)}
          />
        )}
        <ul>
          {latestTransactions && latestTransactions.length > 1 ? (
            latestTransactions.map((transaction) => {
              return (
                <RecentTransaction
                  key={transaction._id}
                  transaction={transaction}
                />
              );
            })
          ) : (
            <p>Please add transactions to an account</p>
          )}
        </ul>
        <div className="recent-buttons">
          <button
            className="btn"
            // onClick={() => setShowAddTransaction(true)}
          >
            New Transaction
          </button>
          <button
            className="btn"
            onClick={() => {
              history.push("/settings");
            }}
          >
            Settings
          </button>
        </div>
      </Card>
    </div>
  );
};

export default RecentActivity;
