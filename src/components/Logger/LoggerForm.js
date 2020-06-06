import React, { useState, useContext } from "react";

import Input from "../utils/Input";

import Loading from "../utils/Loading";
import { useForm } from "../../hooks/useForm";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import "./LoggerForm.css";

// Get todays date for the datepicker.
let today = new Date().toISOString().split("T")[0];

const LoggerForm = ({ addTransaction, accounts }) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [currentAccount, setCurrentAccount] = useState();
  const [incomeButton, setIncomeButton] = useState(false);
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      // account: {
      //   value: "",
      //   isValid: false,
      // },
      description: {
        value: "",
        isValid: false,
      },
      amount: {
        value: 0,
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      date: {
        // value: "2020-01-01",
        value: today,
        isValid: true,
      },
    },
    false
  );

  const transactionSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:3001/api/finance`,
        "POST",
        JSON.stringify({
          transaction: {
            // account: formState.inputs.account.value,
            description: formState.inputs.description.value,
            amount: formState.inputs.amount.value,
            category: formState.inputs.category.value,
            date: formState.inputs.date.value,
            income: incomeButton,
          },
          userId: auth.userId,
          accountId: currentAccount,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      addTransaction(responseData.data);
      auth.updateUserBalance(formState.inputs.amount.value);
    } catch (error) {
      console.log(error);
    }
  };

  const accountIdHandler = (e) => {
    setCurrentAccount(e.target.value);
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <form className="logger-form" onSubmit={transactionSubmitHandler}>
        <div className="select-container">
          {/* <label htmlFor="accountId">Account used</label> */}
          <select
            id="accountId"
            label="Account"
            onChange={accountIdHandler}
            value={currentAccount || ""}
          >
            <option value="" disabled>
              Select Account
            </option>
            {accounts &&
              accounts.accounts.map((account) => (
                <option key={account.name} value={account._id}>
                  {account.name}
                </option>
              ))}
          </select>
        </div>

        <Input
          id="description"
          element="input"
          type="text"
          label="Description"
          // placeholder="Description"
          errorText="Please enter a valid description"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialIsValid={formState.inputs.description.isValid}
        />
        <Input
          id="amount"
          element="input"
          type="number"
          label="Amount"
          // placeholder="Amount"
          errorText="Please enter a valid amount"
          onInput={inputHandler}
          initialValue={formState.inputs.amount.value}
          initialIsValid={formState.inputs.amount.isValid}
        />
        <Input
          id="category"
          element="input"
          type="text"
          label="Category"
          // placeholder="Category"
          errorText="Please pick a category"
          onInput={inputHandler}
          initialValue={formState.inputs.category.value}
          initialIsValid={formState.inputs.category.isValid}
        />
        <Input
          id="date"
          element="input"
          type="date"
          label="Date"
          // placeholder="Date"
          errorText="Please pick a date"
          onInput={inputHandler}
          initialValue={formState.inputs.date.value}
          initialIsValid={formState.inputs.date.isValid}
        />
        <div
          tabindex="0"
          className={`btn btn-select-income ${
            incomeButton ? "btn-select-income-active" : ""
          }`}
          onClick={() => setIncomeButton((prev) => !prev)}
        >
          Inflow
        </div>
        <button
          className="btn btn-add-transaction"
          type="submit"
          disabled={!formState.isValid}
        >
          Log
        </button>
      </form>
    </React.Fragment>
  );
};

export default LoggerForm;
