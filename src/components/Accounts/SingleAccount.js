import React, { useState, useContext } from "react";

import Card from "../utils/Card";
import Modal from "../utils/Modal";

import { bankColor } from "../utils/bankColor";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

import "./SingleAccount.css";

const SingleAccount = ({ account, filter, active, deleted }) => {
  const { isLoading, sendRequest, error } = useHttpClient();
  const [showDelete, setShowDelete] = useState(false);
  const auth = useContext(AuthContext);

  const clickedHandler = (event) => {
    filter(account);
  };

  // Are you sure you want to delete modal here
  const deleteAccountHandler = (e) => {
    console.log("deleting account");
    e.stopPropagation();
    setShowDelete(true);
  };

  //Send delete request to backend
  const deletionConfirmed = async () => {
    setShowDelete(false);
    // Delete Account backend
    try {
      await sendRequest(
        `http://localhost:3001/api/account/${account._id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (error) {
      console.log(error);
    }
    deleted(account._id);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setShowDelete(false);
  };

  const backgroundColor = bankColor(account.name);

  return (
    <li className="account " onClick={clickedHandler}>
      <Modal
        notModalHook
        show={showDelete}
        onCancel={closeModal}
        className="modal__delete"
        header="Are you sure you want to delete this account?"
        headerClass="delete-header"
        contentClass="delete-modal"
        footerClass="delete-footer"
        footer={
          <div className="account-deletion__buttons">
            <button
              className="btn btn-delete-account"
              onClick={deletionConfirmed}
            >
              Delete
            </button>
            <button
              className="btn btn-delete-account--close"
              onClick={closeModal}
            >
              Cancel!
            </button>
          </div>
        }
      ></Modal>
      <Card
        style={{ backgroundColor: backgroundColor || "#4d52e0" }}
        addedClass={`account-page-card ${
          active && "account-page-card-active"
        } `}
      >
        <i className="fas fa-ellipsis-h" onClick={deleteAccountHandler}></i>
        <h3>{account.name}</h3>
        <p>£{account.balance.toFixed(2)}</p>
      </Card>
    </li>
  );
};

export default SingleAccount;
