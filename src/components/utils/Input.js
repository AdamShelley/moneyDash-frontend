import React, { useReducer, useEffect } from "react";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initalIsValid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;
  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid, id, onInput]);

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <select id={props.id} onChange={changeHandler} onBlur={touchHandler}>
        {props.children}
      </select>
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
