import React, { useState, useContext } from "react";

import Card from "../utils/Card";
import Modal from "../utils/Modal";
import Input from "../utils/Input";

import { bankColor } from "../utils/bankColor";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/useForm";

import "./SingleAccount.css";

const SingleAccount = ({
  account,
  filter,
  active,
  deleted,
  modalActive,
  modalIsShowing,
  modalHidden,
}) => {
  const { sendRequest } = useHttpClient();
  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      editAccountName: {
        value: "",
        isValid: false,
      },
      editAccountBalance: {
        value: 0,
        isValid: false,
      },
    },
    // Overall validity of the form
    false
  );

  const clickedHandler = (event) => {
    if (!modalActive) {
      filter(account);
    }
  };

  // Are you sure you want to delete modal here
  const deleteAccountHandler = (e) => {
    e.stopPropagation();
    setShowOptions(true);
    // setShowDelete(true);
    modalIsShowing();
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

  const showDeleteModal = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    setShowDelete(true);
  };

  const showEditModal = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    setShowEdit(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    setShowDelete(false);
    setShowEdit(false);
    modalHidden();
  };

  const backgroundColor = bankColor(account.name);

  return (
    <li className="account " onClick={clickedHandler}>
      <Modal
        notModalHook
        noHeader
        noFooter
        show={showOptions}
        onCancel={closeModal}
        headerClass="modal__options--header"
        footerClass="modal__options--footer"
        className="modal__options"
        contentClass="modal__options--content"
      >
        <div className="modal__options--buttons">
          <button onClick={showEditModal}>Edit Account</button>
          <button onClick={showDeleteModal}>Delete Account</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
      <Modal
        notModalHook
        noHeader
        noFooter
        show={showEdit}
        onCancel={closeModal}
        className="modal__edit"
        contentClass="modal__edit--content"
      >
        <div className="modal__edit--buttons">
          <h3>EDIT</h3>
          <div>
            <Input
              id="editAccountName"
              element="input"
              type="text"
              label="Edit Name"
              onInput={inputHandler}
            />
            <Input
              id="editAccountBalance"
              element="input"
              type="text"
              label="Edit Balance"
              onInput={inputHandler}
            />
            <button onClick={closeModal}>Done</button>
          </div>
        </div>
      </Modal>
      <Modal
        notModalHook
        show={showDelete}
        onCancel={closeModal}
        className="modal__delete"
        header={
          <h4>
            Are you sure you want to delete: <span>{`${account.name}`}</span>
          </h4>
        }
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
        } ${modalActive && "account-page-card-modal"}`}
      >
        {!modalActive ? (
          <i className="fas fa-ellipsis-h" onClick={deleteAccountHandler}></i>
        ) : (
          <i className={`fas fa-ellipsis-h modalActive`}></i>
        )}

        <h3>{account.name}</h3>
        <p>£{account.balance.toFixed(2)}</p>
      </Card>
    </li>
  );
};

export default SingleAccount;
