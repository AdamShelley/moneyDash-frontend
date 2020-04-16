import React, { useState, useContext } from "react";

import Card from "../components/utils/Card";
import Input from "../components/utils/Input";
import Loading from "../components/utils/Loading";

import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
        auth.login(responseData.user._id, responseData.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/users/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.user._id, responseData.token);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="auth-page">
      <Card addedClass="card-authentication">
        {isLoading && <Loading />}
        <h2 className="auth-header">
          {isLoginMode ? "Login to MoneyDash" : "Signup to MoneyDash"}
        </h2>
        <hr />
        <div className="auth-inputs">
          <form className="auth-form" onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                errorText="Please enter your name"
                onInput={inputHandler}
              />
            )}
            <Input
              id="email"
              element="input"
              type="email"
              label="Email"
              errorText="Please enter a valid email address"
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              errorText="Please enter a valid Password. At least 5 characters"
              onInput={inputHandler}
            />

            <button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "Signup"}
            </button>
          </form>
        </div>
        <button className="auth-switchbutton" onClick={switchModeHandler}>
          Switch to {isLoginMode ? "Signup" : "Login"}
        </button>

        {error && <p>{error}</p>}
      </Card>
      <Card addedClass="card-describe">
        <div className="auth-describe">
          <h2>Reasons to sign-up</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            repudiandae.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Cupiditate, eos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
            laborum.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
