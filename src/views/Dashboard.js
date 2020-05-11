import React, { useEffect, useState, useContext } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import TotalSummary from "../components/Summary/Summary";
import Accounts from "../components/dashboard/Accounts";
import Graph from "../components/Graph/Graph";
import RecentActivity from "../components/RecentActivity/RecentActivity";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

import "./Dashboard.css";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [accounts, setAccounts] = useState();

  // Fetch the user accounts
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
        setAccounts(responseData.accounts);
      } catch (error) {}
    };

    fetchAccounts();
  }, [auth.token, auth.userId, sendRequest]);

  const addAccountSubmit = () => {
    console.log("adding account");
  };

  return (
    <div className="dashboard">
      <SearchBar />
      <div className="layer1">
        <Modal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onSubmit={addAccountSubmit}
          header="Create an Account"
          contentClass="account-item__modal-content"
          footerClass="account-item__modal-actions"
          footer={<button onClick={() => setShowModal(false)}>Close</button>}
        />
        {isLoading && <Loading />}
        {auth.userData && <TotalSummary data={auth.userData} />}
        {accounts && <Accounts data={accounts} />}
      </div>
      <div className="layer2">
        <Graph data={accounts} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
