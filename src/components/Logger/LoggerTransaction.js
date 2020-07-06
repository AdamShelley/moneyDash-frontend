import React from "react";
import Moment from "react-moment";

import "./LoggerTransaction.css";

const LoggerTransaction = ({ transaction, deleteHandler, allowDelete }) => {
  // console.log(transaction);
  return (
    // <div
    //   className={`logger-transaction ${
    //     transaction.income ? "logger-transaction-income" : ""
    //   }`}
    // >
    <React.Fragment>
      <td className="text-align-center">
        {transaction.income ? (
          <p className="income-color">Inflow</p>
        ) : (
          <i className="fas fa-shopping-cart"></i>
        )}
      </td>

      <td>{transaction.accountName}</td>
      <td>{transaction.category}</td>
      <td className="logger-transaction--description">
        {transaction.description}
      </td>
      <td className="text-bold">£{transaction.amount.toFixed(2)}</td>

      <td>
        {/* {day}-{month}-{year} */}
        <Moment format="DD/MM/YY">{transaction.date}</Moment>
      </td>

      {allowDelete && (
        <td className="delete-container text-align-center">
          <i
            onClick={() => deleteHandler(transaction)}
            className="far fa-trash-alt"
          ></i>
        </td>
      )}
      {/* </div> */}
    </React.Fragment>
  );
};

export default LoggerTransaction;
