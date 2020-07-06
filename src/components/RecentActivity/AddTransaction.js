import React from "react";
import { useSpring, animated } from "react-spring";

// import Input from "../utils/Input";
import "./AddTransaction.css";

const AddTransaction = (props) => {
  const showModal = useSpring({
    from: {
      bottom: "5%",
      height: "70%",
      opacity: 0,
    },
    to: {
      bottom: "15%",
      height: "80%",
      opacity: 1,
    },
  });

  return (
    <animated.div style={showModal} className="addTransactionOverlay">
      <h2>Quick Add</h2>
      <input type="text" placeholder="Account" />
      <input type="text" placeholder="Amount" />
      <input type="text" placeholder="Category" />
      <input type="text" placeholder="Date" />
      <button onClick={props.addTransaction}>Add</button>
      <button onClick={props.closeModal}>Cancel</button>
    </animated.div>
  );
};

export default AddTransaction;
