import React, { useContext } from "react";

import Card from "../components/utils/Card";
import Input from "../components/utils/Input";
import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/useForm";
import "./Settings.css";

const Settings = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: auth.userData.name,
        isValid: false,
      },
      email: {
        value: auth.userData.email || "",
        isValid: false,
      },
      password: {
        value: "******",
        isValid: false,
      },
    },
    false
  );

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <Card addedClass="personal-settings">
        <h3>Profile information</h3>
        <Input
          id="username"
          element="input"
          type="text"
          label="Username"
          errorText="Please enter a valid username"
          onInput={inputHandler}
          initialValue={formState.inputs.username.value}
          initialIsValid={formState.inputs.username.isValid}
        />
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          errorText="Please enter a valid email address"
          onInput={inputHandler}
          initialValue={formState.inputs.email.value}
          initialIsValid={formState.inputs.email.isValid}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          errorText="Please enter a valid password"
          onInput={inputHandler}
          initialValue={formState.inputs.password.value}
          initialIsValid={formState.inputs.password.isValid}
        />

        <button className="btn btn-update-profile">Update profile</button>
      </Card>
      <Card addedClass="settings-buttons">
        <h3>Advanced</h3>
        <div className="settings-buttons__container">
          <button className="btn btn-delete-data">DELETE ALL DATA</button>
          <button className="btn btn-delete-account">DELETE ACCOUNT</button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
